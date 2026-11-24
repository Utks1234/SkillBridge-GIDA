export type Language = 'en' | 'hi';
export type UserRole = 'student' | 'industry' | 'admin';

export interface Skill {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'mechanical' | 'electrical' | 'plastics' | 'process' | 'quality' | 'safety';
  descriptionEn: string;
  descriptionHi: string;
}

export interface BenchmarkRole {
  id: string;
  titleEn: string;
  titleHi: string;
  sector: string;
  department: string;
  descriptionEn: string;
  descriptionHi: string;
  averageSalary: string;
  requiredSkills: {
    skillId: string;
    benchmarkLevel: number; // 1 to 5
    criticality: 'core' | 'preferred';
  }[];
}

export interface UserSkillAssessment {
  targetRoleId: string;
  skillScores: Record<string, number>; // skillId -> 1..5
  lastUpdated: string;
}

export interface JobPosting {
  id: string;
  titleEn: string;
  titleHi: string;
  companyName: string;
  sector: 'Sector 13 Heavy Engineering' | 'Sector 27 Plastic Park' | 'Sector 15 Food and Transformers' | 'Sahjanwa Textile Park';
  location: string;
  stipendSalary: string;
  type: 'Apprenticeship (NATS/CMAPS)' | 'Full-Time Employment' | 'Diploma Trainee';
  cmapsEligible: boolean; // ₹1000 UP CMAPS stipend addition
  openings: number;
  descriptionEn: string;
  descriptionHi: string;
  safetyCompliance: string;
  requiredSkills: {
    skillId: string;
    minLevel: number;
  }[];
  postedDate: string;
  deadline: string;
  isSampleData: boolean;
}

export interface IndustryProject {
  id: string;
  titleEn: string;
  titleHi: string;
  companyName: string;
  sector: string;
  problemStatementEn: string;
  problemStatementHi: string;
  expectedDeliverableEn: string;
  expectedDeliverableHi: string;
  durationWeeks: number;
  teamSizeMax: number;
  stipendPerStudent?: string;
  mentorName: string;
  status: 'Open for Applications' | 'In Progress' | 'Completed';
  submissionsCount: number;
  isSampleData: boolean;
}

export interface ProjectSubmission {
  id: string;
  projectId: string;
  studentName: string;
  studentCollege: string;
  teamMembers?: string[];
  submissionNotes: string;
  repoOrDriveUrl: string;
  submittedAt: string;
  status: 'Pending Review' | 'Approved & Certified' | 'Needs Revision';
  certificateHash?: string;
}

export interface VerifiableCertificate {
  certificateId: string;
  verificationHash: string;
  recipientName: string;
  recipientCollege: string;
  trade: string;
  projectOrRoleTitle: string;
  issuingCompany: string;
  issueDate: string;
  signatoryAuthority: string;
  skillsVerified: string[];
  grade: 'Distinction' | 'Merit' | 'Proficient';
  isValid: boolean;
}

export interface RoadmapWeek {
  week: number;
  titleEn: string;
  titleHi: string;
  instituteLocation: string; // "Govt ITI Chargawan" or "Govt ITI Sahjanwa"
  practicalLabEn: string;
  practicalLabHi: string;
  theoryModuleEn: string;
  theoryModuleHi: string;
  onlineResourceTitle: string;
  onlineResourceUrl: string;
  milestoneOutcome: string;
  isCompleted?: boolean;
}

export interface SectorHeatmapData {
  sector: string;
  shortName: string;
  cnc: 'Severe' | 'Moderate' | 'Balanced';
  mold: 'Severe' | 'Moderate' | 'Balanced';
  plc: 'Severe' | 'Moderate' | 'Balanced';
  quality: 'Severe' | 'Moderate' | 'Balanced';
  totalShortageWorkers: number;
  priorityInterventionEn: string;
  priorityInterventionHi: string;
}

export interface ShortageDirective {
  id: string;
  titleEn: string;
  titleHi: string;
  targetInstitute: string;
  trade: string;
  duration: string;
  targetSeats: number;
  allocatedBudget: string;
  status: 'Active Directive' | 'Under Review' | 'Completed';
  approvedDate: string;
}

export interface InstituteAudit {
  instituteName: string;
  location: string;
  enrolledStudents: number;
  certifiedCount: number;
  activePlacements: number;
  placementRate: number;
  flagshipTrade: string;
}
