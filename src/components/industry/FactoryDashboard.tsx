import React from 'react';
import {
  Briefcase,
  Users,
  Award,
  TrendingUp,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
  PlusCircle,
  Search,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SampleDataBadge } from '../common/SampleDataBadge';
import { AudioReaderButton } from '../common/AudioReaderButton';

export const FactoryDashboard: React.FC<{
  onNavigateToPostJob: () => void;
  onNavigateToScout: () => void;
}> = ({ onNavigateToPostJob, onNavigateToScout }) => {
  const { jobs, projects, submissions, shortlistedCandidateIds, selectedCompany, setSelectedCompany, language } = useApp();

  const companies = [
    { name: 'Gallantt Ispat Limited', sector: 'Sector 13 Heavy Engineering', logoText: 'G' },
    { name: 'Purvanchal Polymers Pvt Ltd', sector: 'Sector 27 Plastic Park', logoText: 'P' },
    { name: 'Ankur Transformers & Electricals', sector: 'Sector 15 Food and Transformers', logoText: 'A' },
    { name: 'Sahjanwa PolyFab & Textile Mills', sector: 'Sahjanwa Textile Park', logoText: 'S' }
  ];

  const currentCompany = companies.find(c => c.name === selectedCompany) || companies[0];

  const companyJobs = jobs.filter(j => j.companyName === selectedCompany);
  const companyProjects = projects.filter(p => p.companyName.includes(selectedCompany.split(' ')[0]));
  const companySubmissions = submissions.filter(s => {
    const proj = projects.find(p => p.id === s.projectId);
    return proj?.companyName.includes(selectedCompany.split(' ')[0]);
  });

  const totalOpenings = companyJobs.reduce((acc, j) => acc + j.openings, 0);

  const speechSummary =
    language === 'hi'
      ? `${selectedCompany} डैशबोर्ड। सक्रिय नौकरियां: ${companyJobs.length}। कुल रिक्तियां: ${totalOpenings}। शॉर्टलिस्टेड उम्मीदवार: ${shortlistedCandidateIds.length}।`
      : `${selectedCompany} factory dashboard. Active jobs: ${companyJobs.length} with ${totalOpenings} openings. Shortlisted candidates: ${shortlistedCandidateIds.length}.`;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Company Switcher */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {language === 'hi' ? 'गिडा उद्योग पोर्टल' : 'GIDA Industry Portal'}
              </span>
              <SampleDataBadge />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Building className="w-6 h-6 text-emerald-400" />
              <span>{language === 'hi' ? 'फैक्ट्री डैशबोर्ड एवं भर्ती केंद्र' : 'Factory Dashboard & Talent Pipeline'}</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              {language === 'hi'
                ? 'गिडा विनिर्माण इकाइयों के लिए वास्तविक समय में रिक्तियों, लाइव प्रोजेक्ट्स और उम्मीदवारों की ट्रैकिंग।'
                : 'Real-time overview of active jobs, live projects, total applicants, and top candidate match rankings.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AudioReaderButton text={speechSummary} />
            <button
              onClick={onNavigateToPostJob}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'एआई जॉब पोस्ट करें' : 'Post AI Job'}</span>
            </button>
          </div>
        </div>

        {/* Company Switcher Tabs */}
        <div className="mt-5 pt-4 border-t border-navy-800">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            {language === 'hi' ? 'सक्रिय उद्योग प्रोफ़ाइल चुनें:' : 'Select Active Factory Profile:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {companies.map(c => {
              const isSelected = c.name === selectedCompany;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedCompany(c.name)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-emerald-950/70 border-emerald-500 shadow-md shadow-emerald-950/50'
                      : 'bg-navy-950/50 border-navy-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-navy-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400">
                      {c.logoText}
                    </span>
                    <span className="text-xs font-bold text-white truncate">{c.name.split(' ')[0]} {c.name.split(' ')[1]}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1 truncate">{c.sector}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">{language === 'hi' ? 'सक्रिय पद' : 'Active Postings'}</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{companyJobs.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">{totalOpenings} total open positions</p>
        </div>

        <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">{language === 'hi' ? 'लाइव प्रोजेक्ट्स' : 'Live Projects'}</span>
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{companyProjects.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Industry-Academia challenges</p>
        </div>

        <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">{language === 'hi' ? 'जमा समाधान' : 'Submissions'}</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{companySubmissions.length}</div>
          <p className="text-[11px] text-emerald-400 mt-1">Ready for verification</p>
        </div>

        <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase">{language === 'hi' ? 'शॉर्टलिस्टेड' : 'Shortlisted'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{shortlistedCandidateIds.length}</div>
          <p className="text-[11px] text-slate-400 mt-1">Ready for interview call</p>
        </div>

      </div>

      {/* Active Jobs & Live Submissions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Jobs List (7 cols) */}
        <div className="lg:col-span-7 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">
              {language === 'hi' ? 'कंपनी के वर्तमान खुले पद' : 'Current Active Vacancies'}
            </h3>
            <button
              onClick={onNavigateToScout}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              {language === 'hi' ? 'उम्मीदवार खोजें →' : 'Scout Candidates →'}
            </button>
          </div>

          <div className="space-y-3">
            {companyJobs.map(job => (
              <div
                key={job.id}
                className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {language === 'hi' ? job.titleHi : job.titleEn}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                    <span>{job.openings} Openings</span>
                    <span>•</span>
                    <span className="text-emerald-300">{job.stipendSalary}</span>
                    <span>•</span>
                    <span className="text-slate-400">{job.type.split(' ')[0]}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Submissions (5 cols) */}
        <div className="lg:col-span-5 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">
            {language === 'hi' ? 'उद्योग समाधान प्रस्तुतियां' : 'Student Submissions'}
          </h3>

          <div className="space-y-3">
            {companySubmissions.map(sub => (
              <div
                key={sub.id}
                className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{sub.studentName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {sub.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{sub.studentCollege}</p>
                <p className="text-[11px] text-slate-300 line-clamp-1">{sub.submissionNotes}</p>
                {sub.certificateHash && (
                  <p className="text-[10px] font-mono text-emerald-400">
                    Hash: {sub.certificateHash.substring(0, 16)}...
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
