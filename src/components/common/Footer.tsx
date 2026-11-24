import React from 'react';
import { Award, ShieldCheck, Heart, MapPin, Building, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { language } = useApp();

  return (
    <footer className="mt-16 bg-navy-900/90 border-t border-navy-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About SkillBridge GIDA */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="SkillBridge GIDA" className="w-7 h-7 rounded-lg" />
              <span className="font-bold text-white text-base">
                SkillBridge <span className="text-emerald-400">GIDA</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === 'hi'
                ? 'गोरखपुर औद्योगिक विकास प्राधिकरण (गिडा) के लिए एआई-संचालित कौशल अंतर खोज, शिक्षुता और रोजगार मंच।'
                : 'AI-powered skill gap discovery, apprenticeship and employment platform for the Gorakhpur Industrial Development Authority.'}
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>GIDA, Gorakhpur, Uttar Pradesh</span>
            </div>
          </div>

          {/* Col 2: Hackathon Presentation Credentials */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              {language === 'hi' ? 'हैकाथॉन प्रस्तुति' : 'Hackathon Credentials'}
            </h4>
            <div className="p-3 rounded-lg bg-navy-950/70 border border-navy-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                <Award className="w-3.5 h-3.5" />
                <span>GIDA DIVAS HACKATHON 2026</span>
              </div>
              <p className="text-slate-300 font-medium">Theme 11: Skill Development & Employment</p>
              <p className="text-slate-400 text-[11px]">Presented by: Buddha Institute of Technology (BIT)</p>
              <p className="text-emerald-400 text-[11px] pt-1 border-t border-navy-800 font-semibold">
                {language === 'hi' ? 'प्रोजेक्ट लीड (Project Lead): ' : 'Project Lead: '}Utkarsh Vishwakarma
              </p>
            </div>
          </div>

          {/* Col 3: GIDA Industrial Hubs */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              {language === 'hi' ? 'गिडा औद्योगिक क्षेत्र' : 'GIDA Industrial Sectors'}
            </h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li className="flex items-center gap-1.5">
                <Building className="w-3 h-3 text-emerald-400" />
                <span>Sector 13: Heavy Engineering (Gallantt)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Building className="w-3 h-3 text-emerald-400" />
                <span>Sector 27: Plastic Park & Tooling</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Building className="w-3 h-3 text-emerald-400" />
                <span>Sector 15: Food & Transformers</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Building className="w-3 h-3 text-emerald-400" />
                <span>Sahjanwa: PolyFab & Textile Mills</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Partners */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              {language === 'hi' ? 'संबद्ध संस्थान' : 'Partner Institutes'}
            </h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>Govt ITI Chargawan, Gorakhpur</li>
              <li>Govt ITI Sahjanwa, GIDA</li>
              <li>Govt Polytechnic Gorakhpur</li>
              <li>Buddha Institute of Technology, GIDA</li>
              <li>UPSDM Gorakhpur & Nodal Desk</li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 SkillBridge GIDA. Developed for GIDA DIVAS Hackathon 2026. Made with pride in Gorakhpur, UP.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>UPSDM & CMAPS Scheme Aligned</span>
            </span>
            <span className="text-slate-400">Production Ready · Zero External Blocking Keys Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
