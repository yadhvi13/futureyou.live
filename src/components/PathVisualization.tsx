import React from 'react';
import { motion } from 'motion/react';
import { SimulationResult } from '../services/geminiService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Calendar, TrendingUp, Info } from 'lucide-react';

export const PathVisualization = ({ result, type }: { result: SimulationResult, type: string }) => {
  const typeColors: Record<string, string> = {
    disciplined: 'cyan',
    distracted: 'rose',
    balanced: 'purple'
  };

  const color = typeColors[type] || 'cyan';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="glass-card p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h3 className={`text-3xl font-display font-bold text-${color}-400 mb-2`}>{result.pathName}</h3>
            <p className="text-slate-400 max-w-xl">{result.summary}</p>
          </div>
          <div className={`px-6 py-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 font-bold uppercase tracking-widest text-sm`}>
            {type} Path
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Metrics Chart */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" /> Life Metrics
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={result.metrics}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Metrics"
                    dataKey="value"
                    stroke={color === 'cyan' ? '#06b6d4' : color === 'rose' ? '#f43f5e' : '#8b5cf6'}
                    fill={color === 'cyan' ? '#06b6d4' : color === 'rose' ? '#f43f5e' : '#8b5cf6'}
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Milestones Timeline */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" /> Key Milestones
            </h4>
            <div className="space-y-4">
              {result.milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-white/10 pb-4 last:pb-0"
                >
                  <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-${color}-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]`} />
                  <div className="text-sm font-mono text-cyan-400 mb-1">{m.year}</div>
                  <div className="font-bold text-slate-200 mb-1">{m.event}</div>
                  <div className="text-sm text-slate-400 italic flex items-start gap-2">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {m.impact}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
