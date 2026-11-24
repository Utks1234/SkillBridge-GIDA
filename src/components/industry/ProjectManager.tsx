import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Users,
  PlusCircle,
  FileCode,
  Building,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SampleDataBadge } from '../common/SampleDataBadge';

export const ProjectManager: React.FC = () => {
  const {
    projects,
    submissions,
    approveProjectSubmission,
    selectedCompany,
    setActiveCertificateModal,
    language
  } = useApp();

  const companyProjects = projects.filter(p => p.companyName.includes(selectedCompany.split(' ')[0]));
  const companySubmissions = submissions.filter(s => {
    const proj = projects.find(p => p.id === s.projectId);
    return proj?.companyName.includes(selectedCompany.split(' ')[0]);
  });

  const getSafeUrl = (url: string): string => {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.href;
      }
    } catch {
      // not a valid URL
    }
    return '#';
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Industry-Academia
              </span>
              <SampleDataBadge />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? 'उद्योग प्रोजेक्ट प्रबंधन एवं प्रमाणन साइन-ऑफ'
                  : 'Industry Projects & Verifiable Certificate Sign-Off'}
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'hi'
                ? 'छात्र टीमों के समाधानों की तकनीकी समीक्षा करें, स्वीकृति दें और सीधे सत्यापन योग्य प्रमाण पत्र जारी करें।'
                : 'Post problem statements, accept student team submissions, and issue verifiable completion certificates on sign-off.'}
            </p>
          </div>
        </div>
      </div>

      {/* Submissions Pending Sign-off */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-white text-base">
          {language === 'hi' ? 'छात्र समाधान प्रस्तुतियां (साइन-ऑफ हेतु)' : 'Student Submissions for Technical Sign-Off'}
        </h3>

        {companySubmissions.length === 0 ? (
          <p className="text-xs text-slate-400">No submissions currently pending for {selectedCompany}.</p>
        ) : (
          <div className="space-y-4">
            {companySubmissions.map(sub => {
              const proj = projects.find(p => p.id === sub.projectId);
              const isApproved = sub.status === 'Approved & Certified';

              return (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 block">{proj?.titleEn}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {sub.studentName} ({sub.studentCollege})
                      </h4>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-bold w-fit ${
                        isApproved
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{sub.submissionNotes}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-navy-800/80 text-xs">
                    <a
                      href={getSafeUrl(sub.repoOrDriveUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>{sub.repoOrDriveUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-2">
                      {!isApproved ? (
                        <button
                          onClick={() => approveProjectSubmission(sub.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Sign-Off & Issue Certificate</span>
                        </button>
                      ) : (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verifiable Hash Issued</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
