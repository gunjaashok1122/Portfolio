import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GlowBackground } from './components/GlowBackground';
import { Hero } from './sections/Hero';
import { TechStack } from './sections/TechStack';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import './App.css';

function App() {
  // Intersection Observer for Scroll Reveal animations
  useEffect(() => {
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
  }, []);

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
    </div>
  );
}

export default App;
