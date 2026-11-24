import React from 'react';
import {
  Award,
  Sparkles,
  Zap,
  Building,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  ChevronRight,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CMPresentationBanner: React.FC<{ onOpenDatabase: () => void }> = ({ onOpenDatabase }) => {
  const { language } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-950 via-emerald-950/40 to-navy-950 border-2 border-emerald-500/50 p-4 sm:p-6 shadow-2xl shadow-emerald-950/50">
      
      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left Side: Dignitary Presentation Credentials */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              GIDA DIVAS HACKATHON 2026 · THEME 11
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              UP Govt CMAPS & UPSDM Aligned
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            SkillBridge <span className="text-emerald-400">GIDA</span>
            <span className="block text-base sm:text-lg font-semibold text-emerald-300 font-serif mt-0.5">
              कौशल सेतु गिडा · पूर्वांचल रोजगार एवं औद्योगिक नवाचार
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'गिडा गोरखपुर (सेक्टर 13, 27, 15 एवं सहजनवां) में स्थानीय तकनीकी युवाओं को स्थानीय विनिर्माण इकाइयों से जोड़ने का अत्याधुनिक 3D डिजिटल ट्विन, कौशल अंतर खोज एवं रोजगार मंच।'
              : 'An advanced AI-powered 3D Digital Twin, Skill Gap Discovery & Apprenticeship Platform uniting Purvanchal youth with GIDA manufacturing factories across Gorakhpur.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
            <span className="px-2.5 py-1 rounded-lg bg-navy-900/80 border border-navy-700 text-slate-200">
              <strong>Project Lead:</strong> <span className="text-emerald-400 font-bold">Utkarsh Vishwakarma</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-navy-900/80 border border-navy-700 text-slate-400">
              Buddha Institute of Technology (BIT), Gorakhpur
            </span>
          </div>
        </div>

        {/* Right Side: Database Engine Trigger & Live Corridor Telemetry */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
          
          <button
            onClick={onOpenDatabase}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition active:scale-95 group"
          >
            <Database className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            <span>Open Database Schema & Generator</span>
            <ChevronRight className="w-4 h-4 text-emerald-200" />
          </button>

          {/* Quick Telemetry Cards */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-navy-950/80 border border-navy-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                CMAPS DBT
              </span>
              <span className="font-extrabold text-emerald-300 text-sm">₹1,000 / mo</span>
              <span className="text-[9px] text-slate-400 block">State Stipend Bonus</span>
            </div>

            <div className="p-2.5 rounded-xl bg-navy-950/80 border border-navy-800 space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-emerald-400" />
                Out-Migration
              </span>
              <span className="font-extrabold text-white text-sm">-38.4%</span>
              <span className="text-[9px] text-emerald-400 block">Youth Retained</span>
            </div>
          </div>

        </div>

      </div>

      {/* Live Gorakhpur Corridor Industrial Telemetry Ticker */}
      <div className="mt-5 pt-4 border-t border-navy-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-slate-300 uppercase tracking-wider">Live GIDA Telemetry:</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-300 font-mono text-[11px]">
          <span>⚡ 142 MW Factory Grid Active</span>
          <span>•</span>
          <span>🏭 12,400 MT/Day Gallantt Steel Output</span>
          <span>•</span>
          <span>🧪 340 MT/Day Purvanchal Polymers</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">✓ 648 Technicians Deployed</span>
        </div>
      </div>

    </div>
  );
};
