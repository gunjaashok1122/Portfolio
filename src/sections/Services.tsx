import React from 'react';
import { Palette, Code, Laptop, RefreshCw, Search, Globe, ChevronRight } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string; // Tailwind glow border color class
}

const services: Service[] = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Website Design',
    description: 'Modern, high-fidelity UI/UX focused interfaces. Designed from scratch to feel premium, visually engaging, and aligned with your brand identity.',
    color: 'group-hover:border-purple-500/30'
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: 'Frontend Development',
    description: 'High-performance interactive frontends built using React.js and Next.js, leveraging cutting-edge web architecture for smooth browsing.',
    color: 'group-hover:border-blue-500/30'
  },
  {
    icon: <Laptop className="w-6 h-6" />,
    title: 'Business Websites',
    description: 'Tailored digital solutions for schools, restaurants, local shops, and companies looking to secure an impressive, lead-generating online presence.',
    color: 'group-hover:border-emerald-500/30'
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Website Redesign',
    description: 'Breathe new life into aging codebases. Transform slow legacy websites into modern, lightning-fast, glassmorphic client-converting experiences.',
    color: 'group-hover:border-rose-500/30'
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'SEO Optimization',
    description: 'Implementation of indexing best-practices. Enhance semantic structure, schemas, and metadata to boost your ranking on search engines.',
    color: 'group-hover:border-amber-500/30'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Website Deployment',
    description: 'Professional assistance with server provisioning, domain mapping, DNS config, Vercel/Netlify hosting, and SSL installation.',
    color: 'group-hover:border-cyan-500/30'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden md:px-12 px-6 border-t border-dark-border/10">
      
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">My Offerings</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            What I Do
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`glass-panel p-8 rounded-3xl flex flex-col justify-between items-start text-left relative overflow-hidden group border border-dark-border/10 transition-all duration-300 hover:-translate-y-1.5 ${service.color} reveal`}
            >
              {/* Corner Glow Overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="space-y-6">
                {/* Icon Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-dark-border/40 text-primary group-hover:text-secondary transition-all duration-300 w-fit">
                  {service.icon}
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Call to action text indicator */}
              <div className="mt-8 flex items-center space-x-1 text-xs font-semibold text-purple-300/80 group-hover:text-white transition-colors cursor-pointer">
                <span>Learn More</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
