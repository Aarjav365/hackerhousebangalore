import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, RSVP, Question } from './types';
import { db } from './services/db';
import { refineQuestion } from './services/geminiService';
import { submitToGoogleSheetsForm } from './services/googleAppsScriptService';
import { Input, Button, FadeIn } from './components/UI';

// --- Sub-components ---

const NikoProfile = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className="relative inline-block cursor-help group z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b-2 border-ink/10 group-hover:border-ink transition-colors duration-300">Niko Bonatsos</span>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.95, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 origin-bottom"
            style={{ perspective: "1000px" }}
          >
            {/* The Curved Screen Container */}
            <div className="bg-[#0A0A0A] text-[#FDFCF8] p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/10">
               {/* Screen curvature/glare effect */}
               <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                   <img 
                     src="https://i.ibb.co/pBPG6nft/Tech-Crunch-Disrupt-Haje-Kamps-738.webp" 
                     alt="Niko Bonatsos" 
                     className="w-full h-full object-cover rounded-full"
                   />
                 </div>
                 <div className="mb-3">
                   <h4 className="font-serif text-xl italic text-white">VC Luminary</h4>
                 </div>
                 <p className="font-serif text-sm text-gray-400 leading-relaxed mb-4 italic">
                   "Investing in the awkward teenage years of companies."
                 </p>
                 <div className="space-y-1 w-full pt-3 border-t border-white/10">
                    <p className="font-sans text-[9px] uppercase tracking-widest text-white/60">General Catalyst</p>
                    <p className="font-sans text-[9px] uppercase tracking-widest text-white/40">Snap • Stripe • Discord</p>
                 </div>
               </div>
            </div>
            
            {/* Connector */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-[#0A0A0A] rotate-45 border-r border-b border-white/10"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default function App() {
  // State
  const [user, setUser] = useState<User | null>(null);
  const [rsvp, setRsvp] = useState<RSVP | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Auth Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // RSVP Form State
  const [company, setCompany] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [university, setUniversity] = useState('');
  const [benefit, setBenefit] = useState('');
  
  // Question State
  const [questionInput, setQuestionInput] = useState('');
  const [refinedQ, setRefinedQ] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [myQuestions, setMyQuestions] = useState<Question[]>([]);
  const [view, setView] = useState<'landing' | 'rsvp' | 'dashboard'>('landing');

  // Modal State
  const [showReferModal, setShowReferModal] = useState(false);

  // Initialization
  useEffect(() => {
    const init = async () => {
      try {
        const currentUser = await db.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          const userRsvp = await db.getRSVP(currentUser.id);
          setRsvp(userRsvp);
          if (userRsvp) {
            setView('dashboard');
            const qs = await db.getUserQuestions(currentUser.id);
            setMyQuestions(qs);
          } else {
            setView('rsvp');
          }
        }
      } catch (e) {
        console.error("Init failed", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    try {
      const u = await db.createUser(name, email);
      setUser(u);
      const existingRsvp = await db.getRSVP(u.id);
      if (existingRsvp) {
        setRsvp(existingRsvp);
        setView('dashboard');
      } else {
        setView('rsvp');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !company || !linkedin || !university || !benefit) return;
    setLoading(true);
    try {
      const newRsvp = await db.createRSVP(user.id, linkedin, company, university, benefit);
      setRsvp(newRsvp);
      
      // Submit to Google Sheets via Apps Script
      const sheetData = {
        name: user.name,
        email: user.email,
        company,
        linkedin,
        university,
        benefit
      };
      
      const result = await submitToGoogleSheetsForm(sheetData);
      if (result.success) {
        console.log('✅ Successfully submitted to Google Sheets');
      } else {
        console.log('⚠️ Google Sheets submission failed:', result.error);
        console.log('📝 Data saved to localStorage as fallback');
      }
      
      setView('dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAiRefine = async () => {
    if (!questionInput) return;
    setIsRefining(true);
    try {
      const betterVersion = await refineQuestion(questionInput);
      setRefinedQ(betterVersion);
    } finally {
      setIsRefining(false);
    }
  };

  const handleSubmitQuestion = async () => {
    if (!user || (!questionInput && !refinedQ)) return;
    const finalQ = refinedQ || questionInput;
    setLoading(true);
    try {
      await db.submitQuestion(user.id, questionInput, finalQ);
      const qs = await db.getUserQuestions(user.id);
      setMyQuestions(qs);
      setQuestionInput('');
      setRefinedQ('');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await db.logout();
    setUser(null);
    setRsvp(null);
    setView('landing');
    setName('');
    setEmail('');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Outliers by TheAsterix',
      text: 'I see incredible potential in you. You\'re exactly the kind of outlier who belongs in this community. You should definitely apply.',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Invitation link copied to clipboard.');
      }
      setShowReferModal(false);
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  // --- Views ---

  const renderReferModal = () => (
    <AnimatePresence>
      {showReferModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-paper/90 backdrop-blur-sm"
            onClick={() => setShowReferModal(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative bg-[#FDFCF8] w-full max-w-sm shadow-2xl p-6 md:p-8 border border-gray-200 text-center"
            style={{ 
              aspectRatio: '3.5/5',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
            }} 
          >
            <button 
              onClick={() => setShowReferModal(false)}
              className="absolute top-4 right-4 text-subtle hover:text-ink transition-colors"
            >
              ✕
            </button>
            
            {/* Postcard Inner Border */}
            <div className="h-full flex flex-col justify-between items-center border-2 border-double border-gray-100 p-6">
              
              <div className="pt-4 space-y-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                   <span className="font-serif italic text-xl">A*</span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl text-ink leading-none">
                  You are<br/>an<br/><span className="italic">Outlier.</span>
                </h2>
              </div>

              <div className="space-y-6 w-full pt-8">
                <div className="h-px w-12 bg-gray-200 mx-auto"></div>
                <p className="font-serif text-lg italic text-subtle/80 font-light">
                  "I saw this and thought of you. The world needs what you are building."
                </p>
                <div className="pt-2">
                  <Button onClick={handleShare} className="w-full" variant="primary">
                    Send Postcard
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const renderLanding = () => (
    <div className="max-w-xl mx-auto pt-20 px-6 pb-20">
      {/* Premium Staggered Text Reveal */}
      <h1 className="text-5xl md:text-7xl font-serif text-ink mb-12 leading-tight">
        {["Built", "for"].map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-3 md:mr-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.5, 
              ease: [0.16, 1, 0.3, 1], // Ultra smooth bezier
              delay: i * 0.25 
            }}
          >
            {word}
          </motion.span>
        ))}
        <br />
        <motion.span
          className="italic inline-block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5, 
            ease: [0.16, 1, 0.3, 1], 
            delay: 0.5 
          }}
        >
          outliers.
        </motion.span>
      </h1>

      <FadeIn delay={0.8}>
        
        {/* New "Who is this for" Section */}
        <div className="mb-16 border-l-2 border-ink pl-6 py-2 flex flex-col md:flex-row gap-8 justify-between items-start group">
          <div className="max-w-xs">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-subtle mb-3">Who is this for?</h3>
            <p className="font-serif text-lg leading-relaxed text-ink/80 italic">
              This is not a networking event. It is a gathering for the contrarians, the visionaries, and the ones who don't fit in because they were born to stand out. 
            </p>
          </div>
          <div className="flex-none pt-2">
             <button 
               onClick={() => setShowReferModal(true)}
               className="font-sans text-[10px] uppercase tracking-widest border-b border-ink pb-1 hover:text-subtle hover:border-subtle transition-colors"
             >
               Refer an Outlier →
             </button>
          </div>
        </div>

        <div className="h-px w-20 bg-ink mb-8"></div>
        <p className="text-xl md:text-2xl text-ink/80 font-serif leading-relaxed mb-12">
          An intimate evening with Verdict Capital's <NikoProfile />. 
          We are gathering the founders who see what others don't.
        </p>

        <div className="space-y-2 mb-16 text-sm font-sans tracking-widest text-subtle">
          <p>Details shared to selected only </p>
          <p>Online , India</p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-8 border border-gray-100 rounded-sm">
          <h3 className="font-sans text-xs uppercase tracking-widest mb-6">Request Invitation</h3>
          <form onSubmit={handleLogin}>
            <Input 
              label="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Jane Doe"
            />
            <Input 
              label="Email Address" 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="jane@example.com"
            />
            <div className="mt-8">
              <Button type="submit" loading={loading}>Continue</Button>
            </div>
          </form>
        </div>
      </FadeIn>
    </div>
  );

  const renderRSVP = () => (
    <div className="max-w-xl mx-auto pt-20 px-6">
      <FadeIn delay={0.15}>
        <h2 className="text-4xl font-serif mb-6">Request Access</h2>
        <p className="font-serif text-lg text-subtle mb-10">
          Welcome, {user?.name.split(' ')[0]}. This event is curated for outliers.
        </p>
        
        <form onSubmit={handleRSVP}>
          <Input 
            label="Current Company / Project" 
            value={company} 
            onChange={(e) => setCompany(e.target.value)} 
            placeholder="What are you building?"
          />
          <Input 
            label="LinkedIn URL" 
            value={linkedin} 
            onChange={(e) => setLinkedin(e.target.value)} 
            placeholder="linkedin.com/in/..."
          />
          <Input 
            label="University" 
            value={university} 
            onChange={(e) => setUniversity(e.target.value)} 
            placeholder="Where did you attend university?"
          />
          <Input 
            label="How will you benefit from this event?" 
            value={benefit} 
            onChange={(e) => setBenefit(e.target.value)} 
            placeholder="What do you hope to gain from attending?"
          />
          <div className="mt-10 flex gap-4">
            <Button type="submit" loading={loading}>Join Waitlist</Button>
            <Button type="button" variant="secondary" onClick={handleSignOut}>Cancel</Button>
          </div>
        </form>
      </FadeIn>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-2xl mx-auto pt-20 px-6 pb-20">
      <FadeIn delay={0.15}>
        <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-serif">You are on the waitlist.</h1>
            <p className="text-subtle mt-2 font-serif">
              We have received your application, {user?.name}. We will notify you via email if you are in
            </p>
          </div>
          <button onClick={handleSignOut} className="text-xs uppercase tracking-widest text-subtle hover:text-ink underline decoration-1 underline-offset-4">
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-subtle">Date</p>
            <p className="font-serif text-lg">To selected only</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-subtle">Time</p>
            <p className="font-serif text-lg">To selected only</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-subtle">Location</p>
            <p className="font-serif text-lg">Online, India</p>
          </div>
        </div>

        {/* AI Question Section */}
        <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
          <h3 className="text-2xl font-serif mb-2">Ask a Question</h3>
          <p className="text-subtle font-serif mb-6 leading-relaxed">
            Niko prioritizes questions from the audience. Use our AI assistant to help draft a meaningful question that stands out.
          </p>

          <div className="mb-6">
            <textarea
              value={questionInput}
              onChange={(e) => {
                setQuestionInput(e.target.value);
                setRefinedQ(''); // Clear refined if user edits
              }}
              placeholder="Draft your thoughts here... (e.g. 'I want to ask about how consumer social is changing with AI')"
              className="w-full bg-[#FAFAF5] p-4 text-lg font-serif border-0 focus:ring-1 focus:ring-gray-200 resize-none h-32 placeholder-gray-400"
            />
          </div>

          {refinedQ && (
            <div className="mb-6 bg-gray-50 p-6 border-l-2 border-ink">
              <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">AI Suggested Refinement</p>
              <p className="text-xl font-serif italic text-ink">{refinedQ}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSubmitQuestion} disabled={loading || (!questionInput && !refinedQ)}>
              Submit Question
            </Button>
          </div>
        </div>

        {/* Existing Questions */}
        {myQuestions.length > 0 && (
          <div className="mt-16">
            <h4 className="text-xs uppercase tracking-widest text-subtle mb-6">Your Submitted Questions</h4>
            <div className="space-y-6">
              {myQuestions.map((q) => (
                <div key={q.id} className="border-b border-gray-100 pb-4">
                  <p className="font-serif text-lg text-ink">{q.refinedText || q.originalText}</p>
                  <p className="text-[10px] text-gray-400 mt-2">
                    {new Date(q.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </FadeIn>
    </div>
  );

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="w-12 h-0.5 bg-gray-200 overflow-hidden">
          <div className="h-full bg-ink animate-[loading_1s_ease-in-out_infinite]"></div>
        </div>
        <style>{`
          @keyframes loading {
            0% { width: 0%; margin-left: 0; }
            50% { width: 100%; margin-left: 0; }
            100% { width: 0%; margin-left: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-gray-200">
      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center mix-blend-multiply animate-fade-in"
        style={{ animationDelay: '0s' }}
      >
        <span className="font-serif text-xl italic font-semibold tracking-tight">theasterix</span>
        {user && view !== 'landing' && (
          <div className="w-2 h-2 rounded-full bg-green-500" title="Online"></div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10">
        {renderReferModal()}
        {view === 'landing' && renderLanding()}
        {view === 'rsvp' && renderRSVP()}
        {view === 'dashboard' && renderDashboard()}
      </main>

      {/* Footer */}
      <footer 
        className="fixed bottom-6 left-6 right-6 flex justify-between text-[10px] uppercase tracking-widest text-gray-400 pointer-events-none z-0 animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        <span>© 2026</span>
        <span>TheAsterix</span>
      </footer>
    </div>
  );
}