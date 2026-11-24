import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Sliders,
  BookOpen,
  Briefcase,
  FileCode,
  MessageSquare,
  Sparkles,
  Share2,
  Award,
  BarChart3,
  CheckCircle2,
  Users,
  Search,
  Cpu,
  Database,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from './context/AppContext';
import { useAuth, UserRole } from './context/AuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CMPresentationBanner } from './components/common/CMPresentationBanner';
import { GidaDigitalTwin3D } from './components/3d/GidaDigitalTwin3D';
import { ClerkAuthModal } from './components/auth/ClerkAuthModal';
import { DatabaseManagerModal } from './components/database/DatabaseManagerModal';

import { SkillAssessment } from './components/student/SkillAssessment';
import { AIRoadmap12Week } from './components/student/AIRoadmap12Week';
import { JobMatching } from './components/student/JobMatching';
import { IndustryProjects } from './components/student/IndustryProjects';
import { KaushalyaChatbot } from './components/student/KaushalyaChatbot';

import { FactoryDashboard } from './components/industry/FactoryDashboard';
import { AIJobPoster } from './components/industry/AIJobPoster';
import { CandidateScouting } from './components/industry/CandidateScouting';
import { ProjectManager } from './components/industry/ProjectManager';

import { CommandCenter } from './components/admin/CommandCenter';
import { VerifiableCertificateModal } from './components/student/VerifiableCertificateModal';

