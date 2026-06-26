import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { PortfolioData, ProjectItem, ExperienceItem } from '../context/PortfolioContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { 
  LogOut, Globe, Save, Upload, Plus, Trash2, ArrowUp, ArrowDown, 
  User, Award, Briefcase, Sparkles, Phone, Mail, MapPin, ExternalLink,
  Laptop, Send
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { data, loading, user, updateData, uploadImage, logout } = usePortfolio();
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Local Editable Copy of Data
  const [editedData, setEditedData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'experience' | 'services' | 'projects' | 'contact'>('hero');
  const [saveStatus, setSaveStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: 'idle' });
  const [uploadingImageIndex, setUploadingImageIndex] = useState<number | null>(null); // For project index
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Update local edit state when Firebase finishes loading data
  useEffect(() => {
    if (data && !editedData) {
      setEditedData(JSON.parse(JSON.stringify(data))); // deep copy
    }
  }, [data, editedData]);

  // Handle Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Invalid credentials');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Save to Firestore
  const handleSave = async () => {
    if (!editedData) return;
    setSaveStatus({ type: 'loading' });
    try {
      await updateData(editedData);
      setSaveStatus({ type: 'success', message: 'Portfolio updated successfully!' });
      setTimeout(() => setSaveStatus({ type: 'idle' }), 4000);
    } catch (err: any) {
      console.error(err);
      setSaveStatus({ type: 'error', message: err.message || 'Failed to update database' });
    }
  };

  // Handle project image upload
  const handleProjectImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedData || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImageIndex(index);
    try {
      const downloadUrl = await uploadImage(file);
      const updatedProjects = [...editedData.projects];
      updatedProjects[index].image = downloadUrl;
      setEditedData({ ...editedData, projects: updatedProjects });
    } catch (err) {
      alert("Image upload failed. Check your Firebase Storage rules.");
    } finally {
      setUploadingImageIndex(null);
    }
  };

  // Handle Hero Avatar image upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedData || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingAvatar(true);
    try {
      const downloadUrl = await uploadImage(file);
      setEditedData({
        ...editedData,
        hero: {
          ...editedData.hero,
          avatarUrl: downloadUrl
        }
      });
    } catch (err) {
      alert("Avatar upload failed. Check your Firebase Storage rules.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Project Lists Modifiers
  const addProject = () => {
    if (!editedData) return;
    const newProject: ProjectItem = {
      name: 'New Project',
      category: 'Development',
      description: 'Project details...',
      tech: ['React', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com'
    };
    setEditedData({
      ...editedData,
      projects: [newProject, ...editedData.projects]
    });
  };

  const deleteProject = (index: number) => {
    if (!editedData) return;
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    const filtered = editedData.projects.filter((_, idx) => idx !== index);
    setEditedData({ ...editedData, projects: filtered });
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    if (!editedData) return;
    const list = [...editedData.projects];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setEditedData({ ...editedData, projects: list });
  };

  // Experience Lists Modifiers
  const addExperience = () => {
    if (!editedData) return;
    const newExp: ExperienceItem = {
      role: 'Job Role',
      company: 'Company Name',
      period: 'Year - Year',
      description: 'Job description...',
      achievements: ['Achievement line 1']
    };
    setEditedData({
      ...editedData,
      experiences: [newExp, ...editedData.experiences]
    });
  };

  const deleteExperience = (index: number) => {
    if (!editedData) return;
    if (!window.confirm("Are you sure you want to delete this experience entry?")) return;
    const filtered = editedData.experiences.filter((_, idx) => idx !== index);
    setEditedData({ ...editedData, experiences: filtered });
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (!editedData) return;
    const list = [...editedData.experiences];
    if (direction === 'up' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'down' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    }
    setEditedData({ ...editedData, experiences: list });
  };

  // Loading indicator for Firebase DB fetch
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

  // Auth Screen Guard
  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] -z-10" />

        <div className="max-w-md w-full glass-panel p-8 sm:p-10 rounded-3xl text-center space-y-8 relative z-10 border border-dark-border/20">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-[10px] font-bold text-primary tracking-widest uppercase">
              Secure Core
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight">Admin Dashboard</h2>
            <p className="text-xs text-gray-500 mt-2 font-semibold">Sign in using your Firebase Authentication details</p>
          </div>

          {authError && (
            <div className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-left">
              {authError}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@yourdomain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-110 shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-102 active:scale-98 disabled:opacity-75 cursor-pointer"
            >
              {authLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>

          <div className="pt-2">
            <a href="#" className="text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors">
              ← Return to public website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Safe Guard context initialization
  if (!editedData) return null;

  return (
    <div className="min-h-screen bg-dark-bg text-slate-200 antialiased font-sans flex flex-col">
      {/* Dynamic glow nodes */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Header Panel */}
      <header className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur-md border-b border-dark-border py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-tight leading-none">Console Manager</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Portfolio Core</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Back to site */}
          <a
            href="#"
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-slate-900 border border-dark-border/40 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Site</span>
          </a>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saveStatus.type === 'loading'}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-xs font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-70"
          >
            {saveStatus.type === 'loading' ? (
              <div className="w-3.5 h-3.5 rounded-full border border-white border-t-transparent animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Database</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-2 rounded-lg bg-slate-900 border border-dark-border/40 text-gray-400 hover:text-rose-400 hover:border-rose-500/20 transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Core Container */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl w-full mx-auto p-6 sm:p-8 gap-8">
        
        {/* Sidebar Nav */}
        <aside className="md:w-64 shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 p-1 bg-slate-950/40 border border-dark-border/20 rounded-2xl md:h-fit">
          {[
            { id: 'hero', label: 'Hero Section', icon: <User className="w-4 h-4" /> },
            { id: 'about', label: 'About Details', icon: <Award className="w-4 h-4" /> },
            { id: 'experience', label: 'Experience Timeline', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'services', label: 'Services List', icon: <Laptop className="w-4 h-4" /> },
            { id: 'projects', label: 'Projects Showcase', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'contact', label: 'Contact Details', icon: <Phone className="w-4 h-4" /> }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-xs font-bold text-left transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-primary/20 text-white border border-primary/20 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Form Editor Window */}
        <main className="flex-grow glass-panel p-6 sm:p-8 rounded-3xl border border-dark-border/15 relative">
          
          {/* Status Message Overlay toast */}
          {saveStatus.type !== 'idle' && saveStatus.type !== 'loading' && (
            <div className={`absolute top-4 right-4 px-4 py-3 rounded-xl border text-xs font-bold shadow-lg z-30 flex items-center gap-2 animate-bounce ${
              saveStatus.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              <span>{saveStatus.message}</span>
            </div>
          )}

          {/* TAB: HERO */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-dark-border/10">
                <h2 className="text-xl font-extrabold text-white">Hero Configuration</h2>
                <p className="text-xs text-gray-500 mt-1">Configure greeting strings, avatar image uploads, and key social channels.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Greeting Prefix</label>
                  <input
                    type="text"
                    value={editedData.hero.greeting}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      hero: { ...editedData.hero, greeting: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Display Name</label>
                  <input
                    type="text"
                    value={editedData.hero.name}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      hero: { ...editedData.hero, name: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Job Title</label>
                  <input
                    type="text"
                    value={editedData.hero.title}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      hero: { ...editedData.hero, title: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Availability Status</label>
                  <input
                    type="text"
                    value={editedData.hero.availabilityText}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      hero: { ...editedData.hero, availabilityText: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Short Bio/Description</label>
                <textarea
                  rows={3}
                  value={editedData.hero.description}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    hero: { ...editedData.hero, description: e.target.value }
                  })}
                  className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white resize-none transition-all"
                />
              </div>

              {/* Avatar upload */}
              <div className="p-5 bg-slate-950/40 border border-dark-border/20 rounded-2xl flex flex-col sm:flex-row items-center gap-5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-dark-border/40 shrink-0 flex items-center justify-center">
                  {editedData.hero.avatarUrl ? (
                    <img src={editedData.hero.avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-8 h-8 text-gray-600" />
                  )}
                </div>
                
                <div className="space-y-2 text-left flex-grow">
                  <h4 className="text-xs font-bold text-white uppercase">Profile Photo / Avatar</h4>
                  <p className="text-[10px] text-gray-500 font-semibold">Select a PNG or JPEG file to upload to Firebase Storage.</p>
                  
                  <label className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-slate-900 border border-dark-border/40 hover:border-primary/30 text-xs font-bold text-white cursor-pointer transition-all hover:scale-102">
                    <Upload className="w-3.5 h-3.5 text-primary" />
                    <span>{uploadingAvatar ? "Uploading file..." : "Choose New Photo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Social Links</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.keys(editedData.hero.socialLinks).map((key) => {
                    const typedKey = key as keyof typeof editedData.hero.socialLinks;
                    return (
                      <div key={key} className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest capitalize">{key}</label>
                        <input
                          type="text"
                          value={editedData.hero.socialLinks[typedKey]}
                          onChange={(e) => {
                            const updatedLinks = { ...editedData.hero.socialLinks, [typedKey]: e.target.value };
                            setEditedData({
                              ...editedData,
                              hero: { ...editedData.hero, socialLinks: updatedLinks }
                            });
                          }}
                          className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2 text-xs text-white transition-all"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-dark-border/10">
                <h2 className="text-xl font-extrabold text-white">About Details Configuration</h2>
                <p className="text-xs text-gray-500 mt-1">Configure section text and custom metrics stats.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Section Title Badge</label>
                  <input
                    type="text"
                    value={editedData.about.title}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      about: { ...editedData.about, title: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Main Heading</label>
                  <input
                    type="text"
                    value={editedData.about.heading}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      about: { ...editedData.about, heading: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subtitle Description</label>
                <input
                  type="text"
                  value={editedData.about.description}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    about: { ...editedData.about, description: e.target.value }
                  })}
                  className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">"Who I Am" Content</h4>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Card Inner Title</label>
                  <input
                    type="text"
                    value={editedData.about.whoIAmTitle}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      about: { ...editedData.about, whoIAmTitle: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2 text-xs text-white transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Biography Paragraphs</label>
                  {editedData.about.whoIAmParagraphs.map((para, idx) => (
                    <div key={idx} className="flex gap-2">
                      <textarea
                        rows={2}
                        value={para}
                        onChange={(e) => {
                          const updatedParas = [...editedData.about.whoIAmParagraphs];
                          updatedParas[idx] = e.target.value;
                          setEditedData({
                            ...editedData,
                            about: { ...editedData.about, whoIAmParagraphs: updatedParas }
                          });
                        }}
                        className="flex-grow bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2 text-xs text-white resize-none transition-all"
                      />
                      <button
                        onClick={() => {
                          const filtered = editedData.about.whoIAmParagraphs.filter((_, pIdx) => pIdx !== idx);
                          setEditedData({
                            ...editedData,
                            about: { ...editedData.about, whoIAmParagraphs: filtered }
                          });
                        }}
                        className="p-2 bg-slate-900 border border-dark-border/40 hover:border-rose-500/20 text-gray-500 hover:text-rose-400 rounded-xl flex items-center justify-center shrink-0 h-fit"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setEditedData({
                      ...editedData,
                      about: {
                        ...editedData.about,
                        whoIAmParagraphs: [...editedData.about.whoIAmParagraphs, "New biography paragraph details..."]
                      }
                    })}
                    className="flex items-center space-x-1.5 text-xs text-primary hover:text-secondary font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Biography Paragraph</span>
                  </button>
                </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Core Skill Tags</label>
                <div className="flex flex-wrap gap-2">
                  {editedData.about.tags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-dark-border/40 text-xs text-gray-300">
                      <span>{tag}</span>
                      <button
                        onClick={() => {
                          const filtered = editedData.about.tags.filter((_, tagIdx) => tagIdx !== idx);
                          setEditedData({
                            ...editedData,
                            about: { ...editedData.about, tags: filtered }
                          });
                        }}
                        className="text-gray-500 hover:text-rose-400 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-xs mt-2">
                  <input
                    type="text"
                    id="new-tag-input"
                    placeholder="Add tag..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) {
                          setEditedData({
                            ...editedData,
                            about: { ...editedData.about, tags: [...editedData.about.tags, val] }
                          });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                    className="flex-grow bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('new-tag-input') as HTMLInputElement;
                      const val = input.value.trim();
                      if (val) {
                        setEditedData({
                          ...editedData,
                          about: { ...editedData.about, tags: [...editedData.about.tags, val] }
                        });
                        input.value = '';
                      }
                    }}
                    className="px-3.5 py-1.5 bg-slate-900 border border-dark-border/40 hover:border-primary/30 text-xs font-bold text-white rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Metrics Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  {editedData.about.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 bg-slate-950/40 border border-dark-border/20 rounded-2xl space-y-2 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-primary uppercase">Stat #{idx + 1}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Value</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const updatedStats = [...editedData.about.stats];
                              updatedStats[idx].value = e.target.value;
                              setEditedData({
                                ...editedData,
                                about: { ...editedData.about, stats: updatedStats }
                              });
                            }}
                            className="w-full bg-slate-950/60 border border-dark-border/30 outline-none rounded-lg px-2 py-1 text-xs text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const updatedStats = [...editedData.about.stats];
                              updatedStats[idx].label = e.target.value;
                              setEditedData({
                                ...editedData,
                                about: { ...editedData.about, stats: updatedStats }
                              });
                            }}
                            className="w-full bg-slate-950/60 border border-dark-border/30 outline-none rounded-lg px-2 py-1 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-dark-border/10 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Experience Timeline Manager</h2>
                  <p className="text-xs text-gray-500 mt-1">Manage jobs, freelance work history, and achievements lists.</p>
                </div>
                <button
                  onClick={addExperience}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-primary/20 text-xs font-bold text-primary hover:text-white hover:bg-primary/10 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-6">
                {editedData.experiences.map((exp, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/45 border border-dark-border/20 rounded-2xl relative space-y-4 text-left">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-bold text-primary tracking-widest uppercase">
                        Timeline Node #{idx + 1}
                      </span>
                      
                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => moveExperience(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 bg-slate-900 border border-dark-border/40 hover:border-primary/20 rounded-lg text-gray-500 hover:text-white disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          onClick={() => moveExperience(idx, 'down')}
                          disabled={idx === editedData.experiences.length - 1}
                          className="p-1.5 bg-slate-900 border border-dark-border/40 hover:border-primary/20 rounded-lg text-gray-500 hover:text-white disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteExperience(idx)}
                          className="p-1.5 bg-slate-900 border border-dark-border/45 hover:border-rose-500/20 rounded-lg text-gray-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Role Name</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const list = [...editedData.experiences];
                            list[idx].role = e.target.value;
                            setEditedData({ ...editedData, experiences: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Company / Client</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const list = [...editedData.experiences];
                            list[idx].company = e.target.value;
                            setEditedData({ ...editedData, experiences: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Employment Duration / Period</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const list = [...editedData.experiences];
                            list[idx].period = e.target.value;
                            setEditedData({ ...editedData, experiences: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Core Description</label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => {
                          const list = [...editedData.experiences];
                          list[idx].description = e.target.value;
                          setEditedData({ ...editedData, experiences: list });
                        }}
                        className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white resize-none"
                      />
                    </div>

                    {/* Achievements List inside Experience */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">Achievements & Bullet Points</label>
                      {exp.achievements.map((ach, achIdx) => (
                        <div key={achIdx} className="flex gap-2">
                          <input
                            type="text"
                            value={ach}
                            onChange={(e) => {
                              const list = [...editedData.experiences];
                              list[idx].achievements[achIdx] = e.target.value;
                              setEditedData({ ...editedData, experiences: list });
                            }}
                            className="flex-grow bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-1.5 text-xs text-white"
                          />
                          <button
                            onClick={() => {
                              const list = [...editedData.experiences];
                              list[idx].achievements = list[idx].achievements.filter((_, aIdx) => aIdx !== achIdx);
                              setEditedData({ ...editedData, experiences: list });
                            }}
                            className="p-2 bg-slate-900 border border-dark-border/40 text-gray-500 hover:text-rose-400 rounded-xl"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const list = [...editedData.experiences];
                          list[idx].achievements = [...list[idx].achievements, "New achievement bullet..."];
                          setEditedData({ ...editedData, experiences: list });
                        }}
                        className="flex items-center space-x-1.5 text-[10px] text-primary hover:text-secondary font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Achievement</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-dark-border/10">
                <h2 className="text-xl font-extrabold text-white">Services List Manager</h2>
                <p className="text-xs text-gray-500 mt-1">Configure title card descriptions and border color classes.</p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {editedData.services.map((svc, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/45 border border-dark-border/20 rounded-2xl space-y-3 text-left">
                    <span className="text-[10px] font-bold text-primary uppercase">Service Card #{idx + 1}</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Service Title</label>
                        <input
                          type="text"
                          value={svc.title}
                          onChange={(e) => {
                            const list = [...editedData.services];
                            list[idx].title = e.target.value;
                            setEditedData({ ...editedData, services: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Hover Border Accent Color</label>
                        <select
                          value={svc.color}
                          onChange={(e) => {
                            const list = [...editedData.services];
                            list[idx].color = e.target.value;
                            setEditedData({ ...editedData, services: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="group-hover:border-purple-500/30">Purple Glow</option>
                          <option value="group-hover:border-blue-500/30">Blue Glow</option>
                          <option value="group-hover:border-emerald-500/30">Emerald Glow</option>
                          <option value="group-hover:border-rose-500/30">Rose Glow</option>
                          <option value="group-hover:border-amber-500/30">Amber Glow</option>
                          <option value="group-hover:border-cyan-500/30">Cyan Glow</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Service Description</label>
                      <textarea
                        rows={2}
                        value={svc.description}
                        onChange={(e) => {
                          const list = [...editedData.services];
                          list[idx].description = e.target.value;
                          setEditedData({ ...editedData, services: list });
                        }}
                        className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-dark-border/10 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Projects Showcase Catalog</h2>
                  <p className="text-xs text-gray-500 mt-1">Manage project details, deployment URLs, code links, and screenshot assets.</p>
                </div>
                
                <button
                  onClick={addProject}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-primary/20 text-xs font-bold text-primary hover:text-white hover:bg-primary/10 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-8">
                {editedData.projects.map((proj, idx) => (
                  <div key={idx} className="p-6 bg-slate-950/45 border border-dark-border/20 rounded-2xl relative space-y-5 text-left">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-bold text-primary tracking-widest uppercase">
                        Project Node #{idx + 1}
                      </span>
                      
                      <div className="flex space-x-1.5">
                        <button
                          onClick={() => moveProject(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 bg-slate-900 border border-dark-border/40 hover:border-primary/20 rounded-lg text-gray-500 hover:text-white disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                          onClick={() => moveProject(idx, 'down')}
                          disabled={idx === editedData.projects.length - 1}
                          className="p-1.5 bg-slate-900 border border-dark-border/40 hover:border-primary/20 rounded-lg text-gray-500 hover:text-white disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteProject(idx)}
                          className="p-1.5 bg-slate-900 border border-dark-border/45 hover:border-rose-500/20 rounded-lg text-gray-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => {
                            const list = [...editedData.projects];
                            list[idx].name = e.target.value;
                            setEditedData({ ...editedData, projects: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Category Name</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            const list = [...editedData.projects];
                            list[idx].category = e.target.value;
                            setEditedData({ ...editedData, projects: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => {
                          const list = [...editedData.projects];
                          list[idx].description = e.target.value;
                          setEditedData({ ...editedData, projects: list });
                        }}
                        className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white resize-none"
                      />
                    </div>

                    {/* Links and Fit */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                          <ExternalLink className="w-3 h-3 text-secondary" />
                          <span>Live Preview URL</span>
                        </label>
                        <input
                          type="text"
                          value={proj.demoUrl}
                          onChange={(e) => {
                            const list = [...editedData.projects];
                            list[idx].demoUrl = e.target.value;
                            setEditedData({ ...editedData, projects: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">GitHub Repository URL</label>
                        <input
                          type="text"
                          value={proj.githubUrl}
                          onChange={(e) => {
                            const list = [...editedData.projects];
                            list[idx].githubUrl = e.target.value;
                            setEditedData({ ...editedData, projects: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Image Sizing Mode</label>
                        <select
                          value={proj.imageFit || 'object-cover'}
                          onChange={(e) => {
                            const list = [...editedData.projects];
                            list[idx].imageFit = e.target.value;
                            setEditedData({ ...editedData, projects: list });
                          }}
                          className="w-full bg-slate-950 border border-dark-border/30 outline-none rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="object-cover">Cover (Fill Aspect Ratio)</option>
                          <option value="object-cover object-top">Cover (Align Top)</option>
                          <option value="object-contain p-4">Contain (Show Whole Image)</option>
                        </select>
                      </div>
                    </div>

                    {/* Tech Stack list inside project */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Technologies Stack Tags</label>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((tag, tagIdx) => (
                          <span key={tagIdx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[10px] text-purple-200">
                            <span>{tag}</span>
                            <button
                              onClick={() => {
                                const list = [...editedData.projects];
                                list[idx].tech = list[idx].tech.filter((_, tIdx) => tIdx !== tagIdx);
                                setEditedData({ ...editedData, projects: list });
                              }}
                              className="text-primary hover:text-white font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 max-w-xs">
                        <input
                          type="text"
                          id={`new-tech-${idx}`}
                          placeholder="Add technology..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val) {
                                const list = [...editedData.projects];
                                list[idx].tech = [...list[idx].tech, val];
                                setEditedData({ ...editedData, projects: list });
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                          className="flex-grow bg-slate-950 border border-dark-border/30 outline-none rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById(`new-tech-${idx}`) as HTMLInputElement;
                            const val = input.value.trim();
                            if (val) {
                              const list = [...editedData.projects];
                              list[idx].tech = [...list[idx].tech, val];
                              setEditedData({ ...editedData, projects: list });
                              input.value = '';
                            }
                          }}
                          className="px-2.5 py-1 bg-slate-900 border border-dark-border/40 text-xs font-bold text-white rounded-lg"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Screenshot File Upload */}
                    <div className="p-4 bg-slate-950/40 border border-dark-border/20 rounded-xl flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-28 aspect-video rounded bg-slate-900 border border-dark-border/40 shrink-0 overflow-hidden flex items-center justify-center">
                        {proj.image ? (
                          <img src={proj.image} alt="Project Screenshot Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[9px] text-gray-700">No Image</span>
                        )}
                      </div>
                      
                      <div className="text-left space-y-1.5 flex-grow">
                        <h5 className="text-[10px] font-bold text-white uppercase">Project Screenshot File</h5>
                        <p className="text-[9px] text-gray-500 font-semibold">Upload a mockup, graphic, or screenshot directly to Storage.</p>
                        
                        <label className="inline-flex items-center space-x-1 px-3 py-1.5 bg-slate-900 border border-dark-border/40 hover:border-primary/30 text-[10px] font-bold text-white rounded-lg cursor-pointer transition-all">
                          <Upload className="w-3 h-3 text-primary" />
                          <span>{uploadingImageIndex === idx ? "Uploading..." : "Upload Screenshot"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleProjectImageUpload(idx, e)}
                            disabled={uploadingImageIndex === idx}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-dark-border/10">
                <h2 className="text-xl font-extrabold text-white">Contact Details Configuration</h2>
                <p className="text-xs text-gray-500 mt-1">Configure messaging headers and physical channels.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Badge Title</label>
                  <input
                    type="text"
                    value={editedData.contact.title}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      contact: { ...editedData.contact, title: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Heading Title</label>
                  <input
                    type="text"
                    value={editedData.contact.heading}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      contact: { ...editedData.contact, heading: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Intro Text</label>
                <input
                  type="text"
                  value={editedData.contact.introText}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    contact: { ...editedData.contact, introText: e.target.value }
                  })}
                  className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description Subtext</label>
                <textarea
                  rows={2}
                  value={editedData.contact.description}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    contact: { ...editedData.contact, description: e.target.value }
                  })}
                  className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white resize-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={editedData.contact.email}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      contact: { ...editedData.contact, email: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="text"
                    value={editedData.contact.phone}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      contact: { ...editedData.contact, phone: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Location City</span>
                  </label>
                  <input
                    type="text"
                    value={editedData.contact.location}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      contact: { ...editedData.contact, location: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-primary" />
                    <span>WhatsApp Number (For Form redirects, with country code, e.g. 919398972962)</span>
                  </label>
                  <input
                    type="text"
                    value={editedData.contact.whatsappNumber}
                    onChange={(e) => setEditedData({
                      ...editedData,
                      contact: { ...editedData.contact, whatsappNumber: e.target.value }
                    })}
                    className="w-full bg-slate-950/60 border border-dark-border/30 hover:border-primary/20 focus:border-primary/60 outline-none rounded-xl px-4 py-2.5 text-sm text-white transition-all"
                  />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
