import React, { useState } from 'react';
import { Layers, Cpu, ShieldCheck } from 'lucide-react';

interface TechItem {
  name: string;
  proficiency: number; // 0-100
  color: string; // Tailwind glow class (e.g., 'from-cyan-500 to-blue-500')
  icon: React.ReactNode;
}

interface IntegrationItem {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

export const TechStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'database' | 'tools'>('all');

  const frontendTech: TechItem[] = [
    {
      name: 'React',
      proficiency: 95,
      color: 'from-cyan-400 to-blue-500',
      icon: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 fill-none stroke-cyan-400 stroke-[1]">
          <circle cx="0" cy="0" r="2.05" className="fill-cyan-400" />
          <g>
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      name: 'Next.js',
      proficiency: 90,
      color: 'from-gray-300 to-gray-600',
      icon: (
        <svg viewBox="0 0 180 180" className="w-8 h-8 fill-white">
          <path d="M116.5 106.7l-45.7-65.7H60.3v78.2h9.5V56.2l45.4 65.4h10.8V34.5h-9.5v72.2z" />
          <circle cx="90" cy="90" r="85" className="stroke-white stroke-[6] fill-none" />
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      proficiency: 88,
      color: 'from-blue-500 to-indigo-600',
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 fill-blue-500">
          <rect width="100" height="100" rx="12" />
          <text x="50" y="75" className="fill-white font-bold text-[55px] font-sans" textAnchor="middle">TS</text>
        </svg>
      ),
    },
    {
      name: 'JavaScript',
      proficiency: 95,
      color: 'from-yellow-400 to-amber-500',
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 fill-yellow-400">
          <rect width="100" height="100" rx="12" />
          <text x="50" y="75" className="fill-black font-extrabold text-[55px] font-sans" textAnchor="middle">JS</text>
        </svg>
      ),
    },
    {
      name: 'HTML5',
      proficiency: 98,
      color: 'from-orange-500 to-red-600',
      icon: (
        <svg viewBox="0 0 512 512" className="w-8 h-8 fill-orange-500">
          <path d="M64 32l35.2 402.6L256 480l156.8-45.4L448 32H64zm290 142.7H179.9l4.8 54h165.2l-15.1 169-78.8 21.8-78.8-21.8-5.2-58.8h53.5l2.6 29.8 27.9 7.6 27.9-7.6 5.3-59.5H138.5l-14.8-166.2h235l-4.7 51.5z" />
        </svg>
      ),
    },
    {
      name: 'CSS3',
      proficiency: 95,
      color: 'from-blue-400 to-indigo-500',
      icon: (
        <svg viewBox="0 0 512 512" className="w-8 h-8 fill-blue-500">
          <path d="M64 32l35.2 402.6L256 480l156.8-45.4L448 32H64zm293.7 101l-7.3 82.3h-165l-4.8-54.3h221.8l-4.7-28H126.8l14.4 162.7h163.7l-15.1 169-65.8 18.2-65.8-18.2-4.3-49.2h-53.5l8.6 98.2 115 31.8 115-31.8 15.1-169.5 7.3-82.3h1.8z" />
        </svg>
      ),
    },
    {
      name: 'Tailwind CSS',
      proficiency: 95,
      color: 'from-teal-400 to-cyan-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-cyan-400">
          <path d="M12 6.036c-2.28-2.28-5.88-2.28-8.16 0-2.28 2.28-2.28 5.88 0 8.16 2.28 2.28 5.88 2.28 8.16 0zm0 0c2.28-2.28 5.88-2.28 8.16 0 2.28 2.28 2.28 5.88 0 8.16-2.28 2.28-5.88 2.28-8.16 0z" className="opacity-70" />
          <path d="M12 11.964c-2.28-2.28-5.88-2.28-8.16 0-2.28 2.28-2.28 5.88 0 8.16 2.28 2.28 5.88 2.28 8.16 0zm0 0c2.28-2.28 5.88-2.28 8.16 0 2.28 2.28 2.28 5.88 0 8.16-2.28 2.28-5.88 2.28-8.16 0z" />
        </svg>
      ),
    },
  ];

  const backendTech: TechItem[] = [
    {
      name: 'Node.js',
      proficiency: 85,
      color: 'from-green-500 to-emerald-600',
      icon: (
        <svg viewBox="0 0 256 256" className="w-8 h-8 fill-green-500">
          <path d="M128 32l96 48v80l-96 64-96-64V80zm0 15.6L48 84v64l80 53.3 80-53.3V84z" className="opacity-50" />
          <path d="M128 56l72 36v52l-72 48-72-48V92z" />
        </svg>
      ),
    },
    {
      name: 'Express.js',
      proficiency: 88,
      color: 'from-slate-300 to-slate-500',
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-white stroke-[4] fill-none">
          <rect width="90" height="90" x="5" y="5" rx="10" className="stroke-slate-500 stroke-[2]" />
          <path d="M25 35h30M25 50h45M25 65h35" strokeLinecap="round" />
          <circle cx="70" cy="35" r="5" className="fill-purple-400 stroke-none" />
        </svg>
      ),
    },
    {
      name: 'Firebase',
      proficiency: 90,
      color: 'from-orange-400 to-yellow-500',
      icon: (
        <svg viewBox="0 0 256 256" className="w-8 h-8 fill-orange-500">
          <path d="M35.6 186.2l91-163.5c1.5-2.7 5.3-2.7 6.8 0L150 51.5zm183.7-18.7L132.8 54.3 103.5 107zm-186.5.1l7.3-46.7c.5-3.3 4.2-5.1 7.1-3.3l57 33.1z" />
          <path d="M128.5 224c-2.4 0-4.7-.6-6.8-1.8L35.6 172c-4-2.3-5.2-7.5-2.6-11.2l95.5-115.5c2-2.4 5.5-2.4 7.5 0l95.5 115.5c2.6 3.7 1.4 8.9-2.6 11.2l-86.1 50.2c-2.1 1.2-4.4 1.8-6.8 1.8z" className="opacity-80" />
        </svg>
      ),
    },
    {
      name: 'Supabase',
      proficiency: 82,
      color: 'from-emerald-400 to-teal-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-emerald-400">
          <path d="M21.36 11.004h-7.39l4.87-8.52c.31-.55-.26-1.17-.79-.86l-11.8 6.88c-.53.31-.41 1.12.21 1.26h7.39l-4.87 8.52c-.31.55.26 1.17.79.86l11.8-6.88c.53-.31.41-1.12-.21-1.26z" />
        </svg>
      ),
    },
  ];

  const databaseTech: TechItem[] = [
    {
      name: 'MongoDB',
      proficiency: 85,
      color: 'from-green-500 to-emerald-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-emerald-500">
          <path d="M12 2C8.36 5.86 6 10.33 6 14c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.67-2.36-8.14-6-12zm-1 15.93c-2.28-.46-4-2.48-4-4.93 0-2.35 1.54-5.32 4-8.08v13.01zm2 0V4.92c2.46 2.76 4 5.73 4 8.08 0 2.45-1.72 4.47-4 4.93z" />
          <path d="M12 22c.55 0 1-.45 1-1v-1h-2v1c0 .55.45 1 1 1z" />
        </svg>
      ),
    },
    {
      name: 'PostgreSQL',
      proficiency: 84,
      color: 'from-blue-600 to-indigo-700',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-blue-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h3l-4 4-4-4h3z" className="opacity-40" />
          <path d="M19.3 9.3c-.4-.7-1.1-1.2-2-1.4.3-.6.4-1.3.2-2-.3-.8-.9-1.4-1.7-1.7-.8-.3-1.7-.2-2.4.3-.7-.4-1.5-.5-2.3-.3-.9.2-1.7.8-2.1 1.7-.3-.1-.6-.1-.9-.1-.9 0-1.7.5-2.2 1.3-.5.7-.5 1.7-.1 2.5-.5.4-.8 1-.9 1.7 0 .8.4 1.6 1.1 2.1-.3.8-.2 1.7.3 2.4.5.7 1.3 1.1 2.2 1.1.2 0 .4 0 .6-.1.4.8 1.2 1.4 2.1 1.6.8.2 1.6 0 2.3-.5.7.5 1.6.7 2.5.5.9-.2 1.6-.9 1.9-1.8.8.2 1.7 0 2.3-.6.6-.6.8-1.5.6-2.3.8-.4 1.3-1.2 1.4-2.1.2-1-.2-1.9-.9-2.5zm-5.8 8.1c-.8.8-1.9 1.2-3 1.2-1.1 0-2.2-.4-3-1.2s-1.2-1.9-1.2-3c0-1.1.4-2.2 1.2-3s1.9-1.2 3-1.2c1.1 0 2.2.4 3 1.2s1.2 1.9 1.2 3c0 1.1-.4 2.2-1.2 3z" />
        </svg>
      ),
    },
    {
      name: 'MySQL',
      proficiency: 86,
      color: 'from-sky-500 to-indigo-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-sky-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-11.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm6 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
        </svg>
      ),
    },
  ];

  const toolsTech: TechItem[] = [
    {
      name: 'Git',
      proficiency: 90,
      color: 'from-orange-500 to-red-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-orange-500">
          <path d="M20.6 10.3L13.7 3.4c-.8-.8-2-.8-2.8 0L9.3 5.1l2.9 2.9c.7-.2 1.5 0 2 .6.6.6.8 1.4.6 2.1l2.9 2.9c.7-.2 1.5 0 2 .6.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.8-1.4-.6-2.1L13.3 12c-.2.7-1 1.3-1.8 1.3-.9 0-1.6-.6-1.8-1.4L6.9 9.1c-.7.2-1.5 0-2-.6-.8-.8-.8-2.1 0-2.9.8-.8 2.1-.8 2.9 0 .6.6.8 1.4.6 2.1l2.8 2.8c.2-.7 1-1.3 1.8-1.3.1 0 .2 0 .4.1V7.1L10.9 6c-.8-.8-.8-2 0-2.8L12 2.1c.8-.8 2-.8 2.8 0l6.9 6.9c.7.7.7 1.9-.1 2.7l-1 1.6z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      proficiency: 92,
      color: 'from-slate-300 to-slate-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      name: 'VS Code',
      proficiency: 95,
      color: 'from-blue-400 to-sky-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-blue-500">
          <path d="M23.985 6.809l-2.434-1.857a.798.798 0 00-.918-.042l-9.176 5.485-3.322-2.535a.8.8 0 00-.918.042L1.036 12.18a.8.8 0 000 1.218l6.18 4.778a.8.8 0 00.918.042l3.322-2.535 9.176 5.485a.798.798 0 00.918-.042l2.434-1.857a.8.8 0 00.323-.623V7.432a.8.8 0 00-.323-.623zM8.136 16.273l-4.47-3.456 4.47-3.456v6.912zm3.322-2.535l-2.025-1.571 2.025-1.571v3.142zm1.611 1.25L10.6 13.076l6.81-4.072 2.607 2.021-6.948 3.962zm0-5.976l6.948 3.962-2.607 2.021-6.81-4.072 2.469-1.911z" />
        </svg>
      ),
    },
    {
      name: 'Figma',
      proficiency: 80,
      color: 'from-purple-500 to-pink-500',
      icon: (
        <svg viewBox="0 0 100 150" className="w-8 h-8">
          <path d="M25 50A25 25 0 0150 25h25v50H50A25 25 0 0125 50z" className="fill-red-500" />
          <path d="M75 50v25H50V50z" className="fill-purple-500" />
          <path d="M25 100a25 25 0 0125-25h25v25a25 25 0 01-50 0z" className="fill-blue-400" />
          <path d="M25 150a25 25 0 0125-25V150z" className="fill-green-400" />
          <circle cx="75" cy="125" r="25" className="fill-yellow-400" />
        </svg>
      ),
    },
    {
      name: 'Vercel',
      proficiency: 95,
      color: 'from-gray-100 to-gray-400',
      icon: (
        <svg viewBox="0 0 115 100" className="w-8 h-8 fill-white">
          <path d="M57.5 0L115 100H0L57.5 0Z" />
        </svg>
      ),
    },
    {
      name: 'Netlify',
      proficiency: 90,
      color: 'from-teal-300 to-cyan-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-teal-400">
          <path d="M18.8 2.2l4.8 5c.4.4.4 1 0 1.4l-4.8 5c-.4.4-1 .4-1.4 0l-4.8-5c-.4-.4-.4-1 0-1.4l4.8-5c.4-.4 1-.4 1.4 0z" className="opacity-60" />
          <path d="M5.2 11.8l4.8 5c.4.4.4 1 0 1.4l-4.8 5c-.4.4-1 .4-1.4 0l-4.8-5c-.4-.4-.4-1 0-1.4l4.8-5c.4-.4 1-.4 1.4 0z" />
        </svg>
      ),
    },
  ];

  const getFilteredTech = () => {
    switch (activeTab) {
      case 'frontend':
        return frontendTech;
      case 'backend':
        return backendTech;
      case 'database':
        return databaseTech;
      case 'tools':
        return toolsTech;
      default:
        return [...frontendTech, ...backendTech, ...databaseTech, ...toolsTech];
    }
  };

  const getMarqueeItems = <T,>(items: T[], minItems = 12): T[] => {
    let list = [...items];
    if (list.length === 0) return [];
    while (list.length < minItems) {
      list = [...list, ...items];
    }
    return list;
  };

  const integrations: IntegrationItem[] = [
    {
      title: 'Google Maps API',
      description: 'Advanced geolocation, interactive markers, routing, and autocomplete services.',
      color: 'from-emerald-500 to-green-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-emerald-400">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" className="opacity-40" />
        </svg>
      ),
    },
    {
      title: 'Razorpay',
      description: 'Instant domestic & international multi-method payment checkout, subscriptions, and payouts.',
      color: 'from-blue-500 to-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-blue-400">
          <path d="M2 19h20L12 3 2 19zm10-3.5L5.5 16 12 6.5l6.5 9.5H12z" />
          <path d="M12 9.5l4 6H8l4-6z" className="opacity-50" />
        </svg>
      ),
    },
    {
      title: 'PhonePe PG',
      description: 'Secure, UPI-first high-success checkout pipeline for seamless mobile transactions in India.',
      color: 'from-purple-500 to-indigo-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-purple-400">
          <rect width="20" height="20" x="2" y="2" rx="5" className="opacity-30" />
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 9V9h2v6h-2z" />
          <circle cx="12" cy="7" r="1" />
        </svg>
      ),
    },
    {
      title: 'WhatsApp Business',
      description: 'Automated notification alerts, client communication flows, and interactive chat bots.',
      color: 'from-emerald-400 to-green-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-green-400">
          <path d="M12.004 2c-5.51 0-9.99 4.49-9.99 10 0 1.91.54 3.7 1.48 5.23L2 22l5.02-1.32c1.47.8 3.14 1.26 4.93 1.26 5.51 0 10-4.49 10-10S17.514 2 12.004 2zm5.72 13.06c-.24.69-1.23 1.27-1.9 1.35-.55.07-1.28.1-3.69-.9-3.08-1.28-5.04-4.43-5.2-4.63-.15-.2-1.24-1.65-1.24-3.15 0-1.5.78-2.23 1.06-2.53.28-.3.61-.38.82-.38.21 0 .43.01.61.02.19.01.44-.07.69.54.26.63.89 2.16.97 2.33.08.17.14.37.02.6-.12.23-.18.37-.36.59-.18.22-.38.49-.54.66-.18.18-.36.38-.16.73.2.34.89 1.47 1.91 2.38 1.32 1.18 2.43 1.55 2.78 1.73.34.17.55.15.76-.08.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.17.33.12 2.09 1.03 2.45 1.21.36.18.6.27.69.42.09.15.09.87-.15 1.56z" />
        </svg>
      ),
    },
    {
      title: 'Email Integrations',
      description: 'SMTP, SendGrid, and Resend workflows for secure transactional emails, newsletters, and receipts.',
      color: 'from-blue-400 to-indigo-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-blue-400 stroke-[2]">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Cloudinary',
      description: 'Dynamic cloud media storage with real-time compression, optimization, and responsive cropping.',
      color: 'from-sky-400 to-blue-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-sky-400">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
          <path d="M12 9v6M9 12h6" className="opacity-60" />
        </svg>
      ),
    },
    {
      title: 'Firebase Auth',
      description: 'Secure authentication including OAuth (Google, GitHub), magic links, and MFA workflows.',
      color: 'from-orange-500 to-amber-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-orange-400">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 12c-2.7 0-5.08-1.53-6.24-3.78.04-.99 2.01-1.72 6.24-1.72 4.21 0 6.19.72 6.24 1.72C17.08 17.47 14.7 19 12 19z" />
        </svg>
      ),
    },
    {
      title: 'Google Analytics',
      description: 'Detailed user behavior mapping, funnel analysis, and traffic retention dashboards.',
      color: 'from-yellow-500 to-orange-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-yellow-400">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
          <path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" className="opacity-60" />
        </svg>
      ),
    },
    {
      title: 'Meta Pixel',
      description: 'Ad campaign conversion tracking, custom audience retargeting, and event triggers.',
      color: 'from-blue-600 to-purple-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-blue-500 stroke-[2]">
          <path d="M18.5 7.5A4.5 4.5 0 0014 12c0 2.48 2.02 4.5 4.5 4.5S23 14.48 23 12s-2.02-4.5-4.5-4.5zM5.5 7.5A4.5 4.5 0 001 12c0 2.48 2.02 4.5 4.5 4.5S10 14.48 10 12s-2.02-4.5-4.5-4.5z" />
          <path d="M10 12h4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'SEO Optimization',
      description: 'On-page structure setup, lightning fast Core Web Vitals, sitemaps, and rich snippet schemas.',
      color: 'from-green-400 to-teal-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-green-400">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" className="opacity-40" />
          <path d="M7 13.5l3.5-3.5 3.5 3.5 5-5" className="fill-none stroke-green-400 stroke-[2]" />
          <circle cx="19" cy="8.5" r="1.5" className="fill-green-400" />
        </svg>
      ),
    },
    {
      title: 'Social Integrations',
      description: 'Dynamic social feeds, shared OpenGraph cards, meta configurations, and messaging gateways.',
      color: 'from-pink-500 to-indigo-500',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-purple-400 stroke-[2]">
          <circle cx="18" cy="5" r="3" className="fill-purple-400/20" />
          <circle cx="6" cy="12" r="3" className="fill-purple-400/20" />
          <circle cx="18" cy="19" r="3" className="fill-purple-400/20" />
          <path d="M8.59 13.51l5.83 3.4M14.42 7.09l-5.83 3.4" />
        </svg>
      ),
    },
    {
      title: 'Custom Dashboard',
      description: 'Tailored administrative CMS platforms, rich tables, state trackers, and visualization panels.',
      color: 'from-cyan-400 to-blue-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-cyan-400 stroke-[2]">
          <rect width="20" height="15" x="2" y="3" rx="2" strokeLinejoin="round" />
          <path d="M2 12h20M9 21h6M12 17v4" strokeLinecap="round" />
          <circle cx="7" cy="7.5" r="1.5" className="fill-cyan-400" />
          <circle cx="17" cy="7.5" r="1.5" className="fill-blue-500" />
        </svg>
      ),
    },
  ];

  return (
    <section id="techstack" className="py-24 relative overflow-hidden md:px-12 px-6 border-t border-dark-border/10">
      
      {/* Dynamic Background Glow Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[30vw] h-[30vw] rounded-full bg-secondary/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full relative">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-3">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-purple-200 tracking-wider uppercase">Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Technologies & Tools <span className="text-gradient">I Work With</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
          <p className="text-base text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Building scalable, modern, and high-performance web applications using industry-standard technologies and tools.
          </p>
        </div>

        {/* Tab Controls for Technologies */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-12 reveal">
          {(['all', 'frontend', 'backend', 'database', 'tools'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                activeTab === tab
                  ? 'bg-primary/20 text-white border-primary/45 shadow-md shadow-primary/15'
                  : 'bg-slate-900/40 text-gray-400 border-dark-border/30 hover:text-white hover:border-primary/20 hover:bg-slate-900/60'
              }`}
            >
              {tab === 'all' ? 'All Tech' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Technologies Dynamic Marquee */}
        <div className="relative w-full overflow-hidden mb-20 py-4 reveal">
          {/* Fading gradients at the edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-4 w-max py-2">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex gap-4 px-2">
                {getMarqueeItems(getFilteredTech()).map((tech, idx) => (
                  <div
                    key={`${tech.name}-${groupIdx}-${idx}`}
                    className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-between text-center relative overflow-hidden group hover:-translate-y-2 hover:bg-slate-900/60 transition-all duration-300 w-[150px] shrink-0"
                  >
                    {/* Subtle tech specific color gradient glow on hover */}
                    <div className={`absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 blur-md rounded-full transition-opacity duration-300`} />
                    
                    {/* Tech Icon wrapper */}
                    <div className="p-3 bg-slate-950/60 rounded-xl border border-dark-border/20 mb-3.5 group-hover:scale-110 transition-transform duration-300 group-hover:border-primary/40 shadow-inner">
                      {tech.icon}
                    </div>

                    {/* Name */}
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                      {tech.name}
                    </span>

                    {/* Progress Indicator */}
                    <div className="w-full mt-3">
                      <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold mb-1 px-1">
                        <span>EXP</span>
                        <span className="text-purple-300/80">{tech.proficiency}%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                        <div
                          className={`h-full bg-gradient-to-r ${tech.color} rounded-full`}
                          style={{ width: `${tech.proficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Premium Horizontal Marquee Banner */}
        <div className="relative w-full overflow-hidden py-6 mb-24 glass-panel rounded-2xl border-x-0 sm:border-x">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-transparent to-dark-bg z-10 pointer-events-none" />
          
          <div className="animate-marquee flex items-center whitespace-nowrap gap-12 text-sm font-semibold tracking-wider text-purple-200/60 uppercase">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex items-center gap-12">
                <span>React</span>
                <span className="text-primary">•</span>
                <span>Next.js</span>
                <span className="text-secondary">•</span>
                <span>TypeScript</span>
                <span className="text-primary">•</span>
                <span>Node.js</span>
                <span className="text-secondary">•</span>
                <span>MongoDB</span>
                <span className="text-primary">•</span>
                <span>Firebase</span>
                <span className="text-secondary">•</span>
                <span>Tailwind CSS</span>
                <span className="text-primary">•</span>
                <span>GitHub</span>
                <span className="text-secondary">•</span>
                <span>Vercel</span>
                <span className="text-primary">•</span>
                <span>Razorpay</span>
                <span className="text-secondary">•</span>
                <span>Google APIs</span>
                <span className="text-primary">•</span>
                <span>WhatsApp Business</span>
                <span className="text-secondary">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subsection: Integrations & Services */}
        <div className="text-center max-w-xl mx-auto mb-16 reveal">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 backdrop-blur-md mb-3">
            <Layers className="w-3.5 h-3.5 text-secondary" />
            <span className="text-[10px] font-bold text-blue-200 tracking-wider uppercase">Service Connections</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Integrations & <span className="text-gradient">Services</span>
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-secondary to-purple-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Integrations Dynamic Marquee */}
        <div className="relative w-full overflow-hidden py-4 reveal">
          {/* Fading gradients at the edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-dark-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-dark-bg to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-6 w-max py-2">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={groupIdx} className="flex gap-6 px-3">
                {getMarqueeItems(integrations).map((item, idx) => (
                  <div
                    key={`${item.title}-${groupIdx}-${idx}`}
                    className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:-translate-y-2 hover:bg-slate-900/60 transition-all duration-300 relative overflow-hidden group border border-white/5 hover:border-secondary/35 hover:shadow-lg hover:shadow-secondary/5 w-[280px] sm:w-[320px] shrink-0"
                  >
                    <div>
                      {/* Side highlight gradient matching integration theme */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 blur-2xl rounded-full transition-opacity duration-300`} />
                      
                      {/* Header: Icon & Title */}
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-slate-950/60 rounded-xl border border-dark-border/20 text-secondary group-hover:text-white transition-all group-hover:scale-105 group-hover:border-secondary/40 shadow-inner">
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-base text-white group-hover:text-secondary transition-colors duration-300">
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mt-4">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Footer status pill */}
                    <div className="flex justify-end pt-2">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        <ShieldCheck className="w-2.5 h-2.5" /> Production Ready
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
