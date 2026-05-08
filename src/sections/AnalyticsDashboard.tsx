import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Eye, Zap, TrendingUp } from 'lucide-react';
import { CREATOR_NAME, METRICS } from '../lib/data';
import { cn } from '../lib/utils';

export const AnalyticsDashboard = () => {
  const [activeMetricIdx, setActiveMetricIdx] = useState(0);
  const activeMetric = METRICS[activeMetricIdx];
  const [activeNow, setActiveNow] = useState(42842);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNow(prev => {
        const change = Math.floor(Math.random() * 20) - 8; // Slight fluctuation
        return Math.max(42000, prev + change);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return (num / 1000).toFixed(1) + 'K';
  };

  return (
    <section id="analytics" className="py-24 px-6 relative overflow-hidden bg-black">
      {/* Mesh Gradient Effect */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-purple font-display font-medium tracking-widest uppercase text-[11px] mb-4"
            >
              Performance Metrics
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-display font-light text-gradient !leading-[0.9]"
            >
              The <span className="italic font-serif text-brand-offwhite">Data</span> Difference
            </motion.h2>
          </div>
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="glass px-6 py-4 rounded-2xl flex items-center gap-6 border-white/5"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/50 font-bold">Live Pulse</span>
            </div>
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <div className="text-right">
                <div className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Active Now</div>
                <motion.div 
                  key={activeNow}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-display font-bold text-brand-purple"
                >
                  {formatNumber(activeNow)}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveMetricIdx(idx)}
              className={cn(
                "bg-white/5 border rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md group transition-all cursor-pointer",
                activeMetricIdx === idx ? "border-brand-purple bg-brand-purple/5 shadow-[0_0_20px_rgba(147,51,234,0.1)]" : "border-white/10 hover:border-white/20"
              )}
            >
              <div className="flex flex-col space-y-1 mb-8">
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{metric.label}</span>
                <div className={cn(
                  "text-4xl font-light tracking-tighter transition-colors",
                  activeMetricIdx === idx ? "text-brand-purple" : "group-hover:text-brand-purple"
                )}>{metric.value}</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                   <div className="text-[9px] font-bold text-green-400 uppercase tracking-widest">{metric.change} growth</div>
                   <div className="flex gap-1 items-end h-8">
                      {[0.4, 0.6, 0.8, 1, 0.7, 0.9].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h * 100}%` }}
                          className={cn("w-1 rounded-full", activeMetricIdx === idx ? "bg-brand-purple" : "bg-white/20")} 
                        />
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Chart */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass p-8 rounded-[40px]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-1">{activeMetric.label} Velocity</h3>
              <p className="text-white/40 text-sm">Engagement spike and follower growth (Last 6 Months)</p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg bg-brand-purple text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-purple/20">6 Month Data</button>
            </div>
          </div>
          <div className="h-[400px] w-full relative">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={activeMetric.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#8B5CF6' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
