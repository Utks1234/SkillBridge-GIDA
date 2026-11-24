import React, { useState } from 'react';
import {
  Sparkles,
  Briefcase,
  CheckCircle2,
  Send,
  Building,
  RotateCcw,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateBilingualJobDescription, GeneratedJobDescription } from '../../services/aiEngine';
import { SampleDataBadge } from '../common/SampleDataBadge';
import { AudioReaderButton } from '../common/AudioReaderButton';
import { JobPosting } from '../../types';

export const AIJobPoster: React.FC<{ onPublished?: () => void }> = ({ onPublished }) => {
  const { addJobPosting, selectedCompany, language } = useApp();

  const [trade, setTrade] = useState<string>('CNC VMC Programmer');
  const [sector, setSector] = useState<string>('Sector 13 Heavy Engineering');
  const [openings, setOpenings] = useState<number>(5);
  const [salaryMin, setSalaryMin] = useState<number>(18000);
  const [salaryMax, setSalaryMax] = useState<number>(24000);
  const [rawBullets, setRawBullets] = useState<string>(
    '- Need 5 CNC operators for Fanuc 0i-MF machine\n- Capable of G54 workpiece zero and G43 tool offset\n- Experience reading isometric blueprints and using Vernier caliper\n- Shift duty at Sector 13 facility, steel-toe shoes mandatory'
  );

  const [generatedJD, setGeneratedJD] = useState<GeneratedJobDescription | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const result = generateBilingualJobDescription({
        trade,
        sector,
        companyName: selectedCompany,
        rawBullets,
        openings,
        salaryMin,
        salaryMax
      });
      setGeneratedJD(result);
      setIsGenerating(false);
    }, 700);
  };

  const handlePublish = () => {
    if (!generatedJD) return;

    const newJob: JobPosting = {
      id: `job_gida_${Date.now()}`,
      titleEn: generatedJD.titleEn,
      titleHi: generatedJD.titleHi,
      companyName: selectedCompany,
      sector: sector as any,
      location: `${sector}, GIDA Gorakhpur`,
      stipendSalary: generatedJD.stipendSalary,
      type: 'Apprenticeship (NATS/CMAPS)',
      cmapsEligible: true,
      openings,
      descriptionEn: generatedJD.overviewEn,
      descriptionHi: generatedJD.overviewHi,
      safetyCompliance: generatedJD.safetyAndPpeRulesEn.join(' '),
      requiredSkills: generatedJD.requiredSkills,
      postedDate: new Date().toISOString().split('T')[0],
      deadline: '2026-12-30',
      isSampleData: false
    };

    addJobPosting(newJob);
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      if (onPublished) onPublished();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                AI Job Writer
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400" />
                Claude Engine + Offline Rule Net
              </span>
              <SampleDataBadge />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? 'एआई द्विभाषी जॉब विवरण लेखक'
                  : 'AI Bilingual & Safety-Compliant Job Description Writer'}
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'hi'
                ? 'कच्चे बुलेट पॉइंट्स से द्विभाषी, सुरक्षा-अनुरूप एवं ट्रेड-बेंचमार्क वाली आधिकारिक पोस्टिंग तैयार करें।'
                : 'Claude drafts bilingual, safety-compliant, trade-benchmarked postings from raw bullet points with CMAPS allowance.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Input Form on Left, Generated Bilingual Spec on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">
            {language === 'hi' ? 'नौकरी की प्राथमिक जानकारी' : 'Job Requirements & Raw Notes'}
          </h3>

          <form onSubmit={handleGenerate} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company Profile</label>
              <input
                type="text"
                disabled
                value={selectedCompany}
                className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-slate-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Trade Category</label>
                <select
                  value={trade}
                  onChange={e => setTrade(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="CNC VMC Programmer">CNC & VMC Programmer</option>
                  <option value="Plastic Injection Mold Tech">Plastic Injection Mold Tech</option>
                  <option value="PLC Automation Electrician">PLC & Sensor Electrician</option>
                  <option value="Mechanical QA Inspector">Mechanical QA/QC Inspector</option>
                  <option value="Transformer Winder">Transformer Coil Winder</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sector Hub</label>
                <select
                  value={sector}
                  onChange={e => setSector(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="Sector 13 Heavy Engineering">Sector 13 Heavy Engineering</option>
                  <option value="Sector 27 Plastic Park">Sector 27 Plastic Park</option>
                  <option value="Sector 15 Food and Transformers">Sector 15 Food and Transformers</option>
                  <option value="Sahjanwa Textile Park">Sahjanwa Textile Park</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Openings</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={openings}
                  onChange={e => setOpenings(parseInt(e.target.value) || 1)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Min Salary (₹)</label>
                <input
                  type="number"
                  step="500"
                  value={salaryMin}
                  onChange={e => setSalaryMin(parseInt(e.target.value) || 12000)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Max Salary (₹)</label>
                <input
                  type="number"
                  step="500"
                  value={salaryMax}
                  onChange={e => setSalaryMax(parseInt(e.target.value) || 18000)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Raw Bullet Points / Requirements
              </label>
              <textarea
                rows={5}
                required
                value={rawBullets}
                onChange={e => setRawBullets(e.target.value)}
                placeholder="Paste raw notes from your plant manager..."
                className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-slate-200 font-mono text-[11px]"
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'AI Writing Job Description...' : 'Generate AI Bilingual Job Post'}</span>
            </button>
          </form>
        </div>

        {/* Right Preview (7 cols) */}
        <div className="lg:col-span-7 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800">
            <h3 className="font-bold text-white text-base">
              {language === 'hi' ? 'पूर्वावलोकन: संरचित द्विभाषी पोस्टिंग' : 'AI Generated Bilingual Specification'}
            </h3>
            {generatedJD && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ✓ Ready to Publish
              </span>
            )}
          </div>

          {generatedJD ? (
            <div className="space-y-4 text-xs">
              
              {/* Titles in Both Languages */}
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Title (EN / HI):</span>
                <p className="text-sm font-bold text-white">{generatedJD.titleEn}</p>
                <p className="text-sm font-bold text-emerald-400">{generatedJD.titleHi}</p>
                <div className="flex items-center gap-3 text-slate-400 pt-1 text-[11px]">
                  <span>{generatedJD.sector}</span>
                  <span>•</span>
                  <strong className="text-emerald-300">{generatedJD.stipendSalary}</strong>
                </div>
              </div>

              {/* Overviews */}
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-navy-950/70 border border-navy-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">English Overview:</span>
                  <p className="text-slate-300 mt-1 leading-relaxed">{generatedJD.overviewEn}</p>
                </div>

                <div className="p-3 rounded-xl bg-navy-950/70 border border-navy-800">
                  <span className="text-[10px] uppercase font-bold text-emerald-400">हिन्दी सारांश (Hindi):</span>
                  <p className="text-slate-300 mt-1 leading-relaxed">{generatedJD.overviewHi}</p>
                </div>
              </div>

              {/* Key Responsibilities */}
              <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Key Trade Tasks:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {generatedJD.keyResponsibilitiesEn.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>

              {/* Safety & CMAPS */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-1">
                <strong className="block text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Mandatory Safety PPE & CMAPS Compliance:
                </strong>
                <p className="text-[11px]">{generatedJD.safetyAndPpeRulesEn.join(' ')}</p>
                <p className="text-[11px] font-semibold text-emerald-400 pt-1">{generatedJD.cmapsEligibility}</p>
              </div>

              {/* Publish Action Button */}
              <div className="pt-2">
                <button
                  onClick={handlePublish}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish to SkillBridge GIDA Portal</span>
                </button>

                {publishSuccess && (
                  <p className="text-center text-xs text-emerald-400 font-semibold mt-2">
                    ✓ Job successfully published! Local youth will now see it with match percentages.
                  </p>
                )}
              </div>

            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 border border-dashed border-navy-800 rounded-xl">
              <Sparkles className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-xs">
                Fill in the requirements and click <strong>"Generate AI Bilingual Job Post"</strong> to produce safety-compliant postings.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
