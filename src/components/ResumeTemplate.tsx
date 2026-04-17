/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import resumeData from '../data/resume.json';

// This component is specially styled for A4 PDF export
export const ResumeTemplate = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref}
      className="bg-white p-12 w-[210mm] min-h-[297mm] mx-auto font-sans"
      id="resume-pdf-template"
      style={{ 
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        color: '#0f172a' 
      }}
    >
      <header className="pb-6 mb-8 flex justify-between items-end" style={{ borderBottom: '2px solid #0f172a' }}>
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ color: '#0f172a' }}>{resumeData?.basics?.name}</h1>
          <p className="text-xl font-medium italic" style={{ color: '#475569' }}>{resumeData?.basics?.title}</p>
        </div>
        <div className="text-right text-sm space-y-1" style={{ color: '#64748b' }}>
          <p>{resumeData?.basics?.email}</p>
          <p>{resumeData?.basics?.phone}</p>
          <p>{resumeData?.basics?.location}</p>
          {resumeData?.basics?.links?.[0] && <p>{resumeData.basics.links[0].url}</p>}
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-bold uppercase mb-4 pb-1" style={{ borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>Professional Summary</h2>
        <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>{resumeData?.basics?.summary}</p>
      </section>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-bold uppercase mb-4 pb-1" style={{ borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>Experience</h2>
            <div className="space-y-6">
              {(Array.isArray(resumeData?.experience) ? resumeData.experience : []).map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold" style={{ color: '#1e293b' }}>{exp.role}</h3>
                    <span className="text-xs font-mono" style={{ color: '#64748b' }}>{exp.dates}</span>
                  </div>
                  <p className="text-sm font-semibold mb-2" style={{ color: '#475569' }}>{exp.company}</p>
                  <ul className="list-disc list-inside text-xs space-y-1" style={{ color: '#475569' }}>
                    {exp.bullets?.map((bullet: string, j: number) => (
                      <li key={j} className="pl-2">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase mb-4 pb-1" style={{ borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>Key Projects</h2>
            <div className="space-y-4">
              {(Array.isArray(resumeData?.projects) ? resumeData.projects : []).map((project, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm" style={{ color: '#1e293b' }}>{project.title}</h3>
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: '#94a3b8' }}>{project.stack}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs space-y-0.5" style={{ color: '#475569' }}>
                    {project.bullets?.map((bullet: string, j: number) => (
                      <li key={j} className="pl-2">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-bold uppercase mb-3 pb-1" style={{ borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>Technical Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {(Array.isArray(resumeData?.skills) ? resumeData.skills : [])
                .filter((s: any) => s.category !== 'Soft').map((skill: any, i: number) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                    {skill.name}
                  </span>
                ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase mb-3 pb-1" style={{ borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>Soft Skills</h2>
            <ul className="text-[10px] space-y-1" style={{ color: '#475569' }}>
              {(Array.isArray(resumeData?.skills) ? resumeData.skills : [])
                .filter((s: any) => s.category === 'Soft').map((skill: any, i: number) => (
                  <li key={i} className="flex justify-between">
                    <span>{skill.name}</span>
                    <span style={{ color: '#cbd5e1' }}>{"●".repeat(skill.level / 20)}{"○".repeat(5 - skill.level / 20)}</span>
                  </li>
                ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase mb-3 pb-1" style={{ borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>Education</h2>
            <div className="space-y-3">
              {(Array.isArray(resumeData?.education) ? resumeData.education : []).map((edu, i) => (
                <div key={i}>
                  <p className="text-[11px] font-bold" style={{ color: '#1e293b' }}>{edu.degree}</p>
                  <p className="text-[10px] italic" style={{ color: '#64748b' }}>{edu.institute}</p>
                  <p className="text-[9px] font-mono" style={{ color: '#94a3b8' }}>{edu.dates}</p>
                </div>
              ))}
            </div>
          </section>


          <div className="pt-10 text-center">
             <div className="text-[8px] uppercase tracking-[0.3em]" style={{ color: '#cbd5e1' }}>Generated from Portfolio</div>
          </div>
        </div>
      </div>
    </div>
  );
});

ResumeTemplate.displayName = 'ResumeTemplate';
