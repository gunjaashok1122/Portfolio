import React from 'react';
import { Calendar, Briefcase } from 'lucide-react';

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

const experiences: TimelineItem[] = [
  {
    role: 'Freelance Web Developer',
    company: 'Self-Employed / Digital Contractor',
    period: '2024 - Present',
    description: 'Building custom-designed high-performance websites for restaurants, academic institutions, and growing local businesses using modern React, Next.js, and backend clouds.',
    achievements: [
      'Successfully deployed 20+ responsive client websites, achieving a 100% satisfaction rate.',
      'Reduced loading times by 40% across client sites using code splitting and asset optimization.',
      'Constructed complete booking and admissions workflows, reducing manual operations for restaurant and school management.'
    ]
  },
  {
    role: 'UI/UX Designer & Frontend Developer',
    company: 'Freelance Projects',
    period: '2023 - 2024',
    description: 'Collaborated with clients to design wireframes, high-fidelity mockups, and convert design prototypes into pixel-perfect responsive HTML/CSS/JS frontend codebases.',
    achievements: [
      'Created wireframes and user-experience prototypes in Figma for SaaS projects.',
      'Ensured 100% responsive styling compliance using custom CSS grid systems and Tailwind CSS.',
      'Created micro-interactions and animations that improved page visitor retention by 15%.'
    ]
  },
  {
    role: 'Web Development Learner & Intern',
    company: 'Open Source / Academic Training',
    period: '2022 - 2023',
    description: 'Learned modern software development practices, git workflows, API architectures, and Javascript fundamentals through community mentorship and building open-source web projects.',
    achievements: [
      'Developed and published interactive utility tools on GitHub using React and basic state libraries.',
      'Mastered Git and version control systems to collaborate effectively on developer projects.',
      'Participated in code review cycles, learning writing clean, maintainable, and dry components.'
    ]
  }
];

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden md:px-12 px-6 border-t border-dark-border/10">
      
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-20 reveal">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">My Journey</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Experience Timeline
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Track Container */}
        <div className="relative border-l border-dark-border/40 pl-6 sm:pl-10 space-y-12 text-left">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group reveal">
              {/* Timeline Connector Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-primary group-hover:border-secondary group-hover:scale-125 transition-all duration-300 shadow-md shadow-primary/30" />
              
              {/* Animated glow ray behind timeline items */}
              <div className="absolute top-0 -left-6 sm:-left-10 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 pointer-events-none" />

              {/* Glass Card for Item details */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-dark-border/10 group-hover:border-primary/20 transition-all duration-300">
                
                {/* Accent Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 pb-4 border-b border-dark-border/10">
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-purple-300/80 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 shrink-0" />
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Period badge */}
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-dark-border/40 text-xs font-bold text-gray-300 w-fit shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mt-5 space-y-4">
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium">
                    {exp.description}
                  </p>

                  {/* Bullet achievements */}
                  <div className="space-y-2">
                    {exp.achievements.map((ach, achIdx) => (
                      <div key={achIdx} className="flex items-start space-x-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-400 leading-relaxed">{ach}</span>
                      </div>
                    ))}
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
