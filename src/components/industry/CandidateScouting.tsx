import React, { useState } from 'react';
import {
  Search,
  UserCheck,
  UserX,
  Award,
  Filter,
  CheckCircle2,
  Mail,
  GraduationCap,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_STUDENT_PROFILES, GIDA_SKILLS } from '../../data/mockData';
import { SampleDataBadge } from '../common/SampleDataBadge';
import { AudioReaderButton } from '../common/AudioReaderButton';

export const CandidateScouting: React.FC = () => {
  const { shortlistedCandidateIds, toggleShortlistCandidate, language } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [notifiedCandidate, setNotifiedCandidate] = useState<string | null>(null);

  const candidates = SAMPLE_STUDENT_PROFILES;

  const filteredCandidates = candidates.filter(cand => {
    const matchesTrade = selectedTrade === 'all' || cand.trade.toLowerCase().includes(selectedTrade.toLowerCase());
    const matchesSearch =
      cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrade && matchesSearch;
  });

  const handleNotify = (name: string) => {
    setNotifiedCandidate(name);
    setTimeout(() => setNotifiedCandidate(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Talent Scout
              </span>
              <SampleDataBadge />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? 'स्थानीय आईटीआई एवं पॉलिटेक्निक प्रतिभा स्काउटिंग'
                  : 'Candidate Scouting & ITI Trade Review'}
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'hi'
                ? 'राजकीय आईटीआई चरगांवा, सहजनवां और बीआईटी गोरखपुर के प्रमाणित युवाओं की खोज, शॉर्टलिस्टिंग और तुरंत सूचना।'
                : 'Review ITI trade scores, assessed skills, and shortlist or reject candidates with instant student notification.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-navy-950 border border-navy-800 text-emerald-400 font-semibold">
              {shortlistedCandidateIds.length} Shortlisted for Interview
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-4 pt-4 border-t border-navy-800">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={
                language === 'hi'
                  ? 'उम्मीदवार, आईटीआई संस्थान (चरगांवा, सहजनवां), या स्थान खोजें...'
                  : 'Search by candidate name, institute (Chargawan, Sahjanwa) or location...'
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedTrade}
              onChange={e => setSelectedTrade(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All ITI & Polytechnic Trades</option>
              <option value="CNC">CNC Machinist & Fitter</option>
              <option value="Plastics">Plastics Processing Operator</option>
              <option value="Electrician">Industrial Electrician & PLC</option>
              <option value="Quality">Mechanical Quality Control</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredCandidates.map(cand => {
          const isShortlisted = shortlistedCandidateIds.includes(cand.id);

          return (
            <div
              key={cand.id}
              className="bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4 hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-navy-800 to-navy-700 border border-slate-700 flex items-center justify-center font-bold text-white text-base">
                    {cand.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm sm:text-base">{cand.name}</h4>
                      <SampleDataBadge />
                    </div>
                    <p className="text-xs text-emerald-400 font-semibold">{cand.trade}</p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>{cand.institute} ({cand.yearOfPassing})</span>
                    </p>
                  </div>
                </div>

                {/* Overall Readiness Ring */}
                <div className="text-right flex-shrink-0">
                  <span className="text-xs text-slate-400 block text-[10px] uppercase">Readiness</span>
                  <span className="text-lg font-black text-emerald-400">{cand.overallReadiness}%</span>
                </div>
              </div>

              {/* Assessed Skill Scores */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Assessed Benchmarks (Proficiency 1–5):
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {Object.entries(cand.skills).map(([skId, score]) => {
                    const sk = GIDA_SKILLS.find(s => s.id === skId);
                    return (
                      <div
                        key={skId}
                        className="p-1.5 rounded-lg bg-navy-950 border border-navy-800 flex items-center justify-between"
                      >
                        <span className="truncate text-slate-300 pr-1">
                          {language === 'hi' ? sk?.nameHi || skId : sk?.nameEn || skId}
                        </span>
                        <strong className="text-emerald-400 font-mono flex-shrink-0">{score}/5</strong>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-navy-800">
                <span className="text-xs text-slate-400">
                  Status: <strong className="text-slate-200">{cand.status}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNotify(cand.name)}
                    className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 border border-navy-700 text-xs"
                    title="Send Interview Invitation via WhatsApp/SMS"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => toggleShortlistCandidate(cand.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isShortlisted
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}</span>
                  </button>
                </div>
              </div>

              {notifiedCandidate === cand.name && (
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs text-center border border-emerald-500/30">
                  ✓ Instant interview invitation sent to {cand.name} via WhatsApp/SMS!
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
