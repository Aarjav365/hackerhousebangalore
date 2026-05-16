import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Apply() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink transition-colors duration-300">
      <nav className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center">
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
    </div>
  );
}
