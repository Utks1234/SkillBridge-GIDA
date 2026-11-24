import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  Building,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  X,
  KeyRound,
  FileCheck
} from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const ClerkAuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    currentUser,
    loginAs,
    signup,
    activeAuthRole,
    setActiveAuthRole
  } = useAuth();
  const { language } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  // Student Form State
  const [studentName, setStudentName] = useState<string>('Utkarsh Vishwakarma');
  const [studentEmail, setStudentEmail] = useState<string>('utkarsh.vishwakarma@bit.edu');
  const [studentInstitute, setStudentInstitute] = useState<string>('Buddha Institute of Technology, Gorakhpur');
  const [studentTrade, setStudentTrade] = useState<string>('Mechanical & Automation Eng.');
  const [cmapsOpted, setCmapsOpted] = useState<boolean>(true);

  // Employer Form State
  const [companyName, setCompanyName] = useState<string>('Gallantt Ispat Limited');
  const [companyEmail, setCompanyEmail] = useState<string>('hr@gallantt.com');
  const [companySector, setCompanySector] = useState<string>('Sector 13 Heavy Engineering');
  const [gidaPlotNo, setGidaPlotNo] = useState<string>('Plot 1-4, Sector 13');
  const [gstin, setGstin] = useState<string>('09AAACG1234F1Z5');

  // Nodal Officer Form State
  const [officerEmail, setOfficerEmail] = useState<string>('nodal.officer@gida.up.gov.in');
  const [officerPin, setOfficerPin] = useState<string>('1234');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeAuthRole === 'student') {
      if (authMode === 'signup') {
        signup('student', {
          name: studentName,
          email: studentEmail,
          metadata: { institute: studentInstitute, trade: studentTrade }
        });
      } else {
        loginAs('student', { name: studentName, email: studentEmail });
      }
    } else if (activeAuthRole === 'employer') {
      if (authMode === 'signup') {
        signup('employer', {
          name: `${companyName} HR Desk`,
          email: companyEmail,
          metadata: { companyName, sector: companySector, gidaPlotNo }
        });
      } else {
        loginAs('employer', { name: `${companyName} HR Desk`, email: companyEmail });
      }
    } else {
      loginAs('nodal_officer', { email: officerEmail });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-navy-950 border border-navy-700/80 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Clerk Branding Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-navy-900 via-navy-900 to-navy-950 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm">Clerk Authentication</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  RBAC Secured
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Gorakhpur Industrial Development Authority · Identity Provider
              </p>
            </div>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role Selector Tabs (Separating Access into 3 Distinct Portals) */}
        <div className="p-4 sm:p-6 space-y-5">
          <div className="space-y-1 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {authMode === 'signin' ? 'Sign In to Your GIDA Portal' : 'Create GIDA Role Account'}
            </h3>
            <p className="text-xs text-slate-400">
              Select your persona below to access your dedicated, isolated dashboard.
            </p>
          </div>

          {/* 3 Role Selection Pills */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-navy-900 border border-navy-800">
            {[
              { id: 'student', label: 'Youth/Student', icon: <GraduationCap className="w-3.5 h-3.5" /> },
              { id: 'employer', label: 'GIDA Industry', icon: <Building className="w-3.5 h-3.5" /> },
              { id: 'nodal_officer', label: 'Nodal Officer', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveAuthRole(r.id as any)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition ${
                  activeAuthRole === r.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50'
                    : 'text-slate-400 hover:text-white hover:bg-navy-800'
                }`}
              >
                {r.icon}
                <span className="mt-1 text-[11px] truncate w-full text-center">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Quick VIP Presentation Demo Switcher */}
          <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-purple-400" />
              1-Click Demo Sign In (Role Switcher):
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => loginAs('student')}
                className="py-1.5 px-2 rounded-lg bg-navy-900 hover:bg-navy-800 border border-purple-500/40 text-emerald-300 text-[11px] font-bold text-center"
              >
                Utkarsh (Youth)
              </button>
              <button
                onClick={() => loginAs('employer')}
                className="py-1.5 px-2 rounded-lg bg-navy-900 hover:bg-navy-800 border border-purple-500/40 text-blue-300 text-[11px] font-bold text-center"
              >
                Gallantt (Factory)
              </button>
              <button
                onClick={() => loginAs('nodal_officer')}
                className="py-1.5 px-2 rounded-lg bg-navy-900 hover:bg-navy-800 border border-purple-500/40 text-amber-300 text-[11px] font-bold text-center"
              >
                Nodal Officer (IAS)
              </button>
            </div>
          </div>

          {/* Custom Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            
            {/* Student Persona Form */}
            {activeAuthRole === 'student' && (
              <>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name (Student / Passout)</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Aadhaar Linked Email / Phone</label>
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={e => setStudentEmail(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">ITI / College</label>
                    <select
                      value={studentInstitute}
                      onChange={e => setStudentInstitute(e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-xl px-2 py-2 text-slate-200 text-[11px]"
                    >
                      <option value="Buddha Institute of Technology, Gorakhpur">Buddha Inst. of Tech (BIT)</option>
                      <option value="Govt ITI Chargawan">Govt ITI Chargawan</option>
                      <option value="Govt ITI Sahjanwa">Govt ITI Sahjanwa</option>
                      <option value="Govt Polytechnic Gorakhpur">Govt Polytechnic Gorakhpur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Trade</label>
                    <select
                      value={studentTrade}
                      onChange={e => setStudentTrade(e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-xl px-2 py-2 text-slate-200 text-[11px]"
                    >
                      <option value="Mechanical & Automation Eng.">Mechanical & Automation</option>
                      <option value="CNC Machinist & Fitter">CNC Machinist & Fitter</option>
                      <option value="Plastic Injection Operator">Plastic Injection Operator</option>
                      <option value="Industrial Electrician & PLC">Industrial Electrician & PLC</option>
                    </select>
                  </div>
                </div>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cmapsOpted}
                    onChange={e => setCmapsOpted(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span className="text-[11px] font-semibold">
                    Opt-in for Chief Minister Apprenticeship (CMAPS) ₹1,000 monthly allowance
                  </span>
                </label>
              </>
            )}

            {/* Employer Persona Form */}
            {activeAuthRole === 'employer' && (
              <>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">GIDA Registered Enterprise</label>
                  <select
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="Gallantt Ispat Limited">Gallantt Ispat Limited (Sector 13)</option>
                    <option value="Purvanchal Polymers Pvt Ltd">Purvanchal Polymers Pvt Ltd (Sector 27)</option>
                    <option value="Ankur Transformers & Electricals">Ankur Transformers (Sector 15)</option>
                    <option value="Sahjanwa PolyFab & Textile Mills">Sahjanwa PolyFab & Textile Mills</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">GIDA Plot No.</label>
                    <input
                      type="text"
                      value={gidaPlotNo}
                      onChange={e => setGidaPlotNo(e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">GSTIN</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={e => setGstin(e.target.value)}
                      className="w-full bg-navy-900 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Authorized HR Work Email</label>
                  <input
                    type="email"
                    required
                    value={companyEmail}
                    onChange={e => setCompanyEmail(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </>
            )}

            {/* Nodal Officer Persona Form */}
            {activeAuthRole === 'nodal_officer' && (
              <>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                  <span className="font-bold block text-[11px] uppercase tracking-wider">
                    UP Government Executive Clearance Portal
                  </span>
                  <p className="text-[11px]">
                    Reserved for District Magistrate Desk, GIDA Nodal Officers & UPSDM Directors.
                  </p>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Govt Email ID</label>
                  <input
                    type="email"
                    required
                    value={officerEmail}
                    onChange={e => setOfficerEmail(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Security Clearance PIN (Default: 1234)</label>
                  <input
                    type="password"
                    required
                    value={officerPin}
                    onChange={e => setOfficerPin(e.target.value)}
                    className="w-full bg-navy-900 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-950/50 transition active:scale-98"
            >
              <span>{authMode === 'signin' ? 'Sign In with Clerk RBAC' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle Sign In / Sign Up */}
          <div className="text-center pt-2 border-t border-navy-800 text-xs text-slate-400">
            {authMode === 'signin' ? (
              <span>
                Don't have a GIDA credential?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="text-purple-400 font-bold hover:underline"
                >
                  Create Account
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  onClick={() => setAuthMode('signin')}
                  className="text-purple-400 font-bold hover:underline"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
