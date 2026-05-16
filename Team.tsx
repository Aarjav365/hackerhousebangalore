import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { FadeIn } from './components/UI';

const roles = [
  {
    key: 'software' as const,
    icon: '⚙️',
    title: 'Software Development',
    tag: 'Build something that shouldn\'t exist yet.',
    working: 'We are seeing serious inbound from startups and companies building in agentic payments — the infrastructure layer where AI agents transact autonomously on behalf of users. Think Stripe, Visa, Mastercard, Merit Systems, and FLOE Labs. This space is moving fast and the best builders are finding gaps that no one has named yet.',
    task: 'Build a short demo project and record a screen-capture walkthrough (2–4 minutes). That\'s it. The bar is not production quality. The bar is insight.',
    directionsLabel: 'Pick one of the following directions, or invent your own:',
    directions: [
      'Leverage a tool or API from one of these companies — Stripe, Visa, Mastercard, Merit Systems, FLOE Labs — and build something on top of it that solves a use case they haven\'t addressed.',
      'Identify a missing primitive. What does the agentic payments stack need that nobody is building? Articulate it clearly and sketch or prototype it.',
      'Think interdisciplinary. Some of the most interesting territory is at the edges: stablecoins + agent payments, game theory + agentic commerce, mechanism design + micropayment auctions. If that sentence excites you, build something in that space.',
    ],
    looking: [
      'A genuine point of view on where the space is going.',
      'Comfort with APIs, LLMs, or on-chain tooling — whatever fits your approach.',
      'The ability to explain technical ideas clearly in the video.',
      'Evidence that you\'ve thought about real users or real workflows, not just tech for tech\'s sake.',
    ],
    submit: 'Send us a link to your GitHub or hosted demo, plus a link to your video walkthrough. A brief written paragraph describing your thinking is optional but welcome.',
  },
  {
    key: 'design' as const,
    icon: '🎨',
    title: 'Design & Marketing',
    tag: 'Make people feel something about what we\'re doing.',
    working: 'We want someone with taste. Not a designer who has all the tools. Not someone who can match a style guide. Someone who notices things other people don\'t — in typography, motion, product UI, brand voice, visual systems — and has opinions about why they work. We are also interested in GTM sensibility: the ability to see how great companies build presence and relationships publicly, and to help us do the same.',
    task: 'Part 1 — Pick three specific design elements you genuinely appreciate (any domain, era, medium). For each, write two to three sentences on what it does well and why it sticks with you. Then write one paragraph connecting all three: what does your taste add up to?\n\nPart 2 — If you\'re applying with a GTM or community focus, point us to one company or person on X/Twitter whose approach to public presence you admire. Tell us in two to three sentences: what they\'re doing, why it works, and what you would borrow for Hackerhouse.',
    directionsLabel: 'Examples of what a strong response might look like:',
    directions: [
      'Anthropic\'s typographic restraint — the way their brand communicates intelligence without performing it.',
      'Notion\'s use of emoji as information density — an affordance that feels casual but actually carries semantic weight.',
      'The editorial spacing in Stripe\'s documentation — how whitespace becomes a trust signal in technical writing.',
    ],
    looking: [
      'Specific observations about specific design decisions and why they matter — not "I like minimalism."',
      'Examples of consistent voice and community-building in public — not follower counts.',
      'A medium choice that is itself part of the signal.',
    ],
    submit: 'A PDF or Notion doc is fine. A Google Slides deck is fine. A personal website is great. The medium is part of the signal.',
  },
  {
    key: 'bd' as const,
    icon: '🤝',
    title: 'Business Development',
    tag: 'Open doors we don\'t know are closed.',
    working: 'Hackerhouse punches above its weight because of the people we bring in. We have hosted the co-founder of Siri. The Chief Technology Officer of McKinsey. Legends who also happen to be genuinely approachable — people who are great and who still have time and care for communities like this one. Your job in this role is to find more of those people and get them in the room.',
    task: 'Identify one person who fits the following profile, then write the cold email you would actually send them. This is not a template exercise. We want to see the email you would genuinely send. Subject line, opening, the ask, the close. The kind of email that gets a reply.',
    directionsLabel: 'Identify one person who fits the following profile:',
    directions: [
      'A genuine heavyweight in tech — founder, researcher, operator, investor — with a real track record.',
      'Not so famous that they have an EA who screens every email. Not so unknown that the name carries no weight.',
      'Someone who still cares about builders. Who would show up for a community that deserved it.',
    ],
    looking: [
      'Research — evidence that you looked them up and found something real to say.',
      'Voice — cold emails that work sound like a human wrote them.',
      'Framing — why would this person say yes to us, specifically.',
      'The ask — clear, low-friction, easy to respond to.',
    ],
    submit: 'Send us your chosen person, a brief note on why you picked them, and the email. One page or less.',
  },
];

