# SkillBridge GIDA (कौशल सेतु गिडा)
### AI-Powered Skill Gap Discovery, Apprenticeship & Employment Platform
**Developed for GIDA DIVAS HACKATHON 2026 · THEME 11: Skill Development & Employment Generation**  
**Gorakhpur Industrial Development Authority (GIDA), Uttar Pradesh, India**  
**Presented by:** Buddha Institute of Technology (BIT), Gorakhpur  
**Project Lead:** Utkarsh Vishwakarma  

---

## 🏛️ Executive Summary & Problem Addressed
In Eastern Uttar Pradesh (Purvanchal), technical youth from ITIs and Polytechnics frequently migrate out of the region because industrial vacancies in local factories are opaque to them. Simultaneously, industrial units across GIDA (Sector 13 Heavy Engineering, Sector 27 Plastic Park, Sector 15 Food & Transformers, and Sahjanwa Textile Park) face acute shortages of certified CNC programmers, plastic injection mold technicians, industrial PLC electricians, and quality inspectors.

**SkillBridge GIDA** bridges this disconnect through an intelligent three-sided platform connecting:
1. **Rural & Semi-Urban Youth** (from Chargawan, Sahjanwa, Pipraich, Jungle Dhusan, Campierganj).
2. **GIDA Manufacturing Units** (Gallantt Ispat Ltd, Purvanchal Polymers Pvt Ltd, Ankur Transformers, CP Milk & Dairy, Sahjanwa PolyFab Mills).
3. **Institutes & District Administration** (Govt ITI Chargawan, Govt ITI Sahjanwa, Govt Polytechnic Gorakhpur, UPSDM, and GIDA Nodal Officers).

---

## 🚀 Key Features by Portal

### 1. 🎓 Student & Youth Portal (छात्र एवं युवा पोर्टल)
- **Interactive 1–5 Skill Gap Assessment:** Evaluate baseline competency against 10 GIDA benchmark roles with interactive SVG Radar Charts and Comparative Bar Charts.
- **Dynamic Readiness Ring:** Instant hiring readiness percentage calculated against industry requirements.
- **12-Week AI Learning Roadmap:** Tailored specifically to workshop facilities at **Govt ITI Chargawan** and **Govt ITI Sahjanwa**, with weekly practical lab exercises, theory modules, and milestone certifications.
- **Jobs with Match %:** Real-time percentage match score, missing-skill callouts, and one-click access to free bridge courses.
- **Chief Minister Apprenticeship Promotion Scheme (CMAPS):** Built-in highlighting for ₹1,000 extra monthly state stipend for apprentices.
- **Live Industry-Academia Projects:** Real factory problem statements from Gallantt Ispat and Purvanchal Polymers (solo or student team mode).
- **"कौशल्या" (Kaushalya) Bilingual AI Career Guide:** AI conversational chatbot with offline rule fallback answering questions on GIDA trades, CMAPS stipends, and factory technical interview preparation.
- **Web Speech Audio Reader:** Built-in audio readout in Hindi and English for accessible use on rural budget smartphones.
- **Verifiable PDF Competency Certificate:** Verifiable cryptographic hash (`SHA-256`), QR code, recipient details, and print/PDF download.

### 2. 🏭 GIDA Industry / Employer Portal (गिडा उद्योग पोर्टल)
- **Factory Dashboard:** Real-time tracking of active job postings, live projects, candidate funnels, and applicant rankings.
- **AI Job Description Writer:** Converts raw bullet points from plant heads into safety-compliant, trade-benchmarked, bilingual job descriptions.
- **Candidate Scouting:** Filter ITI/Polytechnic graduates by trade and assessed skill levels, and shortlist or invite candidates with instant notification simulations.
- **Industry–Academia Project Sign-Off:** Review student team prototypes, sign off deliverables, and issue verifiable digital certificates.

### 3. 🛡️ GIDA Authority Command Center (गिडा प्राधिकरण कमांड सेंटर)
- **Labour Market KPIs:** Live indicators for registered youth (4,820), active employers (142), open vacancies (820), enrolled ITI students (1,490), and placements (648).
- **Demand vs Supply Analytics:** Open vacancies per skill compared against youth certified at proficiency level 3 or higher.
- **Sector Skill Gap Heatmap:** Color-coded matrix (Severe, Moderate, Balanced) across GIDA sectors (Sector 13, 27, 15, Textile Park) and core trades (CNC, Mold, PLC, Quality).
- **Automated Policy Directives Engine:** Administrative directives with one-click approval (e.g. sanctioning a 6-week CNC G-Code batch at Govt ITI Sahjanwa).
- **Recruitment Funnel & Partner Institute Audit:** Tracks conversion from registration to local retention and audits placement rates across ITIs and colleges.
- **One-Click CSV Report Export:** Generates official reports formatted for District Magistrate and GIDA review meetings.

---

## 🛠️ Technology Stack
- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (Navy `#070d19` & Emerald `#10b981` palette inspired by GIDA Divas branding)
- **Mobile-First:** Fully responsive and tested for 360px viewports with touch-safe scrolling
- **Charts & Visualizations:** Native SVG Radar Charts, Circular Rings, Heatmap Matrices, and Funnel Visuals
- **AI Engine:** Claude-compatible interface with 100% offline rule-based fallback (zero external blocking dependencies)
- **Accessibility:** Web Speech API audio synthesis for Hindi and English

---

## 📦 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🏆 Hackathon Checklist Compliance
- [x] **Theme 11 Alignment:** Skill Development & Employment Generation in GIDA Gorakhpur
- [x] **All Three Portals Built:** Youth, Industry, and Authority Command Center
- [x] **Full Bilingual Support:** Complete English and हिन्दी localization toggle
- [x] **Sample Data Tagged:** Verified `नमूना डेटा / Sample Data` badge across all mock records
- [x] **Zero Hardcoded Secrets:** Safe, secure, and production ready
- [x] **Mobile First:** 360px ready layout with ≥44px touch targets
- [x] **Verifiable PDF Certificate:** Instant preview, print, and cryptographic hash verification

