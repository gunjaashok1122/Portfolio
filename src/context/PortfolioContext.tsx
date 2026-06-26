import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { db, auth } from '../firebase';

// Helper function to compress image and convert to Base64 (bypasses Firebase Storage Blaze plan)
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 720; // 720px is perfect for portfolio card layouts
        const MAX_HEIGHT = 480;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        // Compress as JPEG at 0.65 quality to keep size small (~20KB - 40KB)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

// Data Interfaces
export interface HeroData {
  greeting: string;
  name: string;
  title: string;
  description: string;
  availabilityText: string;
  avatarUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    email: string;
  };
}

export interface AboutData {
  title: string;
  heading: string;
  description: string;
  whoIAmTitle: string;
  whoIAmParagraphs: string[];
  tags: string[];
  stats: {
    value: string;
    label: string;
    icon: string;
  }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface ProjectItem {
  name: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  imageFit?: string;
}

export interface ContactData {
  title: string;
  heading: string;
  introText: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  whatsappNumber: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  experiences: ExperienceItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  contact: ContactData;
}

const initialData: PortfolioData = {
  hero: {
    greeting: "Hi, I'm",
    name: "Gunja Ashok",
    title: "Web & App Developer",
    description: "I build modern, responsive, high-performance websites and web applications that help businesses grow online. Focused on turning complex ideas into premium, interactive web products.",
    availabilityText: "Available for Freelance",
    avatarUrl: "/images/ashok_chatgpt.png",
    socialLinks: {
      github: "https://github.com/gunjaashok1122",
      linkedin: "https://www.linkedin.com/in/gunjaashok/",
      instagram: "https://www.instagram.com/gunjaashok1122/",
      youtube: "https://www.youtube.com/@gunjaashok1122",
      email: "gunjaashok1122@gmail.com"
    }
  },
  about: {
    title: "About Me",
    heading: "Passionate about building",
    description: "A quick-learning developer with a builder mindset and a love for elegant, user-friendly interfaces.",
    whoIAmTitle: "Who I am",
    whoIAmParagraphs: [
      "I'm Gunja Ashok, a final-year Computer Science & Engineering student passionate about software development and creating modern digital experiences. I love building websites and mobile applications with clean, user-friendly, and responsive interfaces.",
      "My goal is to join a professional development team where I can contribute to impactful projects, enhance my technical skills, and continue learning emerging technologies. I'm a quick learner who adapts easily — confidence, positive attitude, and continuous improvement define how I work."
    ],
    tags: ["Quick Learner", "Team Player", "Problem Solver", "Adaptable", "Detail-oriented"],
    stats: [
      { value: "5", label: "Projects Completed", icon: "Code2" },
      { value: "2", label: "Certifications", icon: "Award" },
      { value: "1", label: "Internship", icon: "Briefcase" },
      { value: "10+", label: "Technologies", icon: "Sparkles" }
    ]
  },
  experiences: [
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
  ],
  services: [
    {
      icon: 'Palette',
      title: 'Website Design',
      description: 'Modern, high-fidelity UI/UX focused interfaces. Designed from scratch to feel premium, visually engaging, and aligned with your brand identity.',
      color: 'group-hover:border-purple-500/30'
    },
    {
      icon: 'Code',
      title: 'Frontend Development',
      description: 'High-performance interactive frontends built using React.js and Next.js, leveraging cutting-edge web architecture for smooth browsing.',
      color: 'group-hover:border-blue-500/30'
    },
    {
      icon: 'Laptop',
      title: 'Business Websites',
      description: 'Tailored digital solutions for schools, restaurants, local shops, and companies looking to secure an impressive, lead-generating online presence.',
      color: 'group-hover:border-emerald-500/30'
    },
    {
      icon: 'RefreshCw',
      title: 'Website Redesign',
      description: 'Breathe new life into aging codebases. Transform slow legacy websites into modern, lightning-fast, glassmorphic client-converting experiences.',
      color: 'group-hover:border-rose-500/30'
    },
    {
      icon: 'Search',
      title: 'SEO Optimization',
      description: 'Implementation of indexing best-practices. Enhance semantic structure, schemas, and metadata to boost your ranking on search engines.',
      color: 'group-hover:border-amber-500/30'
    },
    {
      icon: 'Globe',
      title: 'Website Deployment',
      description: 'Professional assistance with server provisioning, domain mapping, DNS config, Vercel/Netlify hosting, and SSL installation.',
      color: 'group-hover:border-cyan-500/30'
    }
  ],
  projects: [
    {
      name: 'Sri Venkata Sai Food Plaza',
      category: 'Restaurant Website',
      description: 'Modern restaurant website featuring digital menu showcase, banquet hall event details, interactive food gallery, and direct table reservations system.',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      image: '/images/SVS MOCKUPChatGPT.png',
      demoUrl: 'https://svsfoodplaza.com',
      githubUrl: 'https://github.com/gunjaashok1122',
      imageFit: 'object-cover object-top'
    },
    {
      name: 'Tapovan Vidyalayam',
      category: 'School Portal',
      description: 'Professional educational institute portal featuring online admissions, digital academics guide, event calendars, facilities gallery, and contact pipelines.',
      tech: ['React.js', 'Firebase', 'Tailwind CSS', 'Vite'],
      image: '/images/tapovan Vidyalayam chatgpt.png',
      demoUrl: 'https://tapovanvidyalayam.edu.in',
      githubUrl: 'https://github.com/gunjaashok1122',
      imageFit: 'object-cover object-top'
    },
    {
      name: 'LevelUp Life',
      category: 'Gamified Life Organizer',
      description: 'A mobile & web life organizer that turns task management, habit building, fitness tracking, and calendar schedules into a gamified RPG experience.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Capacitor', 'Firebase'],
      image: '/images/LevelUp Life ChatGPT.png',
      demoUrl: 'https://leveluplifess.netlify.app',
      githubUrl: 'https://github.com/gunjaashok1122/LevelUp_Life',
      imageFit: 'object-contain p-4'
    },
    {
      name: 'MakeFit Tracker',
      category: 'Fitness Platform (Mobile/Web)',
      description: 'Sleek cross-platform health tracker built using Flutter. Integrates customized workout planners, caloric logging gauges, weight analytics, and fully responsive layouts.',
      tech: ['Flutter', 'Dart', 'Firebase', 'Netlify Web App'],
      image: '/images/makefit_responsive.png',
      demoUrl: 'https://makefitss.netlify.app',
      githubUrl: 'https://github.com/gunjaashok1122/codealpha_Fitness-tracker',
      imageFit: 'object-contain p-4'
    },
    {
      name: 'Random Quotes For You',
      category: 'Expo Mobile App',
      description: 'Interactive motivational quote generator app. Features rapid-fetch APIs, custom categories, user local favorites storage, and beautiful share card builders.',
      tech: ['React Native', 'Expo', 'Tailwind CSS', 'REST API'],
      image: '/images/random_quote.jpg',
      demoUrl: 'https://random-quotesssss.netlify.app',
      githubUrl: 'https://github.com/gunjaashok1122/codealpha_Random_Quote_Generator',
      imageFit: 'object-contain p-4'
    }
  ],
  contact: {
    title: "Get In Touch",
    heading: "Let's Build Something Amazing",
    introText: "Got a concept in mind? Let's discuss and convert it to reality.",
    description: "I am open to contract positions, freelance projects, or general tech queries. Drop an email, send a call, or use the interactive budget planner.",
    email: "gunjaashok1122@gmail.com",
    phone: "+91 9398972962",
    location: "Hyderabad, Telangana, India",
    whatsappNumber: "919398972962"
  }
};

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  user: User | null;
  updateData: (newData: PortfolioData) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  logout: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Listen to Firestore changes in real-time and handle database seeding
  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'data');
    
    // Subscribe to document changes
    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.data() as PortfolioData);
        setLoading(false);
      } else {
        // Document doesn't exist yet, seed it!
        try {
          console.log("Seeding database with default portfolio values...");
          await setDoc(docRef, initialData);
          setData(initialData);
        } catch (error) {
          console.error("Error seeding initial data to Firestore: ", error);
        }
        setLoading(false);
      }
    }, (error) => {
      console.error("Firestore listening error: ", error);
      // Fall back to initial static data in case of permissions or connection failures
      setData(initialData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Save/Update portfolio data in Firestore
  const updateData = async (newData: PortfolioData) => {
    try {
      const docRef = doc(db, 'portfolio', 'data');
      await setDoc(docRef, newData);
    } catch (error) {
      console.error("Error updating portfolio data: ", error);
      throw error;
    }
  };

  // Compress image on the client-side and return its Base64 representation (no Storage required!)
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const base64Url = await compressImage(file);
      return base64Url;
    } catch (error) {
      console.error("Error converting/compressing image: ", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, user, updateData, uploadImage, logout }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
