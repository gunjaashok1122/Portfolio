import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Ashok built our restaurant website from scratch. The digital menu showcase and banquet hall booking form have made it incredibly easy for customers to reach us. The website is extremely fast and looks amazing on phones!",
    author: "K. Venkata Rao",
    role: "Owner / Manager",
    company: "Sri Venkata Sai Food Plaza",
    rating: 5,
    initials: "VR",
    color: "from-purple-500 to-pink-500"
  },
  {
    quote: "Our school's admissions increased this year thanks to the professional portal Ashok designed. Parents find it easy to view school updates, event calendars, and academics. Highly recommend his development and deployment services!",
    author: "Sister Mary",
    role: "Principal Administrator",
    company: "Tapovan Vidyalayam",
    rating: 5,
    initials: "SM",
    color: "from-blue-500 to-cyan-500"
  },
  {
    quote: "Working with Ashok was a breeze. He redesigned our landing page to be high-converting and modern. The glassmorphic design and smooth reveal transitions have received glowing reviews from our SaaS users. Outstanding SEO setup!",
    author: "Vikram Reddy",
    role: "Co-Founder",
    company: "Apex Ledger Solutions",
    rating: 5,
    initials: "VR",
    color: "from-emerald-500 to-teal-500"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden md:px-12 px-6 border-t border-dark-border/10">
      
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Success Stories</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Client Testimonials
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl flex flex-col justify-between items-start text-left relative overflow-hidden group hover:border-primary/20 transition-all duration-300 reveal"
            >
              {/* Corner quote icon watermark */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-800/40 group-hover:text-primary/10 transition-colors pointer-events-none" />

              {/* Card Body */}
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium italic">
                  "{test.quote}"
                </p>
              </div>

              {/* Client Info footer */}
              <div className="flex items-center space-x-4 pt-6 border-t border-dark-border/10 mt-8 w-full">
                {/* Avatar with Initials */}
                <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${test.color} flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0`}>
                  {test.initials}
                </div>
                
                {/* Text details */}
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-white truncate">
                    {test.author}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold truncate mt-0.5">
                    {test.role}, <span className="text-purple-300/80">{test.company}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
