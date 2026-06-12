import React from 'react';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import avatarImg from '../assets/ashok_chatgpt.png';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen lg:h-screen lg:max-h-[960px] relative flex items-center py-20 lg:py-0 overflow-hidden md:px-12 px-6"
    >
      <div className="max-w-[85rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left space-y-6 reveal py-4 lg:py-8">
          
          {/* Availability Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-purple-200 tracking-wider uppercase flex items-center gap-1.5">
              Available for Freelance <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] font-extrabold tracking-tight text-white leading-[1.1]">
            Hi, I'm <span className="text-gradient">Gunja Ashok</span>
            <span className="block mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-300">
              Web & App Developer
            </span>
          </h1>

          {/* Subheading Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl leading-relaxed">
            I build modern, responsive, high-performance websites and web applications that help businesses grow online. Focused on turning complex ideas into premium, interactive web products.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection('#projects')}
              className="flex items-center justify-center space-x-2.5 px-8 py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-lg shadow-primary/15 hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="flex items-center justify-center space-x-2 px-6 py-4 rounded-full text-sm font-semibold text-gray-300 hover:text-white glass-panel border border-dark-border/40 hover:border-primary/45 hover:bg-primary/5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 text-purple-400" />
              <span>Hire Me</span>
            </button>
          </div>

          {/* Digital Connect Subsection in the Home Section */}
          <div className="pt-6 border-t border-dark-border/10 w-full max-w-xl space-y-4">
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <span className="h-px w-6 bg-dark-border/30" /> Digital Connect
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/gunjaashok1122"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-3.5 rounded-xl text-white hover:text-white/80 hover:border-primary/45 hover:bg-primary/5 transition-all duration-300 hover:scale-115 flex items-center justify-center shadow-md cursor-pointer group"
                title="GitHub"
              >
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/gunjaashok/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-3.5 rounded-xl text-white hover:text-white/80 hover:border-primary/45 hover:bg-primary/5 transition-all duration-300 hover:scale-115 flex items-center justify-center shadow-md cursor-pointer group"
                title="LinkedIn"
              >
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" rx="1" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/gunjaashok1122/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-3.5 rounded-xl text-white hover:text-white/80 hover:border-primary/45 hover:bg-primary/5 transition-all duration-300 hover:scale-115 flex items-center justify-center shadow-md cursor-pointer group"
                title="Instagram"
              >
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@gunjaashok1122"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-3.5 rounded-xl text-white hover:text-white/80 hover:border-primary/45 hover:bg-primary/5 transition-all duration-300 hover:scale-115 flex items-center justify-center shadow-md cursor-pointer group"
                title="YouTube"
              >
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="10 15 15 12 10 9 10 15" />
                </svg>
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=gunjaashok1122@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-3.5 rounded-xl text-white hover:text-white/80 hover:border-primary/45 hover:bg-primary/5 transition-all duration-300 hover:scale-115 flex items-center justify-center shadow-md cursor-pointer group"
                title="Email (Gmail)"
              >
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Right Graphic/Avatar Column (40% width representation) */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-8 lg:py-0 lg:pl-8 reveal">
          
          {/* Glassmorphism Profile Showcase Card (Expanded Size) */}
          <div className="relative w-[240px] h-[360px] sm:w-[310px] sm:h-[465px] lg:w-[340px] lg:h-[510px] xl:w-[380px] xl:h-[570px] rounded-3xl p-1.5 bg-slate-900/40 border border-white/10 backdrop-blur-md shadow-2xl shadow-primary/10 transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20">
            {/* Spreading Ambient Glow that expands and covers the page */}
            <div className="absolute -inset-64 sm:-inset-80 rounded-full bg-gradient-to-tr from-primary/35 via-purple-600/15 to-secondary/40 blur-[140px] sm:blur-[200px] opacity-50 -z-10 animate-pulse-slow pointer-events-none" />
            
            {/* The Image inside */}
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-dark-bg bg-slate-950 flex items-center justify-center">
              <img
                src={avatarImg}
                alt="Gunja Ashok - Full Stack Developer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