export default function Team() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'software' | 'design' | 'bd' | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const activeRole = roles.find(r => r.key === selectedRole);

  return (
    <div className="min-h-screen bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink selection:bg-gray-200 dark:selection:bg-gray-800 transition-colors duration-300">
      <nav
        className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center mix-blend-multiply dark:mix-blend-normal animate-fade-in"
        style={{ animationDelay: '0s' }}
      >
        <a href="/" className="font-serif text-xl italic font-semibold tracking-tight hover:opacity-80 transition-opacity">
          Hackerhouse v1
        </a>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <main className="relative z-10">
        <div className="max-w-3xl mx-auto pt-32 px-6 pb-32">
          <FadeIn>
            <a
              href="/"
              className="font-sans text-[10px] uppercase tracking-widest text-subtle dark:text-dark-subtle hover:text-ink dark:hover:text-dark-ink transition-colors mb-12 inline-block"
            >
              ← Back
            </a>

            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-subtle dark:text-dark-subtle mb-6">
              Hackerhouse v1 · Team Application Guide
            </p>

            <h1 className="text-4xl md:text-6xl font-serif text-ink dark:text-dark-ink leading-tight mb-10">
              We are not looking for the<br />most credentialed.
              <br />
              <span className="italic">We are looking for the most alive.</span>
            </h1>

            <div className="h-px w-20 bg-ink dark:bg-dark-ink mb-10"></div>

            <div className="space-y-6 font-serif text-lg md:text-xl leading-relaxed text-ink/80 dark:text-dark-ink/80 mb-20">
              <p>
                Hackerhouse started as a weekend experiment — two friends, a house, and a handful of builders who wanted to make things. No agenda. No pitch decks. Just good people building things that mattered to them.
              </p>
              <p>
                It grew into something we didn't expect: inbounds from YC companies, ₹5 lakh in funding from top Indian VCs, a mentor network that includes Niko Bonatsos, Arvind KC, James Kaplan, and the co-founder of Siri — and a real community of 400+ builders across India and the US.
              </p>
              <p>
                v1 is our chance to do it properly. We have the house. We have the funding. We have the sponsors. We need the team.
              </p>
              <p className="italic">
                We look for passion first, creativity second, skill third. In that order. Always.
              </p>
            </div>

            <h2 className="font-sans text-xs uppercase tracking-widest mb-2 border-b border-gray-200 dark:border-gray-800 pb-4">
              The Three Roles
            </h2>
            <p className="font-serif text-base md:text-lg text-subtle dark:text-dark-subtle italic mt-6 mb-10">
              We are hiring for three distinct tracks. Each has a different application task. There is no resume screen. There is no interview call until after we see your work.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
              {roles.map(r => (
                <button
                  key={r.key}
                  onClick={() => setSelectedRole(r.key)}
                  className={`text-left p-6 border transition-all duration-300 rounded-sm
                    ${selectedRole === r.key
                      ? 'border-ink dark:border-dark-ink bg-ink/[0.03] dark:bg-dark-ink/[0.05]'
                      : 'border-gray-200 dark:border-gray-800 hover:border-ink dark:hover:border-dark-ink'}
                  `}
                >
                  <div className="text-3xl mb-4">{r.icon}</div>
                  <h3 className="font-serif text-xl text-ink dark:text-dark-ink mb-2">{r.title}</h3>
                  <p className="font-serif text-sm italic text-subtle dark:text-dark-subtle leading-relaxed">{r.tag}</p>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeRole && (
                <motion.div
                  key={activeRole.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-20"
                >
                  <div className="border-l-2 border-ink dark:border-dark-ink pl-6 py-2 mb-12">
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-subtle dark:text-dark-subtle mb-2">
                      Role · {activeRole.title}
                    </p>
                    <h3 className="font-serif text-3xl md:text-4xl text-ink dark:text-dark-ink italic">
                      {activeRole.tag}
                    </h3>
                  </div>

                  <h4 className="font-sans text-xs uppercase tracking-widest text-subtle dark:text-dark-subtle mb-4">
                    What We're Working On
                  </h4>
                  <p className="font-serif text-lg md:text-xl leading-relaxed text-ink/85 dark:text-dark-ink/85 mb-12">
                    {activeRole.working}
                  </p>

                  <h4 className="font-sans text-xs uppercase tracking-widest text-subtle dark:text-dark-subtle mb-4">
                    Your Application Task
                  </h4>
                  <p className="font-serif text-lg md:text-xl leading-relaxed text-ink/85 dark:text-dark-ink/85 mb-6 whitespace-pre-line">
                    {activeRole.task}
                  </p>

                  <p className="font-serif text-base italic text-subtle dark:text-dark-subtle mb-3">
                    {activeRole.directionsLabel}
                  </p>
                  <ul className="space-y-3 mb-12">
                    {activeRole.directions.map((d, i) => (
                      <li key={i} className="font-serif text-base md:text-lg leading-relaxed text-ink/80 dark:text-dark-ink/80 pl-6 relative">
                        <span className="absolute left-0 top-2.5 w-2 h-px bg-ink dark:bg-dark-ink"></span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-sans text-xs uppercase tracking-widest text-subtle dark:text-dark-subtle mb-4">
                    What We're Looking For
                  </h4>
                  <ul className="space-y-3 mb-12">
                    {activeRole.looking.map((d, i) => (
                      <li key={i} className="font-serif text-base md:text-lg leading-relaxed text-ink/80 dark:text-dark-ink/80 pl-6 relative">
                        <span className="absolute left-0 top-2.5 w-2 h-px bg-ink dark:bg-dark-ink"></span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-sans text-xs uppercase tracking-widest text-subtle dark:text-dark-subtle mb-4">
                    How to Apply
                  </h4>
                  <p className="font-serif text-lg md:text-xl leading-relaxed text-ink/85 dark:text-dark-ink/85 mb-10">
                    {activeRole.submit}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-20">
              <h2 className="font-sans text-xs uppercase tracking-widest mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
                The Process
              </h2>
              <ol className="space-y-6 font-serif text-base md:text-lg leading-relaxed text-ink/85 dark:text-dark-ink/85">
                {[
                  'We read everything. There is no filtering round before we see your work.',
                  'Submit your application to the email below.',
                  'We will review within one week and reach out if we want to talk.',
                  'If we move forward, there is one short call — more of a conversation than an interview.',
                  'We make decisions quickly. We will not waste your time.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-6 items-start">
                    <span className="font-sans text-[10px] tracking-widest text-subtle dark:text-dark-subtle pt-2 w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
              <p className="font-serif text-lg md:text-xl italic text-ink/80 dark:text-dark-ink/80 mb-8">
                We are a small team making something real. If you join, you will have actual ownership over what we build this summer.
              </p>
              <a
                href="mailto:apply@hackerhouse.in?subject=Hackerhouse%20v1%20Application"
                className="inline-block bg-ink dark:bg-dark-ink text-paper dark:text-dark-paper px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg"
              >
                Reply to Apply →
              </a>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-subtle dark:text-dark-subtle mt-10">
                theasterix.tech · anushk.tech · @bangalorehack
              </p>
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}
