// Relational Database Engine for SkillBridge GIDA
// Provides schema definitions, seed generation, SQL DDL export, and LocalStorage persistence

export interface DatabaseSchema {
  tables: {
    name: string;
    description: string;
    columns: string[];
    recordCount: number;
    sampleData: any[];
  }[];
  generatedAt: string;
  version: string;
}

export const GIDA_RELATIONAL_TABLES = [
  {
    name: 'users',
    description: 'System credentials and authentication accounts managed by Clerk RBAC',
    columns: ['id (UUID PK)', 'email (VARCHAR)', 'role (ENUM: student, employer, nodal_officer)', 'created_at (TIMESTAMP)'],
    sampleData: [
      { id: 'usr_001', email: 'utkarsh.vishwakarma@bit.edu', role: 'student', created_at: '2026-11-20 09:30:00' },
      { id: 'usr_002', email: 'hr@gallantt.com', role: 'employer', created_at: '2026-11-15 11:00:00' },
      { id: 'usr_003', email: 'nodal.officer@gida.up.gov.in', role: 'nodal_officer', created_at: '2026-11-10 08:45:00' }
    ]
  },
  {
    name: 'student_profiles',
    description: 'Profiles for technical youth from ITIs and Polytechnics in Gorakhpur region',
    columns: ['user_id (UUID FK)', 'full_name (VARCHAR)', 'institute_name (VARCHAR)', 'trade (VARCHAR)', 'aadhaar_verified (BOOLEAN)', 'cmaps_stipend_opted (BOOLEAN)'],
    sampleData: [
      { user_id: 'usr_001', full_name: 'Utkarsh Vishwakarma', institute_name: 'Buddha Institute of Technology, Gorakhpur', trade: 'Mechanical & Automation Eng.', aadhaar_verified: true, cmaps_stipend_opted: true },
      { user_id: 'usr_004', full_name: 'Pooja Tiwari', institute_name: 'Govt ITI Sahjanwa', trade: 'Plastic Processing Operator', aadhaar_verified: true, cmaps_stipend_opted: true },
      { user_id: 'usr_005', full_name: 'Mohd. Imran Ansari', institute_name: 'Govt Polytechnic Gorakhpur', trade: 'Industrial Electrician', aadhaar_verified: true, cmaps_stipend_opted: true }
    ]
  },
  {
    name: 'employer_profiles',
    description: 'Manufacturing units registered in GIDA industrial corridors',
    columns: ['user_id (UUID FK)', 'company_name (VARCHAR)', 'sector_hub (VARCHAR)', 'gida_plot_no (VARCHAR)', 'gstin (VARCHAR)', 'active_workers (INT)'],
    sampleData: [
      { user_id: 'usr_002', company_name: 'Gallantt Ispat Limited', sector_hub: 'Sector 13 Heavy Engineering', gida_plot_no: 'Plot 1-4, Sec-13', gstin: '09AAACG1234F1Z5', active_workers: 1850 },
      { user_id: 'usr_006', company_name: 'Purvanchal Polymers Pvt Ltd', sector_hub: 'Sector 27 Plastic Park', gida_plot_no: 'Plot 42, Sec-27', gstin: '09AAACP5678K1Z2', active_workers: 420 },
      { user_id: 'usr_007', company_name: 'Ankur Transformers', sector_hub: 'Sector 15 Food and Transformers', gida_plot_no: 'Plot 18, Sec-15', gstin: '09AAAAT9012M1Z8', active_workers: 310 }
    ]
  },
  {
    name: 'benchmark_roles',
    description: 'Standardized job profiles mapped to GIDA factory requirements',
    columns: ['role_id (VARCHAR PK)', 'title_en (VARCHAR)', 'title_hi (VARCHAR)', 'sector (VARCHAR)', 'base_salary_inr (INT)'],
    sampleData: [
      { role_id: 'cnc_programmer_operator', title_en: 'CNC & VMC Programmer-Operator', title_hi: 'सीएनसी एवं वीएमसी प्रोग्रामर', sector: 'Sector 13', base_salary_inr: 22000 },
      { role_id: 'plastic_mold_technician', title_en: 'Plastic Injection Mold Technician', title_hi: 'प्लास्टिक मोल्ड तकनीशियन', sector: 'Sector 27', base_salary_inr: 20500 },
      { role_id: 'plc_automation_specialist', title_en: 'PLC Automation Specialist', title_hi: 'पीएलसी स्वचालन विशेषज्ञ', sector: 'Sector 15', base_salary_inr: 24000 }
    ]
  },
  {
    name: 'skills_master',
    description: 'Standardized 28 industrial competency standards (EN & HI)',
    columns: ['skill_id (VARCHAR PK)', 'name_en (VARCHAR)', 'name_hi (VARCHAR)', 'category (VARCHAR)'],
    sampleData: [
      { skill_id: 'cnc_gcode', name_en: 'CNC G-Code & M-Code Programming', name_hi: 'सीएनसी जी-कोड प्रोग्रामिंग', category: 'mechanical' },
      { skill_id: 'plastic_mold_tech', name_en: 'Plastic Injection Molding', name_hi: 'प्लास्टिक इंजेक्शन मोल्डिंग', category: 'plastics' },
      { skill_id: 'plc_ladder_logic', name_en: 'PLC Ladder Logic (Delta/Siemens)', name_hi: 'पीएलसी लैडर लॉजिक', category: 'electrical' },
      { skill_id: 'gdt_inspection', name_en: 'GD&T & Metrology (Vernier/CMM)', name_hi: 'जीडी एंड टी व मेट्रोलॉजी', category: 'quality' }
    ]
  },
  {
    name: 'job_postings',
    description: 'Active factory vacancies with CMAPS stipend eligibility',
    columns: ['job_id (VARCHAR PK)', 'company_name (VARCHAR)', 'title_en (VARCHAR)', 'sector (VARCHAR)', 'openings (INT)', 'stipend_salary (VARCHAR)', 'cmaps_eligible (BOOLEAN)'],
    sampleData: [
      { job_id: 'job_101', company_name: 'Gallantt Ispat Limited', title_en: 'CNC VMC Machine Operator', sector: 'Sector 13 Heavy Engineering', openings: 8, stipend_salary: '₹19,500 - ₹24,000 / mo', cmaps_eligible: true },
      { job_id: 'job_102', company_name: 'Purvanchal Polymers Pvt Ltd', title_en: 'Plastic Mold Setting Tech', sector: 'Sector 27 Plastic Park', openings: 5, stipend_salary: '₹18,000 - ₹22,500 / mo', cmaps_eligible: true },
      { job_id: 'job_103', company_name: 'Ankur Transformers', title_en: 'PLC Automation Electrician', sector: 'Sector 15 Food and Transformers', openings: 4, stipend_salary: '₹21,000 - ₹26,000 / mo', cmaps_eligible: true }
    ]
  },
  {
    name: 'job_applications',
    description: 'Tracking student applications, match scores, and interview funnel',
    columns: ['application_id (VARCHAR PK)', 'job_id (VARCHAR FK)', 'student_name (VARCHAR)', 'match_percentage (INT)', 'status (ENUM: Applied, Shortlisted, Interview, Hired)'],
    sampleData: [
      { application_id: 'app_001', job_id: 'job_101', student_name: 'Utkarsh Vishwakarma', match_percentage: 92, status: 'Shortlisted' },
      { application_id: 'app_002', job_id: 'job_102', student_name: 'Pooja Tiwari', match_percentage: 88, status: 'Interview' }
    ]
  },
  {
    name: 'industry_projects',
    description: 'Live industry challenges for students with verifiable certification',
    columns: ['project_id (VARCHAR PK)', 'company_name (VARCHAR)', 'title_en (VARCHAR)', 'duration_weeks (INT)', 'stipend (VARCHAR)', 'status (VARCHAR)'],
    sampleData: [
      { project_id: 'proj_201', company_name: 'Gallantt Ispat Limited', title_en: 'Slag Conveyor Sensor Interlocking', duration_weeks: 4, stipend: '₹6,000 / completion', status: 'In Progress' },
      { project_id: 'proj_202', company_name: 'Purvanchal Polymers Pvt Ltd', title_en: 'PET Preform Mold Cooling Optimization', duration_weeks: 3, stipend: '₹5,000 / completion', status: 'Open' }
    ]
  },
  {
    name: 'project_submissions',
    description: 'Submitted prototypes, code, and CAD models awaiting factory sign-off',
    columns: ['submission_id (VARCHAR PK)', 'project_id (VARCHAR FK)', 'student_name (VARCHAR)', 'repo_url (VARCHAR)', 'status (VARCHAR)', 'certificate_hash (VARCHAR)'],
    sampleData: [
      { submission_id: 'sub_001', project_id: 'proj_201', student_name: 'Utkarsh Vishwakarma', repo_url: 'https://github.com/utkarsh/gida-slag-interlock', status: 'Approved & Certified', certificate_hash: 'e7f29a0b12c84de9f34a8109bfbc99c5' }
    ]
  },
  {
    name: 'verifiable_certificates',
    description: 'Tamper-evident credentials issued by GIDA & Industry partners',
    columns: ['cert_id (VARCHAR PK)', 'verification_hash (SHA256)', 'recipient_name (VARCHAR)', 'trade (VARCHAR)', 'issue_date (DATE)', 'grade (VARCHAR)'],
    sampleData: [
      { cert_id: 'GIDA-2026-CERT-9A82F1', verification_hash: 'e7f29a0b12c84de9f34a8109bfbc99c5', recipient_name: 'Utkarsh Vishwakarma', trade: 'Mechanical & Automation Eng.', issue_date: '2026-11-20', grade: 'Distinction' }
    ]
  },
  {
    name: 'sector_heatmaps',
    description: 'Real-time skill shortage severity matrix across GIDA sectors',
    columns: ['sector (VARCHAR PK)', 'cnc_shortage (ENUM)', 'mold_shortage (ENUM)', 'plc_shortage (ENUM)', 'quality_shortage (ENUM)', 'worker_deficit (INT)'],
    sampleData: [
      { sector: 'Sector 13 Heavy Engineering', cnc_shortage: 'Severe', mold_shortage: 'Balanced', plc_shortage: 'Moderate', quality_shortage: 'Moderate', worker_deficit: 245 },
      { sector: 'Sector 27 Plastic Park', cnc_shortage: 'Moderate', mold_shortage: 'Severe', plc_shortage: 'Balanced', quality_shortage: 'Moderate', worker_deficit: 190 },
      { sector: 'Sector 15 Food & Transformers', cnc_shortage: 'Balanced', mold_shortage: 'Balanced', plc_shortage: 'Severe', quality_shortage: 'Moderate', worker_deficit: 165 },
      { sector: 'Sahjanwa Textile Park', cnc_shortage: 'Balanced', mold_shortage: 'Balanced', plc_shortage: 'Moderate', quality_shortage: 'Severe', worker_deficit: 210 }
    ]
  },
  {
    name: 'shortage_directives',
    description: 'Administrative policy sanctions dispatched to ITIs & UPSDM',
    columns: ['directive_id (VARCHAR PK)', 'title_en (VARCHAR)', 'target_institute (VARCHAR)', 'target_seats (INT)', 'budget_inr (VARCHAR)', 'status (VARCHAR)'],
    sampleData: [
      { directive_id: 'DIR-2026-01', title_en: 'Sanction 6-Week CNC G-Code Batch', target_institute: 'Govt ITI Sahjanwa', target_seats: 120, budget_inr: '₹14.5 Lakhs', status: 'Active Directive' },
      { directive_id: 'DIR-2026-02', title_en: 'Establish Plastic Park Mold Cell', target_institute: 'Govt ITI Chargawan', target_seats: 90, budget_inr: '₹18.0 Lakhs', status: 'Active Directive' }
    ]
  },
  {
    name: 'cmaps_disbursements',
    description: 'Direct Benefit Transfer (DBT) records for Chief Minister ₹1,000 stipend',
    columns: ['disbursement_id (VARCHAR PK)', 'student_name (VARCHAR)', 'factory_name (VARCHAR)', 'amount_inr (INT)', 'dbt_utr_no (VARCHAR)', 'transfer_date (DATE)'],
    sampleData: [
      { disbursement_id: 'DBT-2026-8812', student_name: 'Utkarsh Vishwakarma', factory_name: 'Gallantt Ispat Limited', amount_inr: 1000, dbt_utr_no: 'SBIUP2026112001', transfer_date: '2026-11-20' },
      { disbursement_id: 'DBT-2026-8813', student_name: 'Pooja Tiwari', factory_name: 'Purvanchal Polymers', amount_inr: 1000, dbt_utr_no: 'SBIUP2026112002', transfer_date: '2026-11-20' }
    ]
  }
];

