import React from 'react';
import { motion } from 'motion/react';
import { FutureYouLogo } from './Logo';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FutureYouLogo />
          <span className="text-xl font-display font-bold tracking-tight">FutureYou<span className="text-cyan-400">.live</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Simulations', 'Methodology', 'Pricing', 'About'].map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</button>
          <button className="px-5 py-2 bg-white text-slate-950 rounded-full text-sm font-bold hover:bg-cyan-400 transition-colors">
            Join Beta
          </button>
        </div>
      </div>
    </nav>
  );
};