export const AppContent: React.FC = () => {
  const { activeCertificateModal, setActiveCertificateModal, language } = useApp();
  const { currentUser, setAuthModalOpen } = useAuth();

  // 3D Canvas View Toggle
  const [show3D, setShow3D] = useState<boolean>(true);

  // Database Schema Modal
  const [dbModalOpen, setDbModalOpen] = useState<boolean>(false);

  // Sub-navigation state for Student Portal
  const [studentTab, setStudentTab] = useState<'assess' | 'roadmap' | 'jobs' | 'projects' | 'kaushalya'>('assess');
  
  // Sub-navigation state for Industry Portal
  const [industryTab, setIndustryTab] = useState<'dashboard' | 'post-job' | 'scout' | 'projects'>('dashboard');

  const [shareToast, setShareToast] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'SkillBridge GIDA | कौशल सेतु गिडा',
        text: 'AI-powered 3D skill gap discovery, apprenticeship & employment platform for GIDA Gorakhpur',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const userRole: UserRole = currentUser?.role || 'student';

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Header */}
      <Header
        onToggle3D={() => setShow3D(!show3D)}
        show3D={show3D}
        onOpenDatabase={() => setDbModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 space-y-6">
        
        {/* Executive UP CM Dignitary Presentation Banner */}
        <CMPresentationBanner onOpenDatabase={() => setDbModalOpen(true)} />

        {/* 3D GIDA Industrial Digital Twin (Three.js WebGL) */}
        {show3D && (
          <div className="space-y-2">
            <GidaDigitalTwin3D />
          </div>
        )}

        {/* Role Separation Notice Bar */}
        <div className="p-3.5 rounded-2xl bg-navy-900/90 border border-navy-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-400">
              <Lock className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-white block">
                {language === 'hi' ? 'सक्रिय आरबीएसी पोर्टल सत्र' : 'Isolated Role Portal (Clerk RBAC)'}:{' '}
                <span className="text-emerald-400">
                  {userRole === 'student' && 'Youth & Technical Student Portal (छात्र पोर्टल)'}
                  {userRole === 'employer' && 'GIDA Manufacturing & Factory Portal (उद्योग पोर्टल)'}
                  {userRole === 'nodal_officer' && 'GIDA Authority Command Center (कमांड सेंटर)'}
                </span>
              </span>
              <p className="text-[11px] text-slate-400">
                Logged in as <strong>{currentUser?.name}</strong>. Access is restricted exclusively to this persona.
              </p>
            </div>
          </div>

          <button
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-purple-300 font-bold border border-purple-500/30 transition self-start sm:self-auto"
          >
            <span>Switch Role Account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* =========================================================================
            PORTAL 1: STUDENT & TECHNICAL YOUTH PORTAL (Locked to role: 'student')
           ========================================================================= */}
        {userRole === 'student' && (
          <div className="space-y-6">
            {/* Sub-navigation Tabs */}
            <div className="flex items-center justify-between border-b border-navy-800 pb-3 gap-2 overflow-x-auto touch-scroll">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[
                  { id: 'assess', icon: <Sliders className="w-4 h-4" />, labelEn: '1. Skill Gap Assessment', labelHi: '1. कौशल अंतर आकलन' },
                  { id: 'roadmap', icon: <BookOpen className="w-4 h-4" />, labelEn: '2. 12-Week AI Roadmap', labelHi: '2. 12-सप्ताह एआई रोडमैप' },
                  { id: 'jobs', icon: <Briefcase className="w-4 h-4" />, labelEn: '3. Jobs with Match %', labelHi: '3. मैच % वाली नौकरियां' },
                  { id: 'projects', icon: <FileCode className="w-4 h-4" />, labelEn: '4. Industry Projects', labelHi: '4. लाइव प्रोजेक्ट्स' },
                  { id: 'kaushalya', icon: <MessageSquare className="w-4 h-4" />, labelEn: 'कौशल्या AI Guide', labelHi: 'कौशल्या एआई गाइड' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStudentTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      studentTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                        : 'bg-navy-900/60 hover:bg-navy-800 text-slate-400 hover:text-white border border-navy-800'
                    }`}
                  >
                    {tab.icon}
                    <span>{language === 'hi' ? tab.labelHi : tab.labelEn}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleShare}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-300 text-xs font-semibold border border-navy-800 transition flex-shrink-0"
                title="Share on WhatsApp or copy link"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'hi' ? 'शेयर करें' : 'WhatsApp Share'}</span>
              </button>
            </div>

            <div>
              {studentTab === 'assess' && (
                <SkillAssessment onNavigateToRoadmap={() => setStudentTab('roadmap')} />
              )}
              {studentTab === 'roadmap' && <AIRoadmap12Week />}
              {studentTab === 'jobs' && <JobMatching />}
              {studentTab === 'projects' && <IndustryProjects />}
              {studentTab === 'kaushalya' && <KaushalyaChatbot />}
            </div>
          </div>
        )}

        {/* =========================================================================
            PORTAL 2: GIDA INDUSTRY EMPLOYER PORTAL (Locked to role: 'employer')
           ========================================================================= */}
        {userRole === 'employer' && (
          <div className="space-y-6">
            {/* Sub-navigation Tabs */}
            <div className="flex items-center justify-between border-b border-navy-800 pb-3 gap-2 overflow-x-auto touch-scroll">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[
                  { id: 'dashboard', icon: <BarChart3 className="w-4 h-4" />, labelEn: 'Factory Dashboard', labelHi: 'फैक्ट्री डैशबोर्ड' },
                  { id: 'post-job', icon: <Sparkles className="w-4 h-4" />, labelEn: 'AI Job Poster', labelHi: 'एआई जॉब पोस्ट' },
                  { id: 'scout', icon: <Users className="w-4 h-4" />, labelEn: 'Scout ITI Talent', labelHi: 'प्रतिभा खोज (Scout)' },
                  { id: 'projects', icon: <Award className="w-4 h-4" />, labelEn: 'Sign-Off & Certificates', labelHi: 'प्रोजेक्ट साइन-ऑफ' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setIndustryTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                      industryTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-950/40'
                        : 'bg-navy-900/60 hover:bg-navy-800 text-slate-400 hover:text-white border border-navy-800'
                    }`}
                  >
                    {tab.icon}
                    <span>{language === 'hi' ? tab.labelHi : tab.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              {industryTab === 'dashboard' && (
                <FactoryDashboard
                  onNavigateToPostJob={() => setIndustryTab('post-job')}
                  onNavigateToScout={() => setIndustryTab('scout')}
                />
              )}
              {industryTab === 'post-job' && (
                <AIJobPoster onPublished={() => setIndustryTab('dashboard')} />
              )}
              {industryTab === 'scout' && <CandidateScouting />}
              {industryTab === 'projects' && <ProjectManager />}
            </div>
          </div>
        )}

        {/* =========================================================================
            PORTAL 3: GIDA AUTHORITY COMMAND CENTER (Locked to role: 'nodal_officer')
           ========================================================================= */}
        {userRole === 'nodal_officer' && (
          <div className="space-y-6">
            <CommandCenter />
          </div>
        )}

      </main>

      {/* Clerk Auth Modal */}
      <ClerkAuthModal />

      {/* Database Schema & Records Manager Modal */}
      <DatabaseManagerModal
        isOpen={dbModalOpen}
        onClose={() => setDbModalOpen(false)}
      />

      {/* Verifiable Certificate Modal */}
      <VerifiableCertificateModal
        certificate={activeCertificateModal}
        onClose={() => setActiveCertificateModal(null)}
      />

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Link copied to clipboard for WhatsApp sharing!</span>
        </div>
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};
