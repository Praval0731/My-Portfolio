/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GraduationCap, Award } from 'lucide-react';
import resumeData from '../data/resume.json';

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-20 justify-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <h2 className="text-3xl font-display font-medium text-white/40 tracking-[0.2em] uppercase">Academic Foundation</h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      <div className="space-y-12">
        {(Array.isArray(resumeData?.education) ? resumeData.education : []).map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group grid md:grid-cols-[1fr_2fr] gap-8 p-8 border-l border-white/5 hover:border-blue-500/30 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <span className="text-blue-400 font-mono text-sm tracking-tighter">{edu.dates}</span>
              <div className="flex items-center gap-2 group-hover:text-white transition-colors">
                <GraduationCap size={18} className="text-white/20" />
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Qualification</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">{edu.degree}</h3>
              <p className="text-white/40 font-medium italic">{edu.institute}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
         <div className="relative z-10 grid md:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
               <Award size={32} />
            </div>
            <div>
               <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Ready for Higher Impact</h4>
               <p className="text-white/40 text-sm leading-relaxed max-w-xl">
                 Applying technical expertise in Full Stack and Android ecosystems to solve complex challenges and build user-centric digital solutions.
               </p>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-blue-500/10 transition-colors duration-700" />
      </div>
    </section>
  );
}
