import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SimulationInput } from '../services/geminiService';
import { Brain, Target, Briefcase, Heart, Send } from 'lucide-react';

export const SimulationForm = ({ onSubmit, isLoading }: { onSubmit: (data: SimulationInput) => void, isLoading: boolean }) => {
  const [formData, setFormData] = useState<SimulationInput>({
    habits: '',
    goals: '',
    career: '',
    lifestyle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 md:p-12 rounded-3xl max-w-4xl mx-auto"
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Define Your Current Self</h2>
        <p className="text-slate-400">Provide details about your current life to generate accurate future simulations.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Brain className="w-4 h-4 text-cyan-400" /> Daily Habits
            </label>
            <textarea
              required
              placeholder="e.g., Morning meditation, 4 hours of deep work, late night gaming..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[120px] focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
              value={formData.habits}
              onChange={e => setFormData({ ...formData, habits: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Target className="w-4 h-4 text-purple-400" /> Long-term Goals
            </label>
            <textarea
              required
              placeholder="e.g., Become a senior software engineer, travel to 20 countries..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[120px] focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-600"
              value={formData.goals}
              onChange={e => setFormData({ ...formData, goals: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Briefcase className="w-4 h-4 text-blue-400" /> Career Interests
            </label>
            <input
              required
              type="text"
              placeholder="e.g., AI, Sustainable Energy, Digital Marketing..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
              value={formData.career}
              onChange={e => setFormData({ ...formData, career: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Heart className="w-4 h-4 text-rose-400" /> Lifestyle Choices
            </label>
            <input
              required
              type="text"
              placeholder="e.g., Vegan, Minimalist, Urban living, Fitness enthusiast..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 outline-none transition-all placeholder:text-slate-600"
              value={formData.lifestyle}
              onChange={e => setFormData({ ...formData, lifestyle: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            disabled={isLoading}
            type="submit"
            className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Future...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Generate Simulation <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
