/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import resumeData from '../data/resume.json';

interface Skill {
  name: string;
  category: string;
  level: number;
}

export default function SkillVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;
    const skills = (Array.isArray(resumeData?.skills) ? resumeData.skills : [])
      .filter((s: any) => s.category !== 'Soft') as Skill[];

    if (skills.length === 0) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    svg.selectAll('*').remove();

    const color = d3.scaleOrdinal()
      .domain(['Languages', 'Frameworks', 'Backend', 'Tools'])
      .range(['#3b82f6', '#8b5cf6', '#ec4899', '#10b981']);

    const pack = d3.pack<Skill>()
      .size([width, height])
      .padding(4);

    const root = d3.hierarchy({ children: skills } as any)
      .sum((d: any) => d.level || 0);

    const nodes = pack(root as any).leaves();

    const simulation = d3.forceSimulation(nodes as any)
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05))
      .force('collide', d3.forceCollide((d: any) => d.r + 2))
      .on('tick', () => {
        node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      });

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'skill-node')
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d: any) => {
        setSelectedSkill(d.data);
        d3.select(event.currentTarget).select('circle')
          .transition()
          .duration(200)
          .attr('r', d.r * 1.1)
          .style('filter', 'brightness(1.5) drop-shadow(0 0 10px rgba(255,255,255,0.3))');
      })
      .on('mouseleave', (event, d: any) => {
        setSelectedSkill(null);
        d3.select(event.currentTarget).select('circle')
          .transition()
          .duration(200)
          .attr('r', d.r)
          .style('filter', 'none');
      });

    node.append('circle')
      .attr('r', (d: any) => d.r)
      .attr('fill', (d: any) => color(d.data.category) as string)
      .attr('fill-opacity', 0.2)
      .attr('stroke', (d: any) => color(d.data.category) as string)
      .attr('stroke-width', 2);

    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .style('font-size', (d: any) => Math.min(d.r / 3, 12))
      .style('fill', 'white')
      .style('font-family', 'var(--font-mono)')
      .style('pointer-events', 'none')
      .text((d: any) => d.data.name);

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-10">
         <h3 className="text-sm uppercase tracking-[0.4em] font-mono text-white/30 mb-2">Interactive Ecosystem</h3>
         <div className="flex gap-4 justify-center">
            {['Languages', 'Frameworks', 'Backend', 'Tools'].map((cat, i) => (
              <div key={cat} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'][i] }} />
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">{cat}</span>
              </div>
            ))}
         </div>
      </div>

      <svg ref={svgRef} className="mx-auto" />

      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl min-w-[200px]"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-bold">{selectedSkill.name}</span>
              <span className="text-[10px] uppercase font-mono text-white/40">{selectedSkill.category}</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${selectedSkill.level}%` }}
                className="h-full bg-blue-500"
              />
            </div>
            <div className="mt-2 text-[10px] text-white/40 flex justify-between">
              <span>Proficiency</span>
              <span>{selectedSkill.level}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 text-center text-white/20 text-[10px] uppercase tracking-widest font-mono">
        Hover over nodes to explore proficiency
      </div>
    </div>
  );
}
