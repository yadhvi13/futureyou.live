import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SimulationForm } from './components/SimulationForm';
import { PathVisualization } from './components/PathVisualization';
import { generateSimulation, SimulationInput, SimulationResult } from './services/geminiService';
import { AlertCircle, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'hero' | 'form' | 'results'>('hero');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    disciplined?: SimulationResult;
    distracted?: SimulationResult;
    balanced?: SimulationResult;
  }>({});
  const [activePath, setActivePath] = useState<'disciplined' | 'distracted' | 'balanced'>('disciplined');
  const [error, setError] = useState<string | null>(null);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulationSubmit = async (data: SimulationInput) => {
    setIsLoading(true);
    setError(null);
    try {
      // Generate multiple paths in parallel
      const [disciplined, distracted, balanced] = await Promise.all([
        generateSimulation(data, 'disciplined'),
        generateSimulation(data, 'distracted'),
        generateSimulation(data, 'balanced')
      ]);

      setResults({ disciplined, distracted, balanced });
      setStep('results');
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('Failed to generate simulation. Please check your API key or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep('hero');
    setResults({});
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          {step === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={handleStart} />
            </motion.div>
          )}

          {step === 'form' && (
            <motion.section
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="pt-32 pb-20 px-6 container mx-auto"
            >
              <SimulationForm onSubmit={handleSimulationSubmit} isLoading={isLoading} />
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 max-w-4xl mx-auto"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
            </motion.section>
          )}

          {step === 'results' && (
            <motion.section
              key="results"
              ref={resultsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-32 pb-20 px-6 container mx-auto"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl font-display font-bold mb-2">Your Future Simulations</h2>
                  <p className="text-slate-400">Explore how your choices shape your destiny over the next decade.</p>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-sm font-bold"
                >
                  <RefreshCw className="w-4 h-4" /> New Simulation
                </button>
              </div>

              {/* Path Switcher */}
              <div className="flex flex-wrap gap-4 mb-8">
                {(['disciplined', 'balanced', 'distracted'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActivePath(type)}
                    className={`px-8 py-3 rounded-2xl font-bold transition-all capitalize ${
                      activePath === type
                        ? type === 'disciplined' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]' :
                          type === 'balanced' ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' :
                          'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePath}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {results[activePath] && (
                      <PathVisualization result={results[activePath]!} type={activePath} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Comparison Section */}
              <div className="mt-20 glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-display font-bold mb-8 text-center">Long-term Outlook Comparison</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {results.disciplined && results.balanced && results.distracted && (
                    <>
                      <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                        <div className="text-cyan-400 font-bold mb-2">Disciplined</div>
                        <p className="text-sm text-slate-400 leading-relaxed">{results.disciplined.summary}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                        <div className="text-purple-400 font-bold mb-2">Balanced</div>
                        <p className="text-sm text-slate-400 leading-relaxed">{results.balanced.summary}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                        <div className="text-rose-400 font-bold mb-2">Distracted</div>
                        <p className="text-sm text-slate-400 leading-relaxed">{results.distracted.summary}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-white/5 mt-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 border-2 border-cyan-400 rounded-md rotate-45" />
            <span className="text-lg font-display font-bold">FutureYou<span className="text-cyan-400">.live</span></span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} FutureYou.live. Empowering your tomorrow, today.
          </p>
        </div>
      </footer>
    </div>
  );
}
