/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import resumeData from '../data/resume.json';
import { cn } from '../lib/utils';

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="experience" className="py-32 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/30 mb-4"
        >
          Career Scan
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
        >
          Professional Journey
        </motion.h2>
      </div>

      <div className="space-y-8">
        {(Array.isArray(resumeData?.experience) ? resumeData.experience : []).map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={cn(
              "group relative overflow-hidden backdrop-blur-md rounded-3xl border border-white/10 p-8 transition-all duration-500",
              hoveredIdx === idx ? "bg-white/5 scale-[1.02] border-white/20" : "bg-white/[0.02]"
            )}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/5 rounded-lg">
                    <Briefcase size={20} className="text-white/60" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                </div>
                
                <p className="text-white/80 font-medium mb-4 text-xl">{exp.company}</p>
                
                <div className="flex flex-wrap gap-4 text-white/40 text-sm mb-6">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Calendar size={14} />
                    {exp.dates}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>

                <div className="space-y-3">
                  {exp.bullets?.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 group/item">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/item:bg-blue-500 transition-colors" />
                      <p className="text-white/50 text-base leading-relaxed group-hover/item:text-white/70 transition-colors">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-px md:h-32 bg-white/10 hidden md:block" />

              <div className="flex md:flex-col justify-end gap-2 shrink-0">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] uppercase font-mono tracking-widest rounded-full border border-blue-500/20">
                  Impact
                </span>
                <span className="px-3 py-1 bg-white/5 text-white/40 text-[10px] uppercase font-mono tracking-widest rounded-full border border-white/10">
                  Internship
                </span>
              </div>
            </div>

            {/* Accent light effect */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full pointer-events-none"
              animate={{ opacity: hoveredIdx === idx ? 1 : 0 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
