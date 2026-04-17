/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import resumeData from './data/resume.json';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import SplashIntro from './components/SplashIntro';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'projects', 'skills', 'education', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-blue-500/30">
      <AnimatePresence>
        {loading && <SplashIntro onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <AnimatedBackground />

          {/* Navigation */}
          <nav className="fixed top-0 inset-x-0 z-50 h-20 px-6 sm:px-12 flex items-center justify-between backdrop-blur-md bg-[#050505]/20 border-b border-white/5">
            <div className="text-xl font-display font-bold tracking-tighter">PY</div>
            
            <div className="hidden md:flex items-center gap-10">
              {(['Home', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const id = item === 'Home' ? 'hero' : item.toLowerCase();
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-xs uppercase tracking-[0.2em] font-mono transition-colors ${
                    activeSection === (item === 'Home' ? 'hero' : item.toLowerCase()) ? 'text-white' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Social icons removed from header */}
            </div>
          </nav>

          <main>
            <Hero />
            <Experience />
            <Projects />
            <Skills />
            <Education />

            {/* Additional Info / Footer */}
            <footer id="contact" className="py-32 px-6 border-t border-white/5 bg-white/[0.01]">
              <div className="max-w-6xl mx-auto flex flex-col items-center">
                <div className="w-full mb-20">
                  <h5 className="text-[10px] uppercase tracking-widest font-mono text-white/30 mb-10 font-bold text-center">Professional Reach</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <a 
                      href={`tel:${resumeData?.basics?.phone}`} 
                      className="group p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-blue-500/5 hover:border-blue-500/20 transition-all flex flex-col items-center text-center"
                    >
                      <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <Phone size={24} className="text-blue-500" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/30 mb-3">Phone</span>
                      <span className="text-lg font-display font-medium text-white/80 group-hover:text-white transition-colors">{resumeData?.basics?.phone}</span>
                    </a>

                    <a 
                      href={`mailto:${resumeData?.basics?.email}`} 
                      className="group p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-purple-500/5 hover:border-purple-500/20 transition-all flex flex-col items-center text-center"
                    >
                      <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                        <Mail size={24} className="text-purple-500" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/30 mb-3">Email</span>
                      <span className="text-lg font-display font-medium text-white/80 group-hover:text-white transition-colors">{resumeData?.basics?.email}</span>
                    </a>

                    {resumeData?.basics?.links?.[0] && (
                      <a 
                        href={resumeData?.basics?.links[0]?.url} 
                        target="_blank"
                        rel="noreferrer"
                        className="group p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-blue-600/5 hover:border-blue-600/20 transition-all flex flex-col items-center text-center"
                      >
                        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <Linkedin size={24} className="text-blue-600" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/30 mb-3">LinkedIn</span>
                        <span className="text-lg font-display font-medium text-white/80 group-hover:text-white transition-colors">Connect on LinkedIn</span>
                      </a>
                    )}

                    <div className="group p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-red-500/5 hover:border-red-500/20 transition-all flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                        <MapPin size={24} className="text-red-500" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-white/30 mb-3">Location</span>
                      <span className="text-sm md:text-md font-display font-medium text-white/80 group-hover:text-white transition-colors text-center leading-relaxed">
                        {resumeData?.basics?.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-20 border-t border-white/5 w-full">
                  <p className="text-[10px] uppercase tracking-[0.5em] font-mono text-white/20">
                    &copy; {new Date().getFullYear()} {resumeData?.basics?.name} &mdash; Built for Impact
                  </p>
                </div>
              </div>
            </footer>
          </main>
        </>
      )}
      </div>
  );
}

