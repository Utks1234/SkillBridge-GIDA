import React, { useState } from 'react';
import {
  FileCode,
  Users,
  CheckCircle2,
  Award,
  Clock,
  Sparkles,
  Send,
  Building,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AudioReaderButton } from '../common/AudioReaderButton';
import { SampleDataBadge } from '../common/SampleDataBadge';
import { IndustryProject } from '../../types';

export const IndustryProjects: React.FC = () => {
  const {
    projects,
    submissions,
    submitProjectSolution,
    setActiveCertificateModal,
    certificates,
    language
  } = useApp();

  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || '');
  const [studentName, setStudentName] = useState<string>('Utkarsh Vishwakarma');
  const [collegeName, setCollegeName] = useState<string>('Buddha Institute of Technology, Gorakhpur');
  const [submissionUrl, setSubmissionUrl] = useState<string>('https://github.com/skillbridge-gida/slag-interlock');
  const [notes, setNotes] = useState<string>('Completed ladder logic diagram for Delta PLC with fail-safe optical sensor interlocking.');
  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);

  const selectedProj = projects.find(p => p.id === activeProjectId) || projects[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !submissionUrl.trim()) return;

    submitProjectSolution({
      projectId: activeProjectId,
      studentName,
      studentCollege: collegeName,
      submissionNotes: notes,
      repoOrDriveUrl: submissionUrl
    });

    setSubmittedFeedback(true);
    setTimeout(() => setSubmittedFeedback(false), 4000);
  };

  const currentSubmission = submissions.find(s => s.projectId === activeProjectId);

  const getSafeUrl = (url: string): string => {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.href;
      }
    } catch {
      // invalid URL
    }
    return '#';
  };

  const speechText =
    language === 'hi'
      ? `उद्योग-अकादमिक लाइव प्रोजेक्ट: ${selectedProj.titleHi}। कंपनी: ${selectedProj.companyName}। स्टाइपेंड: ${selectedProj.stipendPerStudent}।`
      : `Industry-Academia Live Project: ${selectedProj.titleEn} at ${selectedProj.companyName}. Mentored by: ${selectedProj.mentorName}.`;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-navy-900 border border-navy-700/80 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {language === 'hi' ? 'चरण 04: उद्योग लाइव प्रोजेक्ट' : 'Step 04: Live Industry Project'}
              </span>
              <SampleDataBadge />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
              <FileCode className="w-6 h-6 text-emerald-400" />
              <span>
                {language === 'hi'
                  ? 'गिडा उद्योग-अकादमिक लाइव प्रोजेक्ट्स'
                  : 'Live Factory Problem Statements & Certifications'}
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {language === 'hi'
                ? 'गैलेंट इस्पात, पूर्वांचल पॉलिमर्स की वास्तविक समस्याओं को हल करें और सत्यापन योग्य प्रमाण पत्र अर्जित करें।'
                : 'Solve real factory problem statements from Gallantt Ispat & Purvanchal Polymers and earn verifiable individual certificates.'}
            </p>
          </div>

          <AudioReaderButton text={speechText} />
        </div>
      </div>

      {/* Main Grid: Projects List & Active Project Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Problem Statements Selector */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            {language === 'hi' ? 'सक्रिय फैक्ट्री चुनौतियां:' : 'Active Industry Problem Statements:'}
          </span>

          {projects.map(proj => {
            const isSelected = proj.id === activeProjectId;
            const hasSubmission = submissions.some(s => s.projectId === proj.id);

            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectId(proj.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-navy-900 border-emerald-500 shadow-lg shadow-emerald-950/40'
                    : 'bg-navy-950/70 border-navy-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {proj.companyName}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-navy-800 text-slate-300">
                    {proj.durationWeeks} Weeks
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-1">
                  {language === 'hi' ? proj.titleHi : proj.titleEn}
                </h4>

                <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                  <span>{proj.stipendPerStudent}</span>
                  {hasSubmission && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {language === 'hi' ? 'जमा किया' : 'Submitted'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column (7 cols): Project Specs & Submission Form */}
        <div className="lg:col-span-7 bg-navy-900 border border-navy-700/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
          <div className="border-b border-navy-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">{selectedProj.companyName}</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">{selectedProj.sector}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              {language === 'hi' ? selectedProj.titleHi : selectedProj.titleEn}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              <strong>Mentor:</strong> {selectedProj.mentorName} | <strong>Max Team Size:</strong> {selectedProj.teamSizeMax} students
            </p>
          </div>

          {/* Problem Statement & Deliverable */}
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
              <strong className="text-emerald-400 block font-semibold text-xs uppercase tracking-wider">
                {language === 'hi' ? 'समस्या विवरण' : 'Industry Problem Statement'}:
              </strong>
              <p className="text-slate-300 leading-relaxed">
                {language === 'hi' ? selectedProj.problemStatementHi : selectedProj.problemStatementEn}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-800 space-y-1">
              <strong className="text-blue-400 block font-semibold text-xs uppercase tracking-wider">
                {language === 'hi' ? 'अपेक्षित परिणाम (Deliverable)' : 'Expected Technical Deliverable'}:
              </strong>
              <p className="text-slate-300 leading-relaxed">
                {language === 'hi' ? selectedProj.expectedDeliverableHi : selectedProj.expectedDeliverableEn}
              </p>
            </div>
          </div>

          {/* Existing Submission Status / Form */}
          {currentSubmission ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {language === 'hi' ? 'प्रोजेक्ट जमा स्थिति' : 'Project Submission Status'}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500 text-white">
                  {currentSubmission.status}
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <p><strong>Student/Team:</strong> {currentSubmission.studentName} ({currentSubmission.studentCollege})</p>
                {currentSubmission.teamMembers && (
                  <p><strong>Members:</strong> {currentSubmission.teamMembers.join(', ')}</p>
                )}
                <p><strong>Notes:</strong> {currentSubmission.submissionNotes}</p>
                <p className="font-mono text-emerald-300">
                  <strong>Repository:</strong> {currentSubmission.repoOrDriveUrl}
                </p>
              </div>

              {/* View Certificate Button if Approved */}
              {currentSubmission.status === 'Approved & Certified' && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const cert = certificates[0];
                      if (cert) setActiveCertificateModal(cert);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50"
                  >
                    <Award className="w-4 h-4" />
                    <span>
                      {language === 'hi'
                        ? 'सत्यापन योग्य प्रमाण पत्र देखें (PDF)'
                        : 'View Verifiable Certificate (PDF)'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {language === 'hi' ? 'प्रोजेक्ट समाधान जमा करें' : 'Submit Project Solution / Prototype'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'hi' ? 'छात्र का नाम (Student Name)' : 'Student Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {language === 'hi' ? 'कॉलेज / आईटीआई' : 'College / ITI Institute'}
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={e => setCollegeName(e.target.value)}
                    className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {language === 'hi' ? 'गिटहब या गूगल ड्राइव लिंक (रिपोर्ट / सीएडी / कोड)' : 'GitHub or Google Drive Link (Report / CAD / Code)'}
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/... or https://github.com/..."
                  value={submissionUrl}
                  onChange={e => setSubmissionUrl(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {language === 'hi' ? 'समाधान का सारांश' : 'Technical Solution Notes'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>
                  {language === 'hi'
                    ? 'समाधान जमा करें एवं समीक्षा हेतु भेजें'
                    : 'Submit Solution for Factory Sign-Off'}
                </span>
              </button>

              {submittedFeedback && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs text-center border border-emerald-500/30">
                  {language === 'hi'
                    ? 'समाधान सफलतापूर्वक जमा किया गया! उद्योग समीक्षा के बाद प्रमाण पत्र जारी किया जाएगा।'
                    : 'Solution submitted successfully! Verifiable certificate will be issued upon factory sign-off.'}
                </div>
              )}
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
