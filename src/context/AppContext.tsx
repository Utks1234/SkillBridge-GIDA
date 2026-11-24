import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserRole,
  JobPosting,
  IndustryProject,
  ProjectSubmission,
  VerifiableCertificate,
  ShortageDirective,
  UserSkillAssessment
} from '../types';
import {
  GIDA_JOB_POSTINGS,
  GIDA_INDUSTRY_PROJECTS,
  GIDA_SHORTAGE_DIRECTIVES,
  SAMPLE_CERTIFICATES,
  GIDA_BENCHMARK_ROLES
} from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  audioActive: boolean;
  setAudioActive: (active: boolean) => void;
  speakText: (text: string, langOverride?: 'en' | 'hi') => void;
  stopSpeech: () => void;
  
  // Student Assessment State
  assessment: UserSkillAssessment;
  setSkillScore: (skillId: string, score: number) => void;
  setTargetRole: (roleId: string) => void;
  resetAssessment: () => void;
  
  // Jobs
  jobs: JobPosting[];
  appliedJobIds: string[];
  applyForJob: (jobId: string) => void;
  addJobPosting: (newJob: JobPosting) => void;

  // Industry Projects
  projects: IndustryProject[];
  submissions: ProjectSubmission[];
  submitProjectSolution: (submission: Omit<ProjectSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  approveProjectSubmission: (submissionId: string) => void;

  // Verifiable Certificates
  certificates: VerifiableCertificate[];
  issueCertificate: (cert: VerifiableCertificate) => void;
  activeCertificateModal: VerifiableCertificate | null;
  setActiveCertificateModal: (cert: VerifiableCertificate | null) => void;

  // Industry candidate scouting
  shortlistedCandidateIds: string[];
  toggleShortlistCandidate: (candidateId: string) => void;
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;

  // GIDA Authority Directives
  directives: ShortageDirective[];
  approveDirective: (directiveId: string) => void;
}

const defaultAssessment: UserSkillAssessment = {
  targetRoleId: 'cnc_programmer_operator',
  skillScores: {
    cnc_gcode: 3,
    cnc_vmc_operation: 3,
    cad_solidworks: 2,
    gdt_inspection: 3,
    industrial_safety_ppe: 4
  },
  lastUpdated: new Date().toISOString()
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');
  const [language, setLanguage] = useState<Language>('en');
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [assessment, setAssessment] = useState<UserSkillAssessment>(defaultAssessment);
  const [jobs, setJobs] = useState<JobPosting[]>(GIDA_JOB_POSTINGS);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(['job_gida_101']);
  const [projects, setProjects] = useState<IndustryProject[]>(GIDA_INDUSTRY_PROJECTS);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([
    {
      id: 'sub_1',
      projectId: 'proj_gida_201',
      studentName: 'Utkarsh Vishwakarma',
      studentCollege: 'Buddha Institute of Technology, Gorakhpur',
      submissionNotes: 'Completed ladder logic for Delta PLC with optical thermal sensor fail-safe and emergency sounder.',
      repoOrDriveUrl: 'https://github.com/skillbridge-gida/slag-interlock',
      submittedAt: '2026-11-20',
      status: 'Approved & Certified',
      certificateHash: 'e7f29a0b12c84de9f34a8109bfbc99c5'
    }
  ]);
  const [certificates, setCertificates] = useState<VerifiableCertificate[]>(SAMPLE_CERTIFICATES);
  const [activeCertificateModal, setActiveCertificateModal] = useState<VerifiableCertificate | null>(null);
  const [shortlistedCandidateIds, setShortlistedCandidateIds] = useState<string[]>(['cand_101']);
  const [selectedCompany, setSelectedCompany] = useState<string>('Gallantt Ispat Limited');
  const [directives, setDirectives] = useState<ShortageDirective[]>(GIDA_SHORTAGE_DIRECTIVES);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const speakText = (text: string, langOverride?: 'en' | 'hi') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langOverride || language;
    utterance.lang = targetLang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    setAudioActive(true);
    utterance.onend = () => setAudioActive(false);
    utterance.onerror = () => setAudioActive(false);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioActive(false);
  };

  const setSkillScore = (skillId: string, score: number) => {
    // Prevent Prototype Pollution
    if (skillId === '__proto__' || skillId === 'constructor' || skillId === 'prototype') return;

    setAssessment(prev => ({
      ...prev,
      skillScores: {
        ...prev.skillScores,
        [skillId]: Math.max(1, Math.min(5, score))
      },
      lastUpdated: new Date().toISOString()
    }));
  };

  const setTargetRole = (roleId: string) => {
    const roleDef = GIDA_BENCHMARK_ROLES.find(r => r.id === roleId);
    if (!roleDef) return;

    // Prefill required skills with initial levels if not present
    const newScores = { ...assessment.skillScores };
    roleDef.requiredSkills.forEach(req => {
      if (newScores[req.skillId] === undefined) {
        newScores[req.skillId] = 2; // initial baseline
      }
    });

    setAssessment({
      targetRoleId: roleId,
      skillScores: newScores,
      lastUpdated: new Date().toISOString()
    });
  };

  const resetAssessment = () => {
    setAssessment(defaultAssessment);
  };

  const applyForJob = (jobId: string) => {
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds(prev => [...prev, jobId]);
    }
  };

  const addJobPosting = (newJob: JobPosting) => {
    setJobs(prev => [newJob, ...prev]);
  };

  const submitProjectSolution = (sub: Omit<ProjectSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSub: ProjectSubmission = {
      ...sub,
      id: `sub_${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Pending Review'
    };
    setSubmissions(prev => [newSub, ...prev]);
  };

  const approveProjectSubmission = (submissionId: string) => {
    const sub = submissions.find(s => s.id === submissionId);
    if (!sub) return;

    const hash = 'hash_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    const proj = projects.find(p => p.id === sub.projectId);

    const newCert: VerifiableCertificate = {
      certificateId: `GIDA-2026-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
      verificationHash: hash,
      recipientName: sub.studentName,
      recipientCollege: sub.studentCollege,
      trade: proj?.sector || 'Industrial Technology',
      projectOrRoleTitle: proj?.titleEn || 'GIDA Industry Problem Statement',
      issuingCompany: proj?.companyName ? `${proj.companyName} & GIDA Authority` : 'GIDA Gorakhpur',
      issueDate: new Date().toISOString().split('T')[0],
      signatoryAuthority: 'Chief Executive Officer, GIDA & Project Review Board',
      skillsVerified: [
        'Hands-on Factory Problem Resolution',
        'Industrial Safety Protocols',
        'Technical Documentation & Bench Testing'
      ],
      grade: 'Distinction',
      isValid: true
    };

    setCertificates(prev => [newCert, ...prev]);
    setSubmissions(prev =>
      prev.map(s =>
        s.id === submissionId
          ? { ...s, status: 'Approved & Certified', certificateHash: hash }
          : s
      )
    );
    setActiveCertificateModal(newCert);
  };

  const issueCertificate = (cert: VerifiableCertificate) => {
    setCertificates(prev => [cert, ...prev]);
    setActiveCertificateModal(cert);
  };

  const toggleShortlistCandidate = (candidateId: string) => {
    setShortlistedCandidateIds(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const approveDirective = (directiveId: string) => {
    setDirectives(prev =>
      prev.map(d =>
        d.id === directiveId
          ? { ...d, status: 'Active Directive', approvedDate: new Date().toISOString().split('T')[0] }
          : d
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        toggleLanguage,
        audioActive,
        setAudioActive,
        speakText,
        stopSpeech,
        assessment,
        setSkillScore,
        setTargetRole,
        resetAssessment,
        jobs,
        appliedJobIds,
        applyForJob,
        addJobPosting,
        projects,
        submissions,
        submitProjectSolution,
        approveProjectSubmission,
        certificates,
        issueCertificate,
        activeCertificateModal,
        setActiveCertificateModal,
        shortlistedCandidateIds,
        toggleShortlistCandidate,
        selectedCompany,
        setSelectedCompany,
        directives,
        approveDirective
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
