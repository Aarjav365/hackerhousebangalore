import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, FadeIn } from './components/UI';
import { Moon, Sun } from 'lucide-react';

// --- Sub-components ---

const QuoteHover = ({ children, title, description }: { children: React.ReactNode, title: string, description: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative cursor-help group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="transition-opacity duration-300 group-hover:opacity-80">
        {children}
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.95, rotateX: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-[280px] md:w-80 origin-bottom z-50 pointer-events-none flex flex-col items-center"
            style={{ perspective: "1000px" }}
          >
            {/* The Curved Screen Container */}
            <div className="bg-gradient-to-b from-[#1A1A1A] to-[#050505] text-[#FDFCF8] p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/10 w-full">
               {/* Screen curvature/glare effect */}
               <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="mb-3">
                   <h4 className="font-serif text-2xl md:text-3xl italic text-white drop-shadow-md">{title}</h4>
                 </div>
                 <p className="font-serif text-base md:text-lg text-gray-300 leading-relaxed italic">
                   {description}
                 </p>
               </div>
            </div>
            
            {/* Connector */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2.5 w-5 h-5 bg-[#050505] rotate-45 border-r border-b border-white/20 shadow-xl"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  // Modal State
  const [showReferModal, setShowReferModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredQuote, setHoveredQuote] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleShare = async () => {
    const shareData = {
      title: 'Niko Bonatsos | Outliers',
      text: 'I saw this Outliers event with Niko Bonatsos and thought of you. The world needs what you are building.',
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
            className="absolute inset-0 bg-paper/90 dark:bg-dark-paper/90 backdrop-blur-sm"
            onClick={() => setShowReferModal(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="relative bg-[#FDFCF8] dark:bg-[#1A1A1A] w-full max-w-sm shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 text-center"
            style={{ 
              aspectRatio: '3.5/5',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
            }} 
          >
            <button 
              onClick={() => setShowReferModal(false)}
              className="absolute top-4 right-4 text-subtle dark:text-dark-subtle hover:text-ink dark:hover:text-dark-ink transition-colors"
            >
              ✕
            </button>
            
            {/* Postcard Inner Border */}
            <div className="h-full flex flex-col justify-between items-center border-2 border-double border-gray-100 dark:border-gray-800 p-6">
              
              <div className="pt-4 space-y-8">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto flex items-center justify-center">
                   <span className="font-serif italic text-xl dark:text-dark-ink">v1</span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl text-ink dark:text-dark-ink leading-none">
                  You are<br/>an<br/><span className="italic">Outlier.</span>
                </h2>
              </div>

              <div className="space-y-6 w-full pt-8">
                <div className="h-px w-12 bg-gray-200 dark:bg-gray-800 mx-auto"></div>
                <p className="font-serif text-lg italic text-subtle/80 dark:text-dark-subtle/80 font-light">
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
      <h1 className="text-5xl md:text-7xl font-serif text-ink dark:text-dark-ink mb-12 leading-tight">
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
        <div className="mb-16 border-l-2 border-ink dark:border-dark-ink pl-6 py-2 flex flex-col md:flex-row gap-8 justify-between items-start group">
          <div className="max-w-xs">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-subtle dark:text-dark-subtle mb-3">Who is this for?</h3>
            <p className="font-serif text-lg leading-relaxed text-ink/80 dark:text-dark-ink/80 italic">
              This is a hacker house for outlier engineers and high agency builders. For the contrarians and visionaries who don't fit in because they were born to stand out.
            </p>
          </div>
          <div className="flex-none pt-2 flex flex-col gap-6 items-start md:items-end">
             <button 
               onClick={() => setShowReferModal(true)}
               className="font-sans text-[10px] uppercase tracking-widest border-b border-ink dark:border-dark-ink pb-1 hover:text-subtle dark:hover:text-dark-subtle hover:border-subtle dark:hover:border-dark-subtle transition-colors"
             >
               Refer a Builder →
             </button>
             <button 
               className="bg-ink dark:bg-dark-ink text-paper dark:text-dark-paper px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg"
             >
               Apply Now
             </button>
          </div>
        </div>

        <div className="h-px w-20 bg-ink dark:bg-dark-ink mb-8"></div>
        <p className="text-xl md:text-2xl text-ink/80 dark:text-dark-ink/80 font-serif leading-relaxed mb-12">
          Welcome to Hackerhouse v1. 
          We are gathering the builders who see what others don't. 3 days of intense building, surrounded by the best.
        </p>

        <div className="space-y-2 mb-16 text-sm font-sans tracking-widest text-subtle dark:text-dark-subtle">
          <p>Location: Bangalore</p>
          <p>Batch: Summer 2026</p>
        </div>

        {/* Photo Gallery */}
        <div className="mb-20 -mx-6 md:-mx-12 lg:-mx-24 overflow-hidden pb-8 relative">
          {/* Gradient masks for smooth fade on edges */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-paper dark:from-dark-paper to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-paper dark:from-dark-paper to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            {[
              "https://i.ibb.co/pSyzDsn/IMG-2784.jpg",
              "https://i.ibb.co/cKf0g6jf/DSC01529.jpg",
              "https://i.ibb.co/5hS72RmR/DSC01513.jpg",
              "https://i.ibb.co/4RPmJdWm/DSC01530-1.jpg",
              "https://i.ibb.co/JRPnrBWV/DSC01525.jpg",
              "https://i.ibb.co/pSyzDsn/IMG-2784.jpg",
              "https://i.ibb.co/cKf0g6jf/DSC01529.jpg",
              "https://i.ibb.co/5hS72RmR/DSC01513.jpg",
              "https://i.ibb.co/4RPmJdWm/DSC01530-1.jpg",
              "https://i.ibb.co/JRPnrBWV/DSC01525.jpg"
            ].map((src, i) => (
              <div 
                key={i}
                className="w-44 md:w-56 h-44 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-md mx-2 md:mx-3"
              >
                <img 
                  src={src} 
                  alt={`Hackerhouse gallery ${i + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div 
          className="mt-20 mb-16 relative"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ 
              x: e.clientX - rect.left, 
              y: e.clientY - rect.top 
            });
          }}
          onMouseLeave={() => setHoveredQuote(null)}
        >
          <h3 className="font-sans text-xs uppercase tracking-widest mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">In Builders' Words</h3>
          
          <div className="flex flex-col gap-12 items-start">
            <div className="w-full space-y-12 md:space-y-16">
              {/* Paragraph 1 */}
              <div 
                onMouseEnter={() => setHoveredQuote(0)}
                className="cursor-default"
              >
                <p className={`font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-normal transition-colors duration-500 ${hoveredQuote === 0 || hoveredQuote === null ? 'text-ink dark:text-dark-ink' : 'text-ink/20 dark:text-dark-ink/20'}`}>
                  <span className="border-b border-ink/30 dark:border-dark-ink/30 pb-0.5">This hacker house compresses weeks of deep engineering into a single weekend.</span>
                  <img src="https://i.ibb.co/gMjYDy3M/003.jpg" className="inline-block w-10 h-10 md:w-12 md:h-12 rounded-full mx-3 align-middle object-cover shadow-sm" alt="avatar" />
                  <span className="border-b border-ink/30 dark:border-dark-ink/30 pb-0.5">The urgency inside the villa is so infectious that those 48 hours become the most productive coding sprint of your life.</span>
                </p>
              </div>

              {/* Paragraph 2 */}
              <div 
                onMouseEnter={() => setHoveredQuote(1)}
                className="cursor-default"
              >
                <p className={`font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-normal transition-colors duration-500 ${hoveredQuote === 1 || hoveredQuote === null ? 'text-ink dark:text-dark-ink' : 'text-ink/20 dark:text-dark-ink/20'}`}>
                  <span className="border-b border-ink/30 dark:border-dark-ink/30 pb-0.5">It’s a density of engineering talent you can’t find anywhere else in india.</span>
                  <img src="https://i.ibb.co/rfX88szD/002.jpg" className="inline-block w-10 h-10 md:w-12 md:h-12 rounded-full mx-3 align-middle object-cover shadow-sm" alt="avatar" />
                  <span className="border-b border-ink/30 dark:border-dark-ink/30 pb-0.5">It feels like having the industry's heavyweights entirely at your back—from Partners to batchmates.</span>
                </p>
              </div>

              {/* Paragraph 3 */}
              <div 
                onMouseEnter={() => setHoveredQuote(2)}
                className="cursor-default"
              >
                <p className={`font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-normal transition-colors duration-500 ${hoveredQuote === 2 || hoveredQuote === null ? 'text-ink dark:text-dark-ink' : 'text-ink/20 dark:text-dark-ink/20'}`}>
                  <span className="border-b border-ink/30 dark:border-dark-ink/30 pb-0.5">Being locked in a room with the top 1% of the city's coders completely resets your baseline.</span>
                  <img src="https://i.ibb.co/sJ6wW7nM/001.jpg" className="inline-block w-10 h-10 md:w-12 md:h-12 rounded-full mx-3 align-middle object-cover shadow-sm" alt="avatar" />
                  <span className="border-b border-ink/30 dark:border-dark-ink/30 pb-0.5">You leave the house with a completely new definition of what it means to ship production-grade software fast.</span>
                </p>
              </div>
            </div>

            {/* Floating Image */}
            <AnimatePresence>
              {hoveredQuote !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    x: mousePos.x + 20, 
                    y: mousePos.y - 150
                  }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
                  className="absolute top-0 left-0 w-48 h-64 md:w-64 md:h-80 pointer-events-none z-50 hidden md:block"
                >
                  <img
                    src={
                      hoveredQuote === 0 ? "https://i.ibb.co/gMjYDy3M/003.jpg" :
                      hoveredQuote === 1 ? "https://i.ibb.co/rfX88szD/002.jpg" :
                      "https://i.ibb.co/sJ6wW7nM/001.jpg"
                    }
                    className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-paper dark:border-dark-paper"
                    alt="Builder"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20 mb-16">
          <h3 className="font-sans text-xs uppercase tracking-widest mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">Be in the room with</h3>
          <div className="flex flex-wrap gap-3">
            {[
              'General Catalyst', 
              'OpenAI', 
              'Stripe', 
              'Figma', 
              'Vercel', 
              'Supabase', 
              'Outlier Founders', 
              '10x Engineers'
            ].map((name, i) => (
              <span 
                key={i} 
                className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 text-sm font-sans text-subtle dark:text-dark-subtle hover:border-ink dark:hover:border-dark-ink hover:text-ink dark:hover:text-dark-ink transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink selection:bg-gray-200 dark:selection:bg-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav 
        className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center mix-blend-multiply dark:mix-blend-normal animate-fade-in"
        style={{ animationDelay: '0s' }}
      >
        <span className="font-serif text-xl italic font-semibold tracking-tight">Hackerhouse v1</span>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10">
        {renderReferModal()}
        {renderLanding()}
      </main>

      {/* Footer */}
      <footer 
        className="fixed bottom-6 left-6 right-6 flex justify-between text-[10px] uppercase tracking-widest text-gray-400 pointer-events-none z-0 animate-fade-in"
        style={{ animationDelay: '0.3s' }}
      >
        <span>© 2026</span>
        <span>Hackerhouse v1</span>
      </footer>
    </div>
  );
}