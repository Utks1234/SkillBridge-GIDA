import React from 'react';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Languages,
  Sparkles,
  LogOut,
  UserCheck,
  Cpu,
  Database,
  Lock,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth, UserRole } from '../../context/AuthContext';

export const Header: React.FC<{
  onToggle3D: () => void;
  show3D: boolean;
  onOpenDatabase: () => void;
}> = ({ onToggle3D, show3D, onOpenDatabase }) => {
  const { language, toggleLanguage } = useApp();
  const { currentUser, setAuthModalOpen, logout, loginAs } = useAuth();

  const getRoleBadge = (role?: UserRole) => {
    switch (role) {
      case 'student':
        return { label: 'Youth / Student Portal', labelHi: 'युवा / छात्र पोर्टल', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: <GraduationCap className="w-3.5 h-3.5" /> };
      case 'employer':
        return { label: 'GIDA Industry Portal', labelHi: 'गिडा उद्योग पोर्टल', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40', icon: <Building2 className="w-3.5 h-3.5" /> };
      case 'nodal_officer':
        return { label: 'GIDA Authority Command', labelHi: 'गिडा कमांड सेंटर', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: <ShieldCheck className="w-3.5 h-3.5" /> };
      default:
        return { label: 'Guest Access', labelHi: 'अतिथि', color: 'bg-slate-700 text-slate-300 border-slate-600', icon: <Lock className="w-3.5 h-3.5" /> };
    }
  };

  const badge = getRoleBadge(currentUser?.role);

  return (
    <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-navy-700/80 shadow-xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src="/logo.svg"
                  alt="SkillBridge GIDA Logo"
                  className="w-10 h-10 rounded-xl shadow-md border border-emerald-500/40"
                />
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                    SkillBridge <span className="text-emerald-400">GIDA</span>
                  </h1>
                  <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    कौशल सेतु गिडा
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>GIDA DIVAS 2026 · Theme 11</span>
                  <span className="text-slate-500 hidden lg:inline">· Gorakhpur Industrial Corridor</span>
                </p>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-navy-800 text-slate-200 border border-slate-700"
              >
                {language === 'en' ? 'हिन्दी' : 'EN'}
              </button>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-600 text-white"
              >
                Clerk
              </button>
            </div>
          </div>

          {/* Center/Right Controls: 3D Twin Toggle, Database Engine & Clerk User Badge */}
          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 flex-wrap">
            
            {/* 3D Digital Twin Button */}
            <button
              onClick={onToggle3D}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                show3D
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-navy-800 hover:bg-navy-700 text-slate-300 border border-navy-700'
              }`}
              title="Explore 3D Digital Twin of GIDA Corridor"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>{show3D ? 'Hide 3D' : '3D Digital Twin'}</span>
            </button>

            {/* Database Engine Button */}
            <button
              onClick={onOpenDatabase}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs font-bold border border-navy-700 transition"
              title="Explore 15 Relational Tables & PostgreSQL Schema"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Database (15 Tables)</span>
              <span className="sm:hidden">DB</span>
            </button>

            {/* Clerk Authentication / Active Persona Badge */}
            {currentUser ? (
              <div className="flex items-center gap-2 p-1 pl-2.5 pr-1.5 rounded-xl bg-navy-950 border border-navy-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-white text-[11px]">
                    {currentUser.name[0]}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-bold text-white block truncate max-w-[140px] leading-tight">
                      {currentUser.name}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded border ${badge.color}`}>
                      {badge.icon}
                      {language === 'hi' ? badge.labelHi : badge.label}
                    </span>
                  </div>
                </div>

                {/* Quick Persona Switcher Menu */}
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 border border-navy-700 text-xs flex items-center gap-1"
                  title="Switch Persona with Clerk RBAC"
                >
                  <span className="text-[10px] font-bold text-purple-400 hidden lg:inline">Switch</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg bg-navy-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-navy-800"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-950/50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Clerk Sign In</span>
              </button>
            )}

            {/* Desktop Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700"
              title={language === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
