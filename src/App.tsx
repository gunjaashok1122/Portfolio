import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { GlowBackground } from './components/GlowBackground';
import { Hero } from './sections/Hero';
import { TechStack } from './sections/TechStack';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { AdminPanel } from './components/AdminPanel';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function PortfolioApp() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');
  const { loading } = usePortfolio();

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Intersection Observer for Scroll Reveal animations
  useEffect(() => {
    if (isAdmin || loading) return;

    const reveals = document.querySelectorAll('.reveal');
    
    const observerOptions = {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px', // Trigger slightly before element enters view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          // Removes class to allow re-triggering animation when scrolling back up
          entry.target.classList.remove('active');
        }
      });
    }, observerOptions);

    reveals.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [isAdmin, loading]);

  if (isAdmin) {
    if (loading) {
      return (
        <div className="min-h-screen bg-dark-bg flex justify-center items-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Connecting to Database...</p>
          </div>
        </div>
      );
    }
    return <AdminPanel />;
  }

  return (
    <div className="relative min-h-screen text-slate-200 antialiased font-sans selection:bg-primary/30 selection:text-white">
      {/* Premium Particles, Blobs and Spotlight Background */}
      <GlowBackground />

      {/* Sticky Blurred Glass Navigation Bar */}
      <Navbar />

      {/* Main Pages Assembler */}
      <main className="relative z-10 w-full">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Services />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App;
