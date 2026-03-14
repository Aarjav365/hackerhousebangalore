import React from 'react';

// Minimalist underline input
export const Input = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div className="mb-6 w-full">
    <label className="block text-sm font-sans text-subtle mb-1 uppercase tracking-widest text-[10px]">{label}</label>
    <input 
      className="w-full bg-transparent border-b border-gray-300 py-2 text-xl font-serif text-ink focus:outline-none focus:border-ink transition-colors placeholder-gray-300"
      {...props}
    />
  </div>
);

// Minimalist button
export const Button = ({ children, loading, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean, variant?: 'primary' | 'secondary' }) => (
  <button 
    disabled={loading}
    className={`
      group relative px-8 py-3 text-sm tracking-widest uppercase font-sans transition-all duration-300
      ${variant === 'primary' ? 'bg-ink text-white hover:bg-black' : 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white'}
      disabled:opacity-50 disabled:cursor-not-allowed
    `}
    {...props}
  >
    <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>
      {children}
    </span>
    {loading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    )}
  </button>
);

interface FadeInProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => (
  <div 
    className={`animate-fade-in ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </div>
);