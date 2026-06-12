import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

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

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Website Design',
    budget: '₹5,000 - ₹10,000 / $60 - $120',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetOptions = [
    '₹5,000 - ₹10,000 / $60 - $120',
    '₹10,000 - ₹15,000 / $120 - $180',
    '₹15,000 - ₹25,000 / $180 - $300',
    '₹25,000+ / $300+',
  ];

  const projectTypes = [
    'Website Design',
    'Frontend Development',
    'Business Website',
    'Website Redesign',
    'SEO & Deployment',
    'Other Support',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetSelect = (val: string) => {
    setFormData((prev) => ({ ...prev, budget: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Construct WhatsApp message template with form parameters
    const whatsappText = `Hi Ashok,\n\nMy name is ${formData.name} (Email: ${formData.email}).\n\nI want to discuss a *${formData.projectType}* project.\nEstimated Budget: *${formData.budget}*.\n\nProject details:\n"${formData.message}"`;
    const whatsappUrl = `https://wa.me/919398972962?text=${encodeURIComponent(whatsappText)}`;
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      projectType: 'Website Design',
      budget: '₹5,000 - ₹10,000 / $60 - $120',
      message: '',
    });
    
    // Clear success notification after 5s
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden md:px-12 px-6 border-t border-dark-border/10">
      
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Get In Touch</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let's Build Something Amazing
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left reveal">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Got a concept in mind? Let's discuss and convert it to reality.
            </h3>
            
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              I am open to contract positions, freelance projects, or general tech queries. Drop an email, send a call, or use the interactive budget planner.
            </p>

            {/* Address Cards */}
            <div className="space-y-4 pt-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=gunjaashok1122@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-4.5 rounded-2xl flex items-center space-x-4 border border-dark-border/10 hover:border-primary/20 transition-all group"
              >
                <div className="p-3 rounded-xl bg-slate-900 border border-dark-border/40 text-primary group-hover:text-secondary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Email Me (Gmail)</p>
                  <p className="text-sm font-bold text-white mt-0.5">gunjaashok1122@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+919398972962"
                className="glass-panel p-4.5 rounded-2xl flex items-center space-x-4 border border-dark-border/10 hover:border-primary/20 transition-all group"
              >
                <div className="p-3 rounded-xl bg-slate-900 border border-dark-border/40 text-primary group-hover:text-secondary transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Call Me</p>
                  <p className="text-sm font-bold text-white mt-0.5">+91 9398972962</p>
                </div>
              </a>

              <div className="glass-panel p-4.5 rounded-2xl flex items-center space-x-4 border border-dark-border/10 group">
                <div className="p-3 rounded-xl bg-slate-900 border border-dark-border/40 text-primary group-hover:text-secondary transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                  <p className="text-sm font-bold text-white mt-0.5">Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>

            {/* Socials Connection */}
            <div className="space-y-3 pt-6 border-t border-dark-border/15">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Connect Digitally</h4>
              <div className="flex space-x-3.5">
                <a
                  href="https://github.com/gunjaashok1122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-dark-border/40 text-gray-400 hover:text-white hover:border-primary/30 transition-all shadow-md cursor-pointer hover:scale-105"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gunjaashok/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-dark-border/40 text-gray-400 hover:text-white hover:border-primary/30 transition-all shadow-md cursor-pointer hover:scale-105"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                 <a
                  href="https://www.instagram.com/gunjaashok1122/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-dark-border/40 text-gray-400 hover:text-white hover:border-primary/30 transition-all shadow-md cursor-pointer hover:scale-105"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@gunjaashok1122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-dark-border/40 text-gray-400 hover:text-white hover:border-primary/30 transition-all shadow-md cursor-pointer hover:scale-105"
                >
                  <YoutubeIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full reveal">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl relative overflow-hidden border border-dark-border/10">
              
              {isSubmitted && (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col justify-center items-center text-center px-6 z-20">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10 animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-gray-400 mt-2 max-w-sm">
                    Thank you for reaching out, Gunja Ashok will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-xs font-bold text-primary hover:text-secondary transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-1.5">
                  <label htmlFor="projectType" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-3.5 text-sm text-white transition-all font-semibold cursor-pointer"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-slate-950 text-white font-medium">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interactive Budget Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Estimated Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {budgetOptions.map((option) => {
                      const isSelected = formData.budget === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleBudgetSelect(option)}
                          className={`py-3.5 px-3.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary/20 border-primary text-white shadow-md shadow-primary/10'
                              : 'bg-slate-950/60 border-dark-border/30 text-gray-400 hover:text-white hover:border-primary/20'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Project details <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your goals, timelines, or requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 transition-all font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-102 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
