import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Building,
  Briefcase,
  GraduationCap,
  Download,
  AlertTriangle,
  CheckCircle2,
  PieChart,
  FileSpreadsheet,
  Layers,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  SECTOR_HEATMAP_DATA,
  INSTITUTE_AUDIT_DATA,
  GIDA_SKILLS
} from '../../data/mockData';
import { SampleDataBadge } from '../common/SampleDataBadge';
import { AudioReaderButton } from '../common/AudioReaderButton';

export const CommandCenter: React.FC = () => {
  const { directives, approveDirective, language } = useApp();
  const [activeDirectiveFeedback, setActiveDirectiveFeedback] = useState<string | null>(null);

  // Demand vs Supply Dataset for Key Trades
  const demandVsSupply = [
    { trade: 'CNC & VMC Machining', demandOpenings: 245, certifiedSupply: 110, gap: -135, severity: 'Severe' },
    { trade: 'Plastic Injection Mold', demandOpenings: 190, certifiedSupply: 95, gap: -95, severity: 'Severe' },
    { trade: 'PLC & Sensor Wiring', demandOpenings: 165, certifiedSupply: 120, gap: -45, severity: 'Moderate' },
    { trade: 'Quality Metrology (QA)', demandOpenings: 210, certifiedSupply: 160, gap: -50, severity: 'Moderate' },
    { trade: 'Transformer Coil Tech', demandOpenings: 140, certifiedSupply: 130, gap: -10, severity: 'Balanced' },
    { trade: 'Textile Looms Master', demandOpenings: 180, certifiedSupply: 90, gap: -90, severity: 'Severe' }
  ];

  // Executive KPIs
  const kpis = [
    { titleEn: 'Registered Technical Youth', titleHi: 'पंजीकृत तकनीकी युवा', value: '4,820', change: '+18% MoM', icon: <Users className="w-5 h-5 text-emerald-400" /> },
    { titleEn: 'Active GIDA Industrial Units', titleHi: 'सक्रिय गिडा औद्योगिक इकाइयां', value: '142', change: '+12 new', icon: <Building className="w-5 h-5 text-blue-400" /> },
    { titleEn: 'Verified Factory Openings', titleHi: 'सत्यापित फैक्ट्री रिक्तियां', value: '820', change: 'Sector 13 Hub', icon: <Briefcase className="w-5 h-5 text-purple-400" /> },
    { titleEn: 'Enrolled in ITI Roadmaps', titleHi: 'आईटीआई रोडमैप में नामांकित', value: '1,490', change: 'Govt ITI Centers', icon: <GraduationCap className="w-5 h-5 text-amber-400" /> },
    { titleEn: 'Verified Placements', titleHi: 'सत्यापित प्लेसमेंट', value: '648', change: 'Purvanchal Retained', icon: <CheckCircle2 className="w-5 h-5 text-teal-400" /> },
    { titleEn: 'Youth Migration Reduction', titleHi: 'युवा पलायन में कमी', value: '38.4%', change: 'GIDA Divas Goal', icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> }
  ];

  const handleApproveDirective = (id: string, title: string) => {
    approveDirective(id);
    setActiveDirectiveFeedback(title);
    setTimeout(() => setActiveDirectiveFeedback(null), 3500);
  };

  const handleExportCSV = () => {
    // Sanitize against CSV Formula Injection (OWASP A03 - Injection)
    const sanitizeCsvCell = (val: string | number) => {
      let str = String(val ?? '');
      // If cell begins with =, +, -, @, \t, or \r, prefix with a single quote to prevent formula execution
      if (/^[=\+\-@\t\r]/.test(str)) {
        str = "'" + str;
      }
      return `"${str.replace(/"/g, '""')}"`;
    };

    const headers = [
      'Sector',
      'CNC Machining Shortage',
      'Mold Tech Shortage',
      'PLC Wiring Shortage',
      'Quality Metrology Shortage',
      'Total Worker Gap',
      'Priority Intervention Directive'
    ];

    const rows = SECTOR_HEATMAP_DATA.map(d => [
      sanitizeCsvCell(d.sector),
      sanitizeCsvCell(d.cnc),
      sanitizeCsvCell(d.mold),
      sanitizeCsvCell(d.plc),
      sanitizeCsvCell(d.quality),
      sanitizeCsvCell(d.totalShortageWorkers),
      sanitizeCsvCell(d.priorityInterventionEn)
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GIDA_SkillGap_LabourReport_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getHeatmapColor = (level: string) => {
    switch (level) {
      case 'Severe':
        return 'bg-red-500/25 text-red-300 border-red-500/50 font-bold';
      case 'Moderate':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold';
      case 'Balanced':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-medium';
      default:
        return 'bg-navy-800 text-slate-300';
    }
  };

  const speechSummary =
    language === 'hi'
      ? `गिडा प्राधिकरण कमांड सेंटर। कुल पंजीकृत युवा 4,820, सक्रिय रिक्तियां 820, सत्यापित प्लेसमेंट 648। सेक्टर 13 में सीएनसी की गंभीर कमी और सेक्टर 27 में मोल्ड की गंभीर कमी पाई गई है।`
      : `GIDA Authority Command Center. 4,820 registered youth, 820 verified factory vacancies, 648 placements. Critical shortages identified in Sector 13 CNC Machining and Sector 27 Mold Tooling.`;

  return (
    <div className="space-y-6">
      
      {/* Top Command Banner */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                GIDA Authority Command Center · Portal 3
              </span>
              <SampleDataBadge />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? 'गिडा श्रम बाजार कमांड सेंटर एवं नीति निर्देश'
                  : 'Labour Market Command Center & Policy Directives'}
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'hi'
                ? 'गोरखपुर औद्योगिक विकास प्राधिकरण, यूपीएसडीएम और जिला प्रशासन हेतु वास्तविक समय डेटा विश्लेषण।'
                : 'Executive labour market intelligence, shortage heatmaps, policy directives, and institute audit for GIDA nodal officers.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <AudioReaderButton text={speechSummary} />
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{language === 'hi' ? 'सीएसवी रिपोर्ट डाउनलोड' : 'One-Click CSV Report'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row (6 metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider line-clamp-1">
                {language === 'hi' ? kpi.titleHi : kpi.titleEn}
              </span>
              {kpi.icon}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">{kpi.value}</div>
              <span className="text-[10px] font-semibold text-emerald-400 mt-1 block">
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sector Skill Gap Heatmap (As highlighted in the presentation slide!) */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-navy-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>{language === 'hi' ? 'सेक्टर कौशल अंतर हीटमैप' : 'Sector Skill Gap Heatmap (Shortage Hotspots)'}</span>
              </h3>
              <SampleDataBadge />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Matrix of industrial sectors against key trades, colour-coded to expose severe shortage hotspots.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 text-[11px] font-bold">
              Severe Shortage
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-semibold">
              Moderate
            </span>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-medium">
              Balanced
            </span>
          </div>
        </div>

        {/* Responsive Heatmap Matrix Table */}
        <div className="overflow-x-auto touch-scroll">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-navy-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-bold">GIDA Sector Hub</th>
                <th className="py-3 px-4 font-bold text-center">CNC Machining</th>
                <th className="py-3 px-4 font-bold text-center">Mold Tooling</th>
                <th className="py-3 px-4 font-bold text-center">PLC & Sensors</th>
                <th className="py-3 px-4 font-bold text-center">Quality Metrology</th>
                <th className="py-3 px-4 font-bold text-right">Worker Gap</th>
                <th className="py-3 px-4 font-bold">Priority Directive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/80">
              {SECTOR_HEATMAP_DATA.map(row => (
                <tr key={row.sector} className="hover:bg-navy-950/60 transition">
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                    {row.sector}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg border text-xs ${getHeatmapColor(row.cnc)}`}>
                      {row.cnc}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg border text-xs ${getHeatmapColor(row.mold)}`}>
                      {row.mold}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg border text-xs ${getHeatmapColor(row.plc)}`}>
                      {row.plc}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-lg border text-xs ${getHeatmapColor(row.quality)}`}>
                      {row.quality}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-red-400">
                    -{row.totalShortageWorkers}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 text-[11px] max-w-xs">
                    {language === 'hi' ? row.priorityInterventionHi : row.priorityInterventionEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demand vs Supply Chart & Shortage Directives Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Demand vs Supply (7 cols) */}
        <div className="lg:col-span-7 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800">
            <div>
              <h3 className="font-bold text-white text-base">
                {language === 'hi' ? 'मांग बनाम आपूर्ति (ओपन नौकरियां बनाम प्रमाणित युवा)' : 'Demand vs Supply (Factory Openings vs Certified Youth)'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Open jobs per skill compared against local youth certified at proficiency level 3 or above.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-red-400">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Factory Demand
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Certified Supply
              </span>
            </div>
          </div>

          <div className="space-y-3.5 pt-2">
            {demandVsSupply.map(item => {
              const maxVal = 280;
              const demandWidth = (item.demandOpenings / maxVal) * 100;
              const supplyWidth = (item.certifiedSupply / maxVal) * 100;

              return (
                <div key={item.trade} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{item.trade}</span>
                    <span className="font-mono text-red-400 font-bold">
                      Deficit: {item.gap} seats
                    </span>
                  </div>

                  <div className="space-y-1">
                    {/* Demand Bar */}
                    <div className="w-full bg-navy-950 rounded-full h-2 overflow-hidden flex">
                      <div
                        className="h-full bg-red-500 transition-all duration-500"
                        style={{ width: `${demandWidth}%` }}
                        title={`Demand: ${item.demandOpenings}`}
                      />
                    </div>

                    {/* Supply Bar */}
                    <div className="w-full bg-navy-950 rounded-full h-2 overflow-hidden flex">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${supplyWidth}%` }}
                        title={`Certified Supply: ${item.certifiedSupply}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Demand: {item.demandOpenings}</span>
                    <span>Certified Level ≥ 3: {item.certifiedSupply}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shortage Directives & Policy Engine (5 cols) */}
        <div className="lg:col-span-5 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="pb-3 border-b border-navy-800">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>{language === 'hi' ? 'नीतिगत हस्तक्षेप निर्देश' : 'Shortage Directives Engine'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Priority trades flagged with automated administrative directives for district sanction.
            </p>
          </div>

          <div className="space-y-3">
            {directives.map(dir => (
              <div
                key={dir.id}
                className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-white">
                    {language === 'hi' ? dir.titleHi : dir.titleEn}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      dir.status === 'Active Directive'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {dir.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Institute:</span>
                    <strong>{dir.targetInstitute}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Capacity:</span>
                    <strong className="text-emerald-400">{dir.targetSeats} Seats</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-navy-900 text-[11px]">
                  <span className="text-slate-400">{dir.allocatedBudget}</span>
                  {dir.status !== 'Active Directive' ? (
                    <button
                      onClick={() => handleApproveDirective(dir.id, dir.titleEn)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      Approve Directive
                    </button>
                  ) : (
                    <span className="text-emerald-400 font-semibold text-[10px]">
                      Sanctioned {dir.approvedDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {activeDirectiveFeedback && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs text-center border border-emerald-500/30">
              ✓ Directive "{activeDirectiveFeedback}" approved and dispatched to District Magistrate!
            </div>
          )}
        </div>

      </div>

      {/* Recruitment Funnel & Partner Institute Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recruitment Funnel (5 cols) */}
        <div className="lg:col-span-5 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base">
            {language === 'hi' ? 'भर्ती एवं कौशल फ़नल' : 'Employment & Skill Conversion Funnel'}
          </h3>

          <div className="space-y-3">
            {[
              { stage: 'Registered Youth', count: '4,820', pct: '100%', color: 'bg-blue-500' },
              { stage: 'Skill Gap Assessed', count: '3,650', pct: '75.7%', color: 'bg-indigo-500' },
              { stage: 'Enrolled in ITI Roadmap', count: '2,140', pct: '44.3%', color: 'bg-purple-500' },
              { stage: 'Shortlisted by Factories', count: '1,120', pct: '23.2%', color: 'bg-teal-500' },
              { stage: 'Hired & Retained in Purvanchal', count: '648', pct: '13.4%', color: 'bg-emerald-500' }
            ].map(f => (
              <div key={f.stage} className="p-3 rounded-xl bg-navy-950 border border-navy-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{f.stage}</span>
                  <span className="font-mono text-emerald-400 font-bold">{f.count} ({f.pct})</span>
                </div>
                <div className="w-full bg-navy-900 rounded-full h-2 overflow-hidden flex">
                  <div className={`h-full ${f.color}`} style={{ width: f.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Institute Audit Scorecard (7 cols) */}
        <div className="lg:col-span-7 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">
              {language === 'hi' ? 'संबद्ध संस्थान ऑडिट एवं प्लेसमेंट दर' : 'Partner Institute Audit & Placement Rates'}
            </h3>
            <span className="text-xs text-slate-400">Quarterly Audit 2026</span>
          </div>

          <div className="overflow-x-auto touch-scroll">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-navy-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Institute</th>
                  <th className="py-2.5 px-3">Flagship Trade</th>
                  <th className="py-2.5 px-3 text-right">Enrolled</th>
                  <th className="py-2.5 px-3 text-right">Placed</th>
                  <th className="py-2.5 px-3 text-right">Placement %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/80">
                {INSTITUTE_AUDIT_DATA.map(inst => (
                  <tr key={inst.instituteName} className="hover:bg-navy-950/60">
                    <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                      {inst.instituteName}
                      <span className="block text-[10px] text-slate-400 font-normal">{inst.location}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{inst.flagshipTrade}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{inst.enrolledStudents}</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold">{inst.activePlacements}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                      {inst.placementRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
