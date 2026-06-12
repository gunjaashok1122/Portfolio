import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

import foodPlazaImg from '../assets/SVS MOCKUPChatGPT.png';
import schoolImg from '../assets/tapovan Vidyalayam chatgpt.png';
import makefitImg from '../assets/makefit_responsive.png';
import randomQuoteImg from '../assets/random_quote.jpg';
import levelUpImg from '../assets/LevelUp Life ChatGPT.png';

interface Project {
  name: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  imageFit?: string;
}

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects: Project[] = [
  {
    name: 'Sri Venkata Sai Food Plaza',
    category: 'Restaurant Website',
    description: 'Modern restaurant website featuring digital menu showcase, banquet hall event details, interactive food gallery, and direct table reservations system.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    image: foodPlazaImg,
    demoUrl: 'https://svsfoodplaza.com',
    githubUrl: 'https://github.com/gunjaashok1122',
    imageFit: 'object-cover object-top'
  },
  {
    name: 'Tapovan Vidyalayam',
    category: 'School Portal',
    description: 'Professional educational institute portal featuring online admissions, digital academics guide, event calendars, facilities gallery, and contact pipelines.',
    tech: ['React.js', 'Firebase', 'Tailwind CSS', 'Vite'],
    image: schoolImg,
    demoUrl: 'https://tapovanvidyalayam.edu.in',
    githubUrl: 'https://github.com/gunjaashok1122',
    imageFit: 'object-cover object-top'
  },
  {
    name: 'LevelUp Life',
    category: 'Gamified Life Organizer',
    description: 'A mobile & web life organizer that turns task management, habit building, fitness tracking, and calendar schedules into a gamified RPG experience.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Capacitor', 'Firebase'],
    image: levelUpImg,
    demoUrl: 'https://leveluplifess.netlify.app',
    githubUrl: 'https://github.com/gunjaashok1122/LevelUp_Life',
    imageFit: 'object-contain p-4'
  },
  {
    name: 'MakeFit Tracker',
    category: 'Fitness Platform (Mobile/Web)',
    description: 'Sleek cross-platform health tracker built using Flutter. Integrates customized workout planners, caloric logging gauges, weight analytics, and fully responsive layouts.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Netlify Web App'],
    image: makefitImg,
    demoUrl: 'https://makefitss.netlify.app',
    githubUrl: 'https://github.com/gunjaashok1122/codealpha_Fitness-tracker',
    imageFit: 'object-contain p-4'
  },
  {
    name: 'Random Quotes For You',
    category: 'Expo Mobile App',
    description: 'Interactive motivational quote generator app. Features rapid-fetch APIs, custom categories, user local favorites storage, and beautiful share card builders.',
    tech: ['React Native', 'Expo', 'Tailwind CSS', 'REST API'],
    image: randomQuoteImg,
    demoUrl: 'https://random-quotesssss.netlify.app',
    githubUrl: 'https://github.com/gunjaashok1122/codealpha_Random_Quote_Generator',
    imageFit: 'object-contain p-4'
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden md:px-12 px-6 border-t border-dark-border/10">

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">My Showcase</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Featured Projects
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full group relative border border-dark-border/10 hover:border-primary/25 transition-all duration-500 reveal"
            >
              {/* Outer Card Glow Border Animation Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Project Image Box */}
              <div className="relative overflow-hidden aspect-video bg-slate-950/60 border-b border-dark-border/10 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.name}
                  className={`w-full h-full ${project.imageFit || 'object-cover'} group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100`}
                  loading="lazy"
                />

                {/* Float Category Badge */}
                <div className="absolute top-3 left-3 glass-panel px-2.5 py-1 rounded-full text-[9px] font-bold text-white flex items-center gap-1 shadow-md">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-400" />
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Text / Tech Info */}
              <div className="p-5 flex flex-col flex-grow justify-between text-left space-y-5">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-primary transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-semibold text-purple-200 bg-primary/10 border border-primary/15 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center space-x-3 pt-3 border-t border-dark-border/10">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 text-xs font-bold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Preview</span>
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white px-3.5 py-2 rounded-lg bg-slate-900 border border-dark-border/40 hover:border-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