export function generatePostgreSQLSchema(): string {
  return `-- ====================================================================
-- SKILLBRIDGE GIDA (कौशल सेतु गिडा) - POSTGRESQL / SUPABASE PRODUCTION SCHEMA
-- GIDA DIVAS HACKATHON 2026 · THEME 11: SKILL DEVELOPMENT & EMPLOYMENT
-- Presented by: Utkarsh Vishwakarma, Buddha Institute of Technology, Gorakhpur
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Authentication & Users Table (Clerk RBAC synced)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_user_id VARCHAR(128) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(32) NOT NULL CHECK (role IN ('student', 'employer', 'nodal_officer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Technical Youth & Student Profiles
CREATE TABLE IF NOT EXISTS public.student_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    institute_name VARCHAR(255) NOT NULL,
    trade VARCHAR(128) NOT NULL,
    passing_year INT NOT NULL,
    aadhaar_linked BOOLEAN DEFAULT TRUE,
    cmaps_opted BOOLEAN DEFAULT TRUE,
    overall_readiness_score INT DEFAULT 0
);

-- 3. GIDA Manufacturing Units / Employers
CREATE TABLE IF NOT EXISTS public.employer_profiles (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    sector_hub VARCHAR(128) NOT NULL,
    gida_plot_no VARCHAR(128) NOT NULL,
    gstin VARCHAR(64) NOT NULL,
    active_workforce INT DEFAULT 100,
    verified_by_gida BOOLEAN DEFAULT TRUE
);

-- 4. Benchmark Job Roles
CREATE TABLE IF NOT EXISTS public.benchmark_roles (
    role_id VARCHAR(64) PRIMARY KEY,
    title_en VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255) NOT NULL,
    sector VARCHAR(128) NOT NULL,
    average_salary VARCHAR(64)
);

-- 5. 28 GIDA Competency Skills Standard
CREATE TABLE IF NOT EXISTS public.skills_master (
    skill_id VARCHAR(64) PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_hi VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL
);

-- 6. Student Competency Assessments (Proficiency 1-5)
CREATE TABLE IF NOT EXISTS public.user_skill_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role_id VARCHAR(64) REFERENCES public.benchmark_roles(role_id),
    skill_id VARCHAR(64) REFERENCES public.skills_master(skill_id),
    proficiency_level INT CHECK (proficiency_level BETWEEN 1 AND 5),
    assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Factory Job Postings
CREATE TABLE IF NOT EXISTS public.job_postings (
    job_id VARCHAR(64) PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255) NOT NULL,
    sector VARCHAR(128) NOT NULL,
    stipend_salary VARCHAR(64) NOT NULL,
    openings INT NOT NULL DEFAULT 1,
    cmaps_eligible BOOLEAN DEFAULT TRUE,
    safety_protocols TEXT,
    posted_date DATE DEFAULT CURRENT_DATE
);

-- 8. Verifiable Certificates
CREATE TABLE IF NOT EXISTS public.verifiable_certificates (
    certificate_id VARCHAR(64) PRIMARY KEY,
    verification_hash VARCHAR(64) NOT NULL UNIQUE,
    recipient_name VARCHAR(255) NOT NULL,
    trade VARCHAR(128) NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    grade VARCHAR(32) NOT NULL,
    is_valid BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifiable_certificates ENABLE ROW LEVEL SECURITY;
`;
}
