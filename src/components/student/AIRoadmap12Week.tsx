import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  ExternalLink,
  MapPin,
  Sparkles,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generate12WeekRoadmap } from '../../services/aiEngine';
import { GIDA_BENCHMARK_ROLES } from '../../data/mockData';
import { AudioReaderButton } from '../common/AudioReaderButton';
import { SampleDataBadge } from '../common/SampleDataBadge';

export const AIRoadmap12Week: React.FC = () => {
  const { assessment, language } = useApp();
  const [expandedWeek, setExpandedWeek] = useState<number>(1);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([1, 2]);

  const targetRole =
    GIDA_BENCHMARK_ROLES.find(r => r.id === assessment.targetRoleId) ||
    GIDA_BENCHMARK_ROLES[0];

  const missingSkillIds = targetRole.requiredSkills
    .filter(req => (assessment.skillScores[req.skillId] || 1) < req.benchmarkLevel)
    .map(req => req.skillId);

  const roadmap = generate12WeekRoadmap(assessment.targetRoleId, missingSkillIds);

  const toggleWeekCompletion = (weekNum: number) => {
    setCompletedWeeks(prev =>
      prev.includes(weekNum) ? prev.filter(w => w !== weekNum) : [...prev, weekNum]
    );
  };

  const currentWeekData = roadmap.find(w => w.week === expandedWeek) || roadmap[0];

  const speechText =
    language === 'hi'
      ? `12-सप्ताह का एआई रोडमैप राजकीय आईटीआई चरगांवा एवं सहजनवां के लिए तैयार किया गया है। सप्ताह ${currentWeekData.week}: ${currentWeekData.titleHi}। लैब स्थान: ${currentWeekData.instituteLocation}।`
      : `12-Week AI Roadmap tailored to Govt ITI Chargawan and Sahjanwa. Week ${currentWeekData.week}: ${currentWeekData.titleEn}. Practical venue: ${currentWeekData.instituteLocation}.`;

  const handlePrintCurriculum = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Roadmap Header */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {language === 'hi' ? 'चरण 02: व्यावहारिक शिक्षा' : 'Step 02: Hands-On Learning'}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400" />
                Claude AI + Offline Fallback
              </span>
              <SampleDataBadge />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? `12-सप्ताह का एआई रोडमैप (${targetRole.titleHi})`
                  : `12-Week AI Roadmap (${targetRole.titleEn})`}
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'hi'
                ? 'राजकीय आईटीआई चरगांवा एवं सहजनवां के टूलरूम के अनुसार साप्ताहिक पाठ्यक्रम और लैब अभ्यास।'
                : 'A 12-week practical AI plan tailored to Govt ITI Chargawan and Sahjanwa training centers with offline rule fallback.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AudioReaderButton text={speechText} />
            <button
              onClick={handlePrintCurriculum}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs font-medium border border-navy-700 transition"
              title="Print or export curriculum"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'पाठ्यक्रम प्रिंट' : 'Print Plan'}</span>
            </button>
          </div>
        </div>

        {/* Training Centre Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-navy-800 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-950/70 border border-navy-800">
            <Building className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-semibold text-white">Govt ITI Chargawan</span>
              <span className="text-slate-400 block text-[11px]">CNC Milling, Turning & CMM Metrology Lab</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-950/70 border border-navy-800">
            <Building className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="font-semibold text-white">Govt ITI Sahjanwa (Plastic Park)</span>
              <span className="text-slate-400 block text-[11px]">Injection Molding, Tool & Die, Hydraulics Workshop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Week Progress Bar */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-300">
            {language === 'hi' ? 'पाठ्यक्रम प्रगति' : 'Curriculum Progress'}:{' '}
            <strong className="text-emerald-400">{completedWeeks.length} / 12 {language === 'hi' ? 'सप्ताह पूर्ण' : 'Weeks Completed'}</strong>
          </span>
          <span className="font-mono text-emerald-400">
            {Math.round((completedWeeks.length / 12) * 100)}%
          </span>
        </div>
        <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden flex">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(completedWeeks.length / 12) * 100}%` }}
          />
        </div>

        {/* 12-Week Pill Selector */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 mt-4">
          {roadmap.map(item => {
            const isDone = completedWeeks.includes(item.week);
            const isSelected = item.week === expandedWeek;
            return (
              <button
                key={item.week}
                onClick={() => setExpandedWeek(item.week)}
                className={`py-1.5 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-md'
                    : isDone
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-navy-950 text-slate-400 border border-navy-800 hover:bg-navy-800'
                }`}
              >
                <span>W{item.week}</span>
                {isDone && <CheckCircle className="w-2.5 h-2.5 text-emerald-400 mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Week Detailed Card */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              {language === 'hi' ? `सप्ताह 0${currentWeekData.week} विवरण` : `Week 0${currentWeekData.week} Details`}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              {language === 'hi' ? currentWeekData.titleHi : currentWeekData.titleEn}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentWeekData.instituteLocation}</span>
            </div>
          </div>

          <button
            onClick={() => toggleWeekCompletion(currentWeekData.week)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              completedWeeks.includes(currentWeekData.week)
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-900/40'
                : 'bg-navy-800 hover:bg-navy-700 text-slate-300 border border-navy-700'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              {completedWeeks.includes(currentWeekData.week)
                ? language === 'hi'
                  ? 'सप्ताह पूर्ण चिह्नित'
                  : 'Week Completed'
                : language === 'hi'
                ? 'पूर्ण के रूप में चिह्नित करें'
                : 'Mark as Completed'}
            </span>
          </button>
        </div>

        {/* Practical Lab & Theory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Practical Workshop Module */}
          <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              {language === 'hi' ? 'व्यावहारिक वर्कशॉप लैब' : 'Hands-On Workshop Lab'}
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {language === 'hi' ? currentWeekData.practicalLabHi : currentWeekData.practicalLabEn}
            </p>
          </div>

          {/* Theory Module */}
          <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {language === 'hi' ? 'सिद्धांत एवं मानक' : 'Theory & Standards'}
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {language === 'hi' ? currentWeekData.theoryModuleHi : currentWeekData.theoryModuleEn}
            </p>
          </div>

        </div>

        {/* Milestone Sign-Off & Resource */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-semibold text-emerald-400 block uppercase tracking-wider text-[11px]">
              {language === 'hi' ? 'साप्ताहिक माइलस्टोन परिणाम' : 'Weekly Milestone Outcome:'}
            </span>
            <span className="text-slate-200 font-medium">{currentWeekData.milestoneOutcome}</span>
          </div>

          <a
            href={currentWeekData.onlineResourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-emerald-400 border border-emerald-500/30 flex-shrink-0"
          >
            <span>{currentWeekData.onlineResourceTitle}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

    </div>
  );
};
