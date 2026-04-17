/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ExternalLink, Code2, Cpu, BrainCircuit } from 'lucide-react';
import resumeData from '../data/resume.json';

const getIcon = (title?: string) => {
  if (!title) return <Code2 className="text-green-400" />;
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('diagnostic')) return <BrainCircuit className="text-purple-400" />;
  if (lowerTitle.includes('calculator')) return <Cpu className="text-blue-400" />;
  return <Code2 className="text-green-400" />;
};

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/30 mb-4"
          >
            Showcase
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-2"
          >
            Major Tasks & Projects
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Array.isArray(resumeData?.projects) ? resumeData.projects : []).map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-full backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 flex flex-col transition-all duration-500 hover:bg-white/[0.05] hover:border-white/30 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]"
            >
              {/* Animated Glow Border */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="mb-8 flex items-center justify-between relative z-10">
                <div className="p-5 bg-white/5 rounded-2xl group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500">
                  {getIcon(project.title)}
                </div>
                <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-mono tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors">
                  {project.stack}
                </div>
              </div>

              <h3 className="text-3xl font-display font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300 relative z-10">
                {project.title}
              </h3>

              <div className="space-y-4 flex-1 mb-10 relative z-10">
                {project.bullets?.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex gap-3">
                    <div className="w-1 h-1 rounded-full bg-blue-500/40 mt-2 shrink-0" />
                    <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/20">
                    Insights
                  </span>
                  <span className="text-[11px] font-medium text-white/40">Technical Review</span>
                </div>
                
                {(project as any).url && (
                  <motion.a
                    href={(project as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-6 py-3 rounded-full overflow-hidden group/link shadow-lg"
                  >
                    {/* Background Shine */}
                    <div className="absolute inset-0 bg-blue-500 opacity-10 group-hover/link:opacity-20 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 blur-sm" />
                    
                    <div className="relative flex items-center gap-2.5 text-[11px] uppercase tracking-[0.1em] font-bold text-white">
                      <ExternalLink size={14} className="group-hover/link:rotate-45 transition-transform duration-300" />
                      View Case Study
                    </div>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
