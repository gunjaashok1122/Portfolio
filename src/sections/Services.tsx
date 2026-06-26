import React from 'react';
import { Palette, Code, Laptop, RefreshCw, Search, Globe, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Services: React.FC = () => {
  const { data } = usePortfolio();

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Palette':
        return <Palette className="w-6 h-6" />;
      case 'Code':
        return <Code className="w-6 h-6" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6" />;
      case 'Search':
        return <Search className="w-6 h-6" />;
      case 'Globe':
        return <Globe className="w-6 h-6" />;
      default:
        return <Laptop className="w-6 h-6" />;
    }
  };

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
          {data.services.map((service, idx) => (
            <div
              key={idx}
              className={`glass-panel p-8 rounded-3xl flex flex-col justify-between items-start text-left relative overflow-hidden group border border-dark-border/10 transition-all duration-300 hover:-translate-y-1.5 ${service.color} reveal`}
            >
              {/* Corner Glow Overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="space-y-6">
                {/* Icon Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-dark-border/40 text-primary group-hover:text-secondary transition-all duration-300 w-fit">
                  {getServiceIcon(service.icon)}
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
