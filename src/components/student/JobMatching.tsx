import React, { useState } from 'react';
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GIDA_SKILLS } from '../../data/mockData';
import { AudioReaderButton } from '../common/AudioReaderButton';
import { SampleDataBadge } from '../common/SampleDataBadge';
import { JobPosting } from '../../types';

export const JobMatching: React.FC = () => {
  const { jobs, appliedJobIds, applyForJob, assessment, language } = useApp();
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Calculate dynamic match % for each job based on student's current proficiency
  const computeJobMatch = (job: JobPosting): number => {
    let requiredPoints = 0;
    let earnedPoints = 0;

    job.requiredSkills.forEach(req => {
      const userLevel = assessment.skillScores[req.skillId] || 1;
      requiredPoints += req.minLevel;
      earnedPoints += Math.min(userLevel, req.minLevel);
    });

    if (requiredPoints === 0) return 90;
    return Math.round((earnedPoints / requiredPoints) * 100);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSector = selectedSector === 'all' || job.sector === selectedSector;
    const matchesSearch =
      job.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {language === 'hi' ? 'चरण 03: रोजगार एवं शिक्षुता' : 'Step 03: Employment & Apprenticeship'}
              </span>
              <SampleDataBadge />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? 'स्थानीय गिडा नौकरियां एवं मैच प्रतिशत'
                  : 'GIDA Local Jobs with Match Readiness %'}
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'hi'
                ? 'आपके कौशल अंतर आकलन के आधार पर मैच प्रतिशत, अनुपस्थित कौशल और ब्रिज कोर्स लिंक।'
                : 'Jobs ranked by match percentage against your assessed skills, with missing-skill tags and free bridge course recommendations.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-3 py-1.5 rounded-xl bg-navy-950 border border-navy-800 text-emerald-400">
              {filteredJobs.length} {language === 'hi' ? 'खुले पद उपलब्ध' : 'Active Vacancies'}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-5 pt-4 border-t border-navy-800">
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={
                language === 'hi'
                  ? 'पद, कंपनी (गैलेंट, पूर्वांचल पॉलिमर्स) या कौशल खोजें...'
                  : 'Search by role, company (Gallantt, Purvanchal) or skill...'
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-5 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">{language === 'hi' ? 'सभी गिडा औद्योगिक क्षेत्र' : 'All GIDA Sectors'}</option>
              <option value="Sector 13 Heavy Engineering">Sector 13 Heavy Engineering</option>
              <option value="Sector 27 Plastic Park">Sector 27 Plastic Park</option>
              <option value="Sector 15 Food and Transformers">Sector 15 Food and Transformers</option>
              <option value="Sahjanwa Textile Park">Sahjanwa Textile Park</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredJobs.map(job => {
          const matchPercent = computeJobMatch(job);
          const isApplied = appliedJobIds.includes(job.id);

          // Find missing skills
          const missingSkillsForJob = job.requiredSkills.filter(req => {
            const userScore = assessment.skillScores[req.skillId] || 1;
            return userScore < req.minLevel;
          });

          const speechContent =
            language === 'hi'
              ? `${job.titleHi}, ${job.companyName}। वेतन: ${job.stipendSalary}। मैच प्रतिशत: ${matchPercent} प्रतिशत।`
              : `${job.titleEn} at ${job.companyName}. Salary: ${job.stipendSalary}. Match readiness: ${matchPercent} percent.`;

          return (
            <div
              key={job.id}
              className="bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl hover:border-emerald-500/50 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Header: Company, Tag & Match Ring */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5" />
                        {job.companyName}
                      </span>
                      <SampleDataBadge />
                      {job.cmapsEligible && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          CMAPS +₹1,000/mo
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {language === 'hi' ? job.titleHi : job.titleEn}
                    </h3>
                  </div>

                  {/* Circular Match Badge */}
                  <div
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl border font-black ${
                      matchPercent >= 80
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                        : matchPercent >= 50
                        ? 'bg-amber-950/80 text-amber-400 border-amber-500/40'
                        : 'bg-red-950/80 text-red-400 border-red-500/40'
                    }`}
                  >
                    <span className="text-xs leading-none">{matchPercent}%</span>
                    <span className="text-[9px] uppercase font-normal text-slate-400">Match</span>
                  </div>
                </div>

                {/* Location, Salary & Openings */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{job.sector.split(' ')[0]}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Stipend/Salary</span>
                    <strong className="text-emerald-300">{job.stipendSalary}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Openings</span>
                    <span className="font-semibold text-white">{job.openings} positions</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'hi' ? job.descriptionHi : job.descriptionEn}
                </p>

                {/* Safety PPE Spec */}
                <div className="p-2.5 rounded-xl bg-navy-950/70 border border-navy-800 text-[11px] text-slate-400">
                  <strong className="text-slate-300">
                    {language === 'hi' ? 'सुरक्षा मानक' : 'Safety Protocols'}:
                  </strong>{' '}
                  {job.safetyCompliance}
                </div>

                {/* Missing Skills Warning */}
                {missingSkillsForJob.length > 0 ? (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {language === 'hi' ? 'अनुपस्थित कौशल (ब्रिज कोर्स अनुशंसित):' : 'Missing Skills for 100% Match:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {missingSkillsForJob.map(ms => {
                        const sDef = GIDA_SKILLS.find(s => s.id === ms.skillId);
                        return (
                          <span
                            key={ms.skillId}
                            className="px-2 py-0.5 rounded text-[10px] bg-amber-950/60 text-amber-300 border border-amber-500/20"
                          >
                            {language === 'hi' ? sDef?.nameHi : sDef?.nameEn} (Lv {ms.minLevel})
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {language === 'hi'
                        ? 'उत्कृष्ट! आप इस पद के सभी बेंचमार्क को पूरा करते हैं।'
                        : 'Perfect match! You meet all required trade benchmarks.'}
                    </span>
                  </div>
                )}

              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-navy-800">
                <AudioReaderButton text={speechContent} size="sm" />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => applyForJob(job.id)}
                    disabled={isApplied}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                      isApplied
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/50 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50 active:scale-95'
                    }`}
                  >
                    {isApplied
                      ? language === 'hi'
                        ? '✓ आवेदन जमा'
                        : '✓ Applied'
                      : language === 'hi'
                      ? 'आवेदन करें (1-Click)'
                      : 'Apply Now (1-Click)'}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
