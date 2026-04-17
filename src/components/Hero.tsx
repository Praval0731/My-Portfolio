/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Download, Loader2, ChevronDown } from 'lucide-react';
import resumeData from '../data/resume.json';
import { generatePDF } from '../lib/pdf';


export default function Hero() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    const name = resumeData?.basics?.name || 'Applicant';
    await generatePDF(`Resume_${name.replace(/\s+/g, '_')}.pdf`);
    setIsGenerating(false);
  };

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10"
      >
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tight">
          {resumeData?.basics?.name}
        </h1>

        <p className="text-xl md:text-2xl text-white/60 font-sans max-w-2xl mx-auto mb-10 leading-relaxed italic">
          {resumeData?.basics?.title}
        </p>

        <p className="text-base text-white/40 max-w-xl mx-auto mb-12 leading-relaxed">
          {resumeData?.basics?.summary}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={scrollToExperience}
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full transition-all hover:scale-105 active:scale-95"
          >
            View Experience
            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          </button>
          
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Download size={18} />
            )}
            {isGenerating ? 'Generating...' : 'Download Resume'}
          </button>
        </div>
      </motion.div>

      <motion.button
        onClick={scrollToExperience}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20 hover:text-white/60 transition-colors cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
