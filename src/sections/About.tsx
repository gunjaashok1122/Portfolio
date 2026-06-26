import React from 'react';
import { Code2, Award, Briefcase, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-start group relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Icon Circle */}
      <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/25 mb-4 group-hover:bg-secondary/20 group-hover:text-secondary group-hover:border-secondary/25 transition-all">
        {icon}
      </div>
      
      <div>
        <h4 className="text-3xl font-extrabold text-white">{value}</h4>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1.5">{label}</p>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  const { data } = usePortfolio();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden md:px-12 px-6 border-t border-dark-border/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Top Tag Button */}
        <div className="reveal mb-6">
          <span className="px-5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-bold text-primary tracking-widest uppercase cursor-default">
            {data.about.title}
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {data.about.heading.split(' ').map((word, i, arr) => {
              if (i === arr.length - 1) {
                return <span key={i} className="text-gradient"> {word}</span>;
              }
              return <span key={i}>{word} </span>;
            })}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-semibold max-w-md mx-auto">
            {data.about.description}
          </p>
        </div>

        {/* Grid Content */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Who I Am Card */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl text-left flex flex-col justify-between space-y-8 reveal relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">{data.about.whoIAmTitle}</h3>
              
              {data.about.whoIAmParagraphs.map((paragraph, index) => (
                <p key={index} className="text-sm text-gray-300 leading-relaxed font-medium">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Bottom tags list */}
            <div className="flex flex-wrap gap-2 pt-2 relative z-10">
              {data.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full text-[10px] font-bold text-gray-400 bg-slate-900/60 border border-dark-border/30 hover:text-white hover:border-primary/20 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Stats Card Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 reveal">
            {data.about.stats.map((stat, idx) => (
              <StatCard
                key={idx}
                icon={getIcon(stat.icon)}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
