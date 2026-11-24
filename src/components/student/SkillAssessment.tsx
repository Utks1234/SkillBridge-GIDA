import React from 'react';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GIDA_BENCHMARK_ROLES, GIDA_SKILLS } from '../../data/mockData';
import { AudioReaderButton } from '../common/AudioReaderButton';
import { SampleDataBadge } from '../common/SampleDataBadge';

export const SkillAssessment: React.FC<{ onNavigateToRoadmap?: () => void }> = ({
  onNavigateToRoadmap
}) => {
  const { assessment, setSkillScore, setTargetRole, resetAssessment, language } = useApp();

  const selectedRole =
    GIDA_BENCHMARK_ROLES.find(r => r.id === assessment.targetRoleId) ||
    GIDA_BENCHMARK_ROLES[0];

  // Calculate readiness score
  let totalBenchmarkPoints = 0;
  let totalUserPoints = 0;

  selectedRole.requiredSkills.forEach(req => {
    const userScore = assessment.skillScores[req.skillId] || 1;
    totalBenchmarkPoints += req.benchmarkLevel;
    totalUserPoints += Math.min(userScore, req.benchmarkLevel);
  });

  const readinessPercent = Math.round((totalUserPoints / totalBenchmarkPoints) * 100);

  // Missing vs Acquired skills
  const missingSkills = selectedRole.requiredSkills.filter(req => {
    const userScore = assessment.skillScores[req.skillId] || 1;
    return userScore < req.benchmarkLevel;
  });

  const acquiredSkills = selectedRole.requiredSkills.filter(req => {
    const userScore = assessment.skillScores[req.skillId] || 1;
    return userScore >= req.benchmarkLevel;
  });

  // SVG Radar Chart Coordinates (5 axes max for clean polygonal visual)
  const radarSkills = selectedRole.requiredSkills.slice(0, 5).map(req => {
    const skill = GIDA_SKILLS.find(s => s.id === req.skillId);
    const userScore = assessment.skillScores[req.skillId] || 1;
    return {
      name: language === 'hi' ? skill?.nameHi || req.skillId : skill?.nameEn || req.skillId,
      userLevel: userScore,
      benchmarkLevel: req.benchmarkLevel
    };
  });

  const center = 110;
  const maxRadius = 80;
  const totalAxes = radarSkills.length || 5;

  const getCoordinates = (index: number, level: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (level / 5) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const benchmarkPoints = radarSkills
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.benchmarkLevel);
      return `${x},${y}`;
    })
    .join(' ');

  const userPoints = radarSkills
    .map((s, i) => {
      const { x, y } = getCoordinates(i, s.userLevel);
      return `${x},${y}`;
    })
    .join(' ');

  const speechSummary =
    language === 'hi'
      ? `आपकी लक्ष्य भूमिका ${selectedRole.titleHi} है। आपकी वर्तमान तैयारी ${readinessPercent} प्रतिशत है। ${missingSkills.length} कौशल में सुधार की आवश्यकता है।`
      : `Your target role is ${selectedRole.titleEn}. Your current skill readiness is ${readinessPercent} percent. ${missingSkills.length} skills need bridging.`;

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Role Selector */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-navy-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {language === 'hi' ? 'चरण 01: कौशल मूल्यांकन' : 'Step 01: Skill Assessment'}
              </span>
              <SampleDataBadge />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Sliders className="w-6 h-6 text-emerald-400" />
              <span>{language === 'hi' ? 'कौशल अंतर आकलन' : 'Skill Gap & Benchmark Assessment'}</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'hi'
                ? 'गिडा औद्योगिक भूमिकाओं के विरुद्ध 1 से 5 स्तर के स्लाइडर से अपनी वर्तमान क्षमता मापें।'
                : 'Assess 1–5 proficiency sliders against GIDA factory benchmarks shown in bar and radar charts.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <AudioReaderButton text={speechSummary} />
            <button
              onClick={resetAssessment}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-navy-800 hover:bg-navy-700 rounded-lg border border-navy-700 transition"
              title="Reset sliders"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'रीसेट' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Role Selector Grid */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            {language === 'hi' ? 'लक्ष्य गिडा औद्योगिक भूमिका चुनें:' : 'Select Target GIDA Industry Role:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {GIDA_BENCHMARK_ROLES.map(roleItem => {
              const isSelected = roleItem.id === selectedRole.id;
              return (
                <button
                  key={roleItem.id}
                  onClick={() => setTargetRole(roleItem.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-emerald-950/70 border-emerald-500 shadow-md shadow-emerald-950/50'
                      : 'bg-navy-950/50 border-navy-800 hover:border-slate-700 hover:bg-navy-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold text-white">
                      {language === 'hi' ? roleItem.titleHi : roleItem.titleEn}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                    <span className="text-emerald-400/90">{roleItem.sector.split(' ')[0]}</span>
                    <span>{roleItem.averageSalary}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Sliders on Left, Charts & Readiness on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): 1-5 Proficiency Sliders */}
        <div className="lg:col-span-7 bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span>{language === 'hi' ? 'आवश्यक कौशल एवं आपकी रेटिंग' : 'Required Skills & Your Proficiency'}</span>
              <span className="text-xs font-normal text-slate-400">(1: Basic → 5: Master)</span>
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-navy-800 text-slate-300">
              {selectedRole.requiredSkills.length} {language === 'hi' ? 'कौशल' : 'Skills'}
            </span>
          </div>

          <div className="space-y-4">
            {selectedRole.requiredSkills.map(req => {
              const skill = GIDA_SKILLS.find(s => s.id === req.skillId);
              const userScore = assessment.skillScores[req.skillId] || 1;
              const isMet = userScore >= req.benchmarkLevel;

              return (
                <div
                  key={req.skillId}
                  className="p-3.5 rounded-xl bg-navy-950/70 border border-navy-800/90 hover:border-navy-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          {language === 'hi' ? skill?.nameHi || req.skillId : skill?.nameEn || req.skillId}
                        </span>
                        {req.criticality === 'core' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/30">
                            Core
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {language === 'hi' ? skill?.descriptionHi : skill?.descriptionEn}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs flex-shrink-0">
                      <span className="text-slate-400">
                        {language === 'hi' ? 'बेंचमार्क' : 'Benchmark'}:{' '}
                        <strong className="text-emerald-400">{req.benchmarkLevel}/5</strong>
                      </span>
                      <span className="text-slate-500">|</span>
                      <span className={isMet ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {language === 'hi' ? 'आपका' : 'You'}: {userScore}/5
                      </span>
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-mono">1</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={userScore}
                      onChange={e => setSkillScore(req.skillId, parseInt(e.target.value))}
                      className="w-full h-2 bg-navy-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <span className="text-xs text-slate-500 font-mono">5</span>
                    <div className="w-7 text-center font-bold text-sm text-emerald-400 font-mono">
                      {userScore}
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full bg-navy-900 rounded-full h-1.5 mt-2 overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isMet ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${(userScore / 5) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): Visual Radar, Readiness Ring & Gap Summary */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Readiness Ring Card */}
          <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {language === 'hi' ? 'उद्योग तत्परता स्कोर' : 'Industry Readiness Score'}
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                {readinessPercent}%{' '}
                <span className="text-xs font-medium text-emerald-400">
                  {readinessPercent >= 80
                    ? language === 'hi'
                      ? 'नियुक्ति हेतु तैयार'
                      : 'Hiring Ready'
                    : language === 'hi'
                    ? 'ब्रिज कोर्स अनुशंसित'
                    : 'Training Needed'}
                </span>
              </h4>
              <p className="text-slate-400 text-xs mt-1">
                {language === 'hi'
                  ? `${missingSkills.length} आवश्यक कौशल में सुधार से आप गैलेंट और प्लास्टिक पार्क के लिए पात्र होंगे।`
                  : `${missingSkills.length} skill gaps need bridging to qualify for Sector 13 & 27 roles.`}
              </p>
            </div>

            {/* Circular Ring SVG */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#1c2541"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke={readinessPercent >= 80 ? '#10b981' : readinessPercent >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="6"
                  strokeDasharray={201}
                  strokeDashoffset={201 - (201 * readinessPercent) / 100}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-white">
                {readinessPercent}%
              </div>
            </div>
          </div>

          {/* Radar Chart Card */}
          <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">
                {language === 'hi' ? 'रडार कौशल तुलना (आप बनाम बेंचमार्क)' : 'Skill Radar (You vs Benchmark)'}
              </h4>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> You
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span> Benchmark
                </span>
              </div>
            </div>

            {/* Interactive SVG Radar Chart */}
            <div className="relative flex items-center justify-center py-2">
              <svg width="220" height="220" viewBox="0 0 220 220" className="overflow-visible">
                {/* Background Concentric Polygon Rings (Levels 1 to 5) */}
                {[1, 2, 3, 4, 5].map(lvl => {
                  const pts = radarSkills
                    .map((_, i) => {
                      const { x, y } = getCoordinates(i, lvl);
                      return `${x},${y}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={lvl}
                      points={pts}
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="1"
                      strokeDasharray={lvl === 5 ? 'none' : '2,2'}
                    />
                  );
                })}

                {/* Axes Spokes */}
                {radarSkills.map((_, i) => {
                  const { x, y } = getCoordinates(i, 5);
                  return (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="#334155"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Benchmark Polygon */}
                <polygon
                  points={benchmarkPoints}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeDasharray="4,3"
                />

                {/* User Polygon */}
                <polygon
                  points={userPoints}
                  fill="rgba(16, 185, 129, 0.3)"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* User Data Points */}
                {radarSkills.map((s, i) => {
                  const { x, y } = getCoordinates(i, s.userLevel);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#10b981"
                      stroke="#0b132b"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Missing Skills Warning & Bridge Callout */}
            {missingSkills.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                <div className="space-y-1">
                  <p className="font-semibold">
                    {language === 'hi'
                      ? `${missingSkills.length} आवश्यक कौशल में सुधार शेष है:`
                      : `${missingSkills.length} critical skills require bridging:`}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {missingSkills.map(ms => {
                      const sDef = GIDA_SKILLS.find(s => s.id === ms.skillId);
                      return (
                        <span
                          key={ms.skillId}
                          className="px-2 py-0.5 rounded text-[10px] bg-amber-950/80 text-amber-200 border border-amber-500/30"
                        >
                          {language === 'hi' ? sDef?.nameHi : sDef?.nameEn}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* CTA to 12-Week AI Roadmap */}
            {onNavigateToRoadmap && (
              <button
                onClick={onNavigateToRoadmap}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-900/40 transition active:scale-98"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {language === 'hi'
                    ? '12-सप्ताह का एआई रोडमैप देखें'
                    : 'View 12-Week AI Roadmap at ITI'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
