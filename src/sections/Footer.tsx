import React from 'react';
import { Terminal, Heart } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 relative overflow-hidden md:px-12 px-6 border-t border-dark-border/10 bg-slate-950/40 backdrop-blur-md">
      
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
        
        {/* Footer Top */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-dark-border/10">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center space-x-2 text-white font-extrabold text-lg tracking-tight group"
          >
            <div className="w-7.5 h-7.5 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md">
              <Terminal className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-gradient">{data.hero.name}</span>
          </a>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Home', 'About', 'Tech Stack', 'Projects', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(`#${item.toLowerCase().replace(' ', '')}`);
                }}
                className="text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {data.hero.socialLinks.github && (
              <a
                href={data.hero.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <GithubIcon className="w-4.5 h-4.5" />
              </a>
            )}
            {data.hero.socialLinks.linkedin && (
              <a
                href={data.hero.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>
            )}
            {data.hero.socialLinks.instagram && (
              <a
                href={data.hero.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <InstagramIcon className="w-4.5 h-4.5" />
              </a>
            )}
            {data.hero.socialLinks.youtube && (
              <a
                href={data.hero.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <YoutubeIcon className="w-4.5 h-4.5" />
              </a>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-500">
          <p>
            © {new Date().getFullYear()} {data.hero.name}. All rights reserved.
            <a href="#admin" className="ml-2.5 hover:text-white transition-all cursor-pointer opacity-30 hover:opacity-100 font-bold">| Console</a>
          </p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> by <span className="text-gray-300 font-bold">{data.hero.name}</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
