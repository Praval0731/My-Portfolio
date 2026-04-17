/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import resumeData from '../data/resume.json';
import { 
  Zap, 
  Code2, 
  Terminal, 
  Database, 
  Smartphone, 
  Wind, 
  Users, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  Braces
} from 'lucide-react';
import SkillVisualization from './SkillVisualization';

const skillIconMap: Record<string, any> = {
  'React.js': Code2,
  'Next.js': Braces,
  'JavaScript': Terminal,
  'Python': Code2,
  'Java': Code2,
  'HTML': Code2,
  'CSS': Wind,
  'C Language': Terminal,
  'PHP OOP': Database,
  'MySQL': Database,
  'Android Studio': Smartphone,
  'Tailwind CSS': Wind,
  'Teamwork': Users,
  'Communication': MessageCircle,
  'Leadership': ShieldCheck,
  'Time Management': Clock
};

export default function Skills() {
  const technicalSkills = Array.isArray(resumeData?.skills) ? (resumeData.skills as any[]).filter(s => s.category !== 'Soft') : [];
  const softSkills = Array.isArray(resumeData?.skills) ? (resumeData.skills as any[]).filter(s => s.category === 'Soft') : [];

  return (
    <section id="skills" className="py-32 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/30 mb-4"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            Technical Ecosystem
          </motion.h2>
        </div>

        {/* D3 Visualization */}
        <div className="mb-20">
          <SkillVisualization />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <Zap className="text-blue-400" size={20} />
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight">Core Stack</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {technicalSkills.map((skill, idx) => {
              const Icon = skillIconMap[skill.name] || Code2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-[11px] text-white/50 font-mono flex flex-col items-center justify-center text-center transition-all hover:bg-white/10 hover:text-white"
                >
                  <Icon size={20} className="mb-2 text-white/20 group-hover:text-blue-400 transition-colors" />
                  {skill.name}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 pt-20 border-t border-white/5">
           <h3 className="text-[10px] uppercase tracking-[0.4em] font-mono text-white/20 mb-10 text-center font-bold">Industry Recognitions</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {resumeData?.certifications?.map((cert: any, idx) => (
               <motion.a
                 key={idx}
                 href={cert.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 + idx * 0.05 }}
                 className="flex items-center justify-between px-4 py-3 bg-white/[0.03] text-[9px] text-white/30 uppercase tracking-[0.2em] rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80 transition-all group"
               >
                 <span className="flex-1 mr-2 leading-relaxed">{cert.name}</span>
                 <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
               </motion.a>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}


