import {
  Skill,
  BenchmarkRole,
  JobPosting,
  IndustryProject,
  SectorHeatmapData,
  ShortageDirective,
  InstituteAudit,
  VerifiableCertificate
} from '../types';

export const GIDA_SKILLS: Skill[] = [
  {
    id: 'cnc_gcode',
    nameEn: 'CNC G-Code & M-Code Programming',
    nameHi: 'सीएनसी जी-कोड एवं एम-कोड प्रोग्रामिंग',
    category: 'mechanical',
    descriptionEn: 'Manual and CAM-assisted G/M code generation for Fanuc, Siemens, and Haas controllers.',
    descriptionHi: 'फैनुक, सीमेंस और हास कंट्रोलर्स के लिए मैनुअल और सीएएम आधारित जी/एम कोड।'
  },
  {
    id: 'cnc_vmc_operation',
    nameEn: 'VMC Machine Setup & Tool Offsets',
    nameHi: 'वीएमसी मशीन सेटअप और टूल ऑफसेट',
    category: 'mechanical',
    descriptionEn: 'Workpiece zero setting, tool length/radius compensation, and clamping fixtures.',
    descriptionHi: 'वर्कपीस जीरो सेटिंग, टूल लंबाई/त्रिज्या ऑफसेट और क्लैंपिंग फिक्स्चर।'
  },
  {
    id: 'cad_solidworks',
    nameEn: 'CAD/CAM (AutoCAD & SolidWorks)',
    nameHi: 'सीएडी/सीएएम (ऑटोकैड और सॉलिडवर्क्स)',
    category: 'mechanical',
    descriptionEn: '2D drafting, 3D part modeling, and toolpath simulation.',
    descriptionHi: '2डी ड्राफ्टिंग, 3डी पार्ट मॉडलिंग और टूलपाथ सिमुलेशन।'
  },
  {
    id: 'plastic_mold_tech',
    nameEn: 'Plastic Injection Molding Operations',
    nameHi: 'प्लास्टिक इंजेक्शन मोल्डिंग संचालन',
    category: 'plastics',
    descriptionEn: 'Barrel temperature profiling, injection pressure, back-pressure and cycle time tuning.',
    descriptionHi: 'बैरल तापमान, इंजेक्शन दबाव, बैक-प्रेशर और साइकिल समय का समायोजन।'
  },
  {
    id: 'mold_maintenance',
    nameEn: 'Mold Setting & Preventative Maintenance',
    nameHi: 'मोल्ड सेटिंग एवं रखरखाव',
    category: 'plastics',
    descriptionEn: 'Core/cavity alignment, ejection pin lubrication, runner cleaning and degassing.',
    descriptionHi: 'कोर/कैविटी संरेखण, इजेक्टर पिन स्नेहन और रनर सफाई।'
  },
  {
    id: 'plc_ladder_logic',
    nameEn: 'PLC Ladder Logic (Delta / Siemens)',
    nameHi: 'पीएलसी लैडर लॉजिक (डेल्टा / सीमेंस)',
    category: 'electrical',
    descriptionEn: 'Timers, counters, compare blocks, and sequence automation programming.',
    descriptionHi: 'टाइमर, काउंटर, तुलना ब्लॉक और स्वचालित अनुक्रम प्रोग्रामिंग।'
  },
  {
    id: 'sensor_wiring',
    nameEn: 'Industrial Sensors & Relay Wiring',
    nameHi: 'औद्योगिक सेंसर और रिले वायरिंग',
    category: 'electrical',
    descriptionEn: 'Proximity, optical, thermocouple sensors, and 24VDC control relay circuits.',
    descriptionHi: 'प्रॉक्सिमिटी, ऑप्टिकल, थर्मोकपल सेंसर और 24VDC नियंत्रण रिले सर्किट।'
  },
  {
    id: 'vfd_drives',
    nameEn: 'VFD Parameter Tuning & Motor Control',
    nameHi: 'वीएफडी पैरामीटर ट्यूनिंग और मोटर नियंत्रण',
    category: 'electrical',
    descriptionEn: 'Variable Frequency Drive frequency ramps, torque curves, and 3-phase AC motor interfacing.',
    descriptionHi: 'वीएफडी रैंप, टॉर्क कर्व और 3-फेज एसी मोटर नियंत्रण।'
  },
  {
    id: 'gdt_inspection',
    nameEn: 'GD&T & Precision Metrology',
    nameHi: 'जीडी एंड टी और सटीक मेट्रोलॉजी',
    category: 'quality',
    descriptionEn: 'Geometric dimensioning, Vernier calipers, micrometers, dial gauges, height gauges.',
    descriptionHi: 'वर्नियर कैलीपर्स, माइक्रोमीटर, डायल गेज और ज्यामितीय टॉलरेंस माप।'
  },
  {
    id: 'cmm_testing',
    nameEn: 'CMM (Coordinate Measuring Machine)',
    nameHi: 'सीएमएम परीक्षण संचालन',
    category: 'quality',
    descriptionEn: 'Automated 3D probe measuring, surface roughness testing, and dimensional reports.',
    descriptionHi: 'स्वचालित 3डी प्रोब माप और आयामी निरीक्षण रिपोर्ट।'
  },
  {
    id: 'spc_qc_tools',
    nameEn: 'Statistical Process Control (SPC & 7 QC)',
    nameHi: 'एसपीसी और 7 गुणवत्ता नियंत्रण उपकरण',
    category: 'quality',
    descriptionEn: 'Control charts, Pareto analysis, Ishikawa diagrams, and Cp/Cpk calculation.',
    descriptionHi: 'कंट्रोल चार्ट, पारेतो विश्लेषण, फिशबोन आरेख और क्षमता सूचकांक।'
  },
  {
    id: 'transformer_winding',
    nameEn: 'Transformer HT/LT Coil Winding',
    nameHi: 'ट्रांसफार्मर एचटी/एलटी कॉइल वाइंडिंग',
    category: 'electrical',
    descriptionEn: 'Copper/aluminum strip winding, insulation paper interleaving, and impedance testing.',
    descriptionHi: 'कॉपर/एल्यूमीनियम स्ट्रिप वाइंडिंग, इंसुलेशन पेपर और इम्पीडेंस परीक्षण।'
  },
  {
    id: 'transformer_testing',
    nameEn: 'Transformer Core Assembly & Oil Testing',
    nameHi: 'ट्रांसफार्मर कोर असेंबली और तेल परीक्षण',
    category: 'electrical',
    descriptionEn: 'CRGO lamination stacking, Megger insulation test, and breakdown voltage (BDV) check.',
    descriptionHi: 'सीआरजीओ लैमिनेशन स्टैकिंग, मेगर इंसुलेशन टेस्ट और बीडीवी तेल परीक्षण।'
  },
  {
    id: 'tig_mig_welding',
    nameEn: 'TIG & MIG Heavy Steel Welding',
    nameHi: 'टीआईजी एवं एमआईजी भारी स्टील वेल्डिंग',
    category: 'mechanical',
    descriptionEn: 'Shielding gas regulation (Argon/CO2), root pass penetration, and structural joints.',
    descriptionHi: 'आर्गन/CO2 गैस विनियमन, रूट पास पेनेट्रेशन और संरचनात्मक जोड़ों की वेल्डिंग।'
  },
  {
    id: 'hydraulic_circuits',
    nameEn: 'Hydraulic Valves & Pressure Circuits',
    nameHi: 'हाइड्रोलिक वाल्व और प्रेशर सर्किट',
    category: 'mechanical',
    descriptionEn: 'Directional control valves, pressure relief settings, and hydraulic pump repairs.',
    descriptionHi: 'दिशात्मक नियंत्रण वाल्व, दबाव राहत वाल्व और पंप रखरखाव।'
  },
  {
    id: 'food_safety_haccp',
    nameEn: 'Food Safety, CIP & HACCP Standards',
    nameHi: 'खाद्य सुरक्षा, सीआईपी और एचएसीसीपी मानक',
    category: 'process',
    descriptionEn: 'Clean-In-Place sanitation cycles, pasteurizer temperature logging, FSSAI hygiene.',
    descriptionHi: 'सीआईपी स्वच्छता चक्र, पाश्चराइजर तापमान रिकॉर्डिंग और एफएसएसएआई स्वच्छता नियम।'
  },
  {
    id: 'dairy_homogenizer',
    nameEn: 'Dairy Homogenizer & Packing Machine',
    nameHi: 'डेयरी होमोजिनाइज़र और पैकिंग मशीन',
    category: 'process',
    descriptionEn: 'Milk pouch form-fill-seal machines, sealing jaw heaters, and pneumatic dosing.',
    descriptionHi: 'दूध पाउच फॉर्म-फिल-सील मशीन, सीलिंग हीटर और न्यूमेटिक डोजिंग।'
  },
  {
    id: 'boiler_operation',
    nameEn: 'Industrial Boiler Operation & Water Quality',
    nameHi: 'औद्योगिक बॉयलर संचालन और जल गुणवत्ता',
    category: 'process',
    descriptionEn: 'Steam drum pressure maintenance, flue gas dampers, softener TDS testing.',
    descriptionHi: 'स्टीम ड्रम प्रेशर नियंत्रण, फ्लू गैस डैम्पर्स और सॉफ्टनर टीडीएस टेस्टिंग।'
  },
  {
    id: 'textile_loom_setup',
    nameEn: 'Rapier & Airjet Loom Maintenance',
    nameHi: 'रेपियर और एयरजेट लूम रखरखाव',
    category: 'mechanical',
    descriptionEn: 'Warp yarn tensioning, weft insertion timing, heald frame alignment, drop pins.',
    descriptionHi: 'ताना-बाना तनाव नियंत्रण, वेफ्ट इंसर्शन और हील्ड फ्रेम संरेखण।'
  },
  {
    id: 'textile_weaving_quality',
    nameEn: 'Fabric Defect Inspection & GSM Check',
    nameHi: 'कपड़ा दोष निरीक्षण और जीएसएम जांच',
    category: 'quality',
    descriptionEn: 'Weaving slub detection, 4-point fabric inspection, and GSM weighing balance.',
    descriptionHi: 'कपड़े के दोष, 4-बिंदु निरीक्षण प्रणाली और जीएसएम वजन गणना।'
  },
  {
    id: 'industrial_safety_ppe',
    nameEn: 'Industrial Safety & Fire Protocols',
    nameHi: 'औद्योगिक सुरक्षा एवं अग्नि सुरक्षा नियम',
    category: 'safety',
    descriptionEn: 'Lockout-Tagout (LOTO), hazardous gas detectors, fire extinguisher ABC handling.',
    descriptionHi: 'लॉकआउट-टैगआउट (LOTO), गैस डिटेक्टर और अग्नि सुरक्षा प्रोटोकॉल।'
  },
  {
    id: '5s_kaizen',
    nameEn: '5S Shopfloor & Kaizen Practices',
    nameHi: '5S शॉपफ्लोर और काइज़न अभ्यास',
    category: 'safety',
    descriptionEn: 'Sort, Set in order, Shine, Standardize, Sustain, and visual workflow tagging.',
    descriptionHi: 'सॉर्ट, सेट इन ऑर्डर, शाइन, मानकीकरण और 5S विज़ुअल प्रबंधन।'
  }
];

export const GIDA_BENCHMARK_ROLES: BenchmarkRole[] = [
  {
    id: 'cnc_programmer_operator',
    titleEn: 'CNC & VMC Programmer-Operator',
    titleHi: 'सीएनसी एवं वीएमसी प्रोग्रामर-ऑपरेटर',
    sector: 'Sector 13 Heavy Engineering',
    department: 'Machine Shop',
    descriptionEn: 'Responsible for machining precision steel and iron components for Gallantt Ispat and heavy engineering units.',
    descriptionHi: 'गैलेंट इस्पात और भारी इंजीनियरिंग इकाइयों के लिए सटीक स्टील घटकों के मशीनिंग कार्य का उत्तरदायित्व।',
    averageSalary: '₹18,000 - ₹26,000 / month',
    requiredSkills: [
      { skillId: 'cnc_gcode', benchmarkLevel: 4, criticality: 'core' },
      { skillId: 'cnc_vmc_operation', benchmarkLevel: 5, criticality: 'core' },
      { skillId: 'cad_solidworks', benchmarkLevel: 3, criticality: 'preferred' },
      { skillId: 'gdt_inspection', benchmarkLevel: 4, criticality: 'core' },
      { skillId: 'industrial_safety_ppe', benchmarkLevel: 4, criticality: 'core' },
    ]
  },
  {
    id: 'plastic_mold_technician',
    titleEn: 'Plastic Injection Mold Technician',
    titleHi: 'प्लास्टिक इंजेक्शन मोल्ड तकनीशियन',
    sector: 'Sector 27 Plastic Park',
    department: 'Tool Room & Molding',
    descriptionEn: 'Sets up high-tonnage injection molding machines, tunes thermal cycles, and ensures zero defect plastic packaging.',
    descriptionHi: 'हाई-टन भार इंजेक्शन मोल्डिंग मशीनों का सेटअप, तापमान चक्र नियंत्रण और पैकेजिंग उत्पादन।',
    averageSalary: '₹17,000 - ₹24,000 / month',
    requiredSkills: [
      { skillId: 'plastic_mold_tech', benchmarkLevel: 5, criticality: 'core' },
      { skillId: 'mold_maintenance', benchmarkLevel: 4, criticality: 'core' },
      { skillId: 'hydraulic_circuits', benchmarkLevel: 3, criticality: 'preferred' },
      { skillId: 'gdt_inspection', benchmarkLevel: 3, criticality: 'core' },
      { skillId: '5s_kaizen', benchmarkLevel: 4, criticality: 'preferred' },
    ]
  },
  {
    id: 'plc_automation_specialist',
    titleEn: 'Industrial Automation & PLC Wiring Specialist',
    titleHi: 'औद्योगिक स्वचालन एवं पीएलसी वायरिंग विशेषज्ञ',
    sector: 'Sector 15 Food and Transformers',
    department: 'Electrical Maintenance',
    descriptionEn: 'Programs PLC control panels, troubleshoots automation sensors, and maintains continuous automated production lines.',
    descriptionHi: 'पीएलसी नियंत्रण पैनल प्रोग्रामिंग, सेंसर फॉल्ट फाइंडिंग और निरंतर स्वचालित असेंबली लाइनों का रखरखाव।',
    averageSalary: '₹20,000 - ₹28,000 / month',
    requiredSkills: [
      { skillId: 'plc_ladder_logic', benchmarkLevel: 4, criticality: 'core' },
      { skillId: 'sensor_wiring', benchmarkLevel: 5, criticality: 'core' },
      { skillId: 'vfd_drives', benchmarkLevel: 4, criticality: 'core' },
      { skillId: 'industrial_safety_ppe', benchmarkLevel: 4, criticality: 'core' },
    ]
  },
  {
    id: 'quality_assurance_inspector',
    titleEn: 'QA/QC Mechanical & Metrology Inspector',
    titleHi: 'क्यूए/क्यूसी मैकेनिकल और मेट्रोलॉजी निरीक्षक',
    sector: 'Sector 13 Heavy Engineering',
    department: 'Quality Assurance',
    descriptionEn: 'Conducts dimensional inspections with verniers, micrometers, and CMM, ensuring compliance with ISO and BIS standards.',
    descriptionHi: 'वर्नियर, माइक्रोमीटर और सीएमएम से आयामी निरीक्षण और आईएसओ मानकों का अनुपालन।',
    averageSalary: '₹16,500 - ₹23,000 / month',
    requiredSkills: [
      { skillId: 'gdt_inspection', benchmarkLevel: 5, criticality: 'core' },
      { skillId: 'cmm_testing', benchmarkLevel: 3, criticality: 'core' },
      { skillId: 'spc_qc_tools', benchmarkLevel: 4, criticality: 'core' },
      { skillId: '5s_kaizen', benchmarkLevel: 4, criticality: 'preferred' },
    ]
  },
  {
    id: 'transformer_coil_technician',
    titleEn: 'Transformer Coil Winding & Testing Tech',
    titleHi: 'ट्रांसफार्मर कॉइल वाइंडिंग एवं टेस्टिंग तकनीशियन',
    sector: 'Sector 15 Food and Transformers',
    department: 'Transformer Assembly',
    descriptionEn: 'Assembles distribution transformers, winds HT/LT coils, and performs insulation Megger and BDV tests.',
    descriptionHi: 'वितरण ट्रांसफार्मर असेंबली, एचटी/एलटी कॉइल वाइंडिंग और मेगर एवं ऑयल बीडीवी परीक्षण।',
    averageSalary: '₹17,500 - ₹25,000 / month',
    requiredSkills: [
      { skillId: 'transformer_winding', benchmarkLevel: 5, criticality: 'core' },
      { skillId: 'transformer_testing', benchmarkLevel: 4, criticality: 'core' },
      { skillId: 'industrial_safety_ppe', benchmarkLevel: 4, criticality: 'core' },
    ]
  },
  {
    id: 'textile_loom_master',
    titleEn: 'Textile Looms & Weaving Master',
    titleHi: 'टेक्सटाइल लूम्स एवं वीविंग मास्टर',
    sector: 'Sahjanwa Textile Park',
    department: 'Weaving Department',
    descriptionEn: 'Maintains rapier looms, repairs warp-weft mechanical breakdowns, and inspects industrial fabric defect rates.',
    descriptionHi: 'रेपियर लूम रखरखाव, ताना-बाना मैकेनिकल ब्रेकडाउन मरम्मत और कपड़ा गुणवत्ता नियंत्रण।',
    averageSalary: '₹18,000 - ₹24,000 / month',
    requiredSkills: [
      { skillId: 'textile_loom_setup', benchmarkLevel: 5, criticality: 'core' },
      { skillId: 'textile_weaving_quality', benchmarkLevel: 4, criticality: 'core' },
      { skillId: 'hydraulic_circuits', benchmarkLevel: 3, criticality: 'preferred' },
      { skillId: '5s_kaizen', benchmarkLevel: 4, criticality: 'core' },
    ]
  }
];

export const GIDA_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job_gida_101',
    titleEn: 'CNC VMC Machine Operator & Programmer',
    titleHi: 'सीएनसी वीएमसी मशीन ऑपरेटर एवं प्रोग्रामर',
    companyName: 'Gallantt Ispat Limited',
    sector: 'Sector 13 Heavy Engineering',
    location: 'Plot 1-4, Sector 13, GIDA Gorakhpur',
    stipendSalary: '₹19,500 - ₹24,000 / month',
    type: 'Apprenticeship (NATS/CMAPS)',
    cmapsEligible: true,
    openings: 8,
    descriptionEn: 'Operate CNC milling machine with Fanuc 0i-MF controller. Responsible for machining forged roll shafts. Apprentices get ₹1,000 CMAPS Govt stipend bonus.',
    descriptionHi: 'फैनुक 0i-MF कंट्रोलर के साथ सीएनसी मिलिंग मशीन संचालन। रोल शाफ्ट की मशीनिंग। अप्रेंटिस को ₹1,000 सीएमएपी बोनस।',
    safetyCompliance: 'Mandatory Steel-toe boots, eye protection glasses, ear plugs in noisy zones.',
    requiredSkills: [
      { skillId: 'cnc_gcode', minLevel: 3 },
      { skillId: 'cnc_vmc_operation', minLevel: 4 },
      { skillId: 'gdt_inspection', minLevel: 3 }
    ],
    postedDate: '2026-11-18',
    deadline: '2026-12-15',
    isSampleData: true
  },
  {
    id: 'job_gida_102',
    titleEn: 'Plastic Injection Mold Setting Technician',
    titleHi: 'प्लास्टिक इंजेक्शन मोल्ड सेटिंग तकनीशियन',
    companyName: 'Purvanchal Polymers Pvt Ltd',
    sector: 'Sector 27 Plastic Park',
    location: 'Plot 42, Sector 27 Plastic Park, GIDA',
    stipendSalary: '₹18,000 - ₹22,500 / month',
    type: 'Full-Time Employment',
    cmapsEligible: false,
    openings: 5,
    descriptionEn: 'Setup 180T to 450T Haitian injection molding machines. Monitor cooling lines, cavity pressure, and resolve flash/sink marks.',
    descriptionHi: '180T से 450T हैतीयन इंजेक्शन मोल्डिंग मशीनों का सेटअप। कूलिंग लाइनों और कैविटी प्रेशर की निगरानी।',
    safetyCompliance: 'High-temperature thermal gloves, safety shoes, LOTO protocol certification.',
    requiredSkills: [
      { skillId: 'plastic_mold_tech', minLevel: 4 },
      { skillId: 'mold_maintenance', minLevel: 3 },
      { skillId: 'hydraulic_circuits', minLevel: 3 }
    ],
    postedDate: '2026-11-20',
    deadline: '2026-12-20',
    isSampleData: true
  },
  {
    id: 'job_gida_103',
    titleEn: 'PLC Automation & Sensor Wiring Electrician',
    titleHi: 'पीएलसी स्वचालन एवं सेंसर वायरिंग इलेक्ट्रीशियन',
    companyName: 'Ankur Transformers & Electricals',
    sector: 'Sector 15 Food and Transformers',
    location: 'Sector 15, Industrial Estate, GIDA Gorakhpur',
    stipendSalary: '₹21,000 - ₹26,000 / month',
    type: 'Apprenticeship (NATS/CMAPS)',
    cmapsEligible: true,
    openings: 4,
    descriptionEn: 'Wire automation panels, troubleshoot Delta and Siemens PLCs, connect inductive proximity and infrared photo sensors.',
    descriptionHi: 'ऑटोमेशन पैनल वायरिंग, डेल्टा और सीमेंस पीएलसी की फॉल्ट ट्रेसिंग, प्रॉक्सिमिटी और इन्फ्रारेड सेंसर इंटरफेसिंग।',
    safetyCompliance: '11kV certified electrical safety boots, insulated gloves, arc-flash face shield.',
    requiredSkills: [
      { skillId: 'plc_ladder_logic', minLevel: 3 },
      { skillId: 'sensor_wiring', minLevel: 4 },
      { skillId: 'vfd_drives', minLevel: 3 }
    ],
    postedDate: '2026-11-22',
    deadline: '2026-12-28',
    isSampleData: true
  },
  {
    id: 'job_gida_104',
    titleEn: 'Mechanical Quality Inspector (Vernier & CMM)',
    titleHi: 'मैकेनिकल गुणवत्ता निरीक्षक (वर्नियर एवं सीएमएम)',
    companyName: 'Gorakhpur Precision Engineering',
    sector: 'Sector 13 Heavy Engineering',
    location: 'Sector 13 Heavy Hub, GIDA',
    stipendSalary: '₹17,000 - ₹21,000 / month',
    type: 'Full-Time Employment',
    cmapsEligible: false,
    openings: 6,
    descriptionEn: 'Carry out incoming raw material and finished component dimensional inspections. Maintain calibration records and rejection logs.',
    descriptionHi: 'कच्चे माल और तैयार घटकों का वर्नियर एवं माइक्रोमीटर से निरीक्षण। कैलिब्रेशन रिकॉर्ड और रिजेक्शन लॉग बनाए रखना।',
    safetyCompliance: 'Standard workshop PPE, anti-static lab coat for CMM measurement bay.',
    requiredSkills: [
      { skillId: 'gdt_inspection', minLevel: 4 },
      { skillId: 'spc_qc_tools', minLevel: 3 }
    ],
    postedDate: '2026-11-19',
    deadline: '2026-12-10',
    isSampleData: true
  },
  {
    id: 'job_gida_105',
    titleEn: 'High-Speed Rapier Loom Maintenance Tech',
    titleHi: 'हाई-स्पीड रेपियर लूम मेंटेनेंस तकनीशियन',
    companyName: 'Sahjanwa PolyFab & Textile Mills',
    sector: 'Sahjanwa Textile Park',
    location: 'Textile Zone, Sahjanwa, GIDA Gorakhpur',
    stipendSalary: '₹18,500 - ₹23,000 / month',
    type: 'Apprenticeship (NATS/CMAPS)',
    cmapsEligible: true,
    openings: 7,
    descriptionEn: 'Responsible for mechanical upkeep of high-speed synthetic sack looms. Solve yarn snapping issues and maintain drive belts.',
    descriptionHi: 'हाई-स्पीड सिंथेटिक बोरी लूम्स का मैकेनिकल रखरखाव। धागा टूटने की समस्या का समाधान और ड्राइव बेल्ट का रखरखाव।',
    safetyCompliance: 'Dust masks, earplugs against continuous loom noise, protective caps.',
    requiredSkills: [
      { skillId: 'textile_loom_setup', minLevel: 4 },
      { skillId: 'textile_weaving_quality', minLevel: 3 }
    ],
    postedDate: '2026-11-21',
    deadline: '2026-12-18',
    isSampleData: true
  }
];

export const GIDA_INDUSTRY_PROJECTS: IndustryProject[] = [
  {
    id: 'proj_gida_201',
    titleEn: 'Slag Conveyor Sensor Interlocking & Emergency Stop System',
    titleHi: 'स्लैग कन्वेयर सेंसर इंटरलॉकिंग एवं इमरजेंसी स्टॉप सिस्टम',
    companyName: 'Gallantt Ispat Limited',
    sector: 'Sector 13 Heavy Engineering',
    problemStatementEn: 'Hot steel slag conveyors occasionally experience thermal jam-ups. We need a PLC-based auto-reverse and optical heat sensor interlocking prototype with emergency buzzer warning.',
    problemStatementHi: 'गर्म स्लैग कन्वेयर में कभी-कभी जाम लग जाता है। हमें पीएलसी आधारित ऑटो-रिवर्स और ऑप्टिकल हीट सेंसर इंटरलॉकिंग सिस्टम चाहिए।',
    expectedDeliverableEn: 'Ladder logic diagram for Delta PLC, sensor wiring schematic, and physical bench testing report.',
    expectedDeliverableHi: 'डेल्टा पीएलसी के लिए लैडर लॉजिक डायग्राम, सेंसर वायरिंग योजना और बेंच टेस्टिंग रिपोर्ट।',
    durationWeeks: 4,
    teamSizeMax: 4,
    stipendPerStudent: '₹6,000 / completion stipend',
    mentorName: 'Er. Rajesh K. Mishra (Chief Electrical Eng, Gallantt)',
    status: 'Open for Applications',
    submissionsCount: 3,
    isSampleData: true
  },
  {
    id: 'proj_gida_202',
    titleEn: 'PET Bottle Preform Mold Cooling Cycle Optimization',
    titleHi: 'पीईटी बॉटल प्रीफॉर्म मोल्ड कूलिंग साइकिल ऑप्टिमाइजेशन',
    companyName: 'Purvanchal Polymers Pvt Ltd',
    sector: 'Sector 27 Plastic Park',
    problemStatementEn: 'Cycle time for 28mm preforms is currently 19 seconds. The factory wants to reduce cooling time by 2.5 seconds without warping or haze defects through mold chiller temperature balancing.',
    problemStatementHi: '28 मिमी प्रीफॉर्म के लिए चक्र समय वर्तमान में 19 सेकंड है। फैक्ट्री मोल्ड चिलर संतुलन के माध्यम से 2.5 सेकंड कम करना चाहती है।',
    expectedDeliverableEn: 'Temperature parameter log sheet, pressure-time profile chart, and sample quality test report.',
    expectedDeliverableHi: 'तापमान पैरामीटर लॉग शीट, दबाव-समय प्रोफ़ाइल और नमूना गुणवत्ता रिपोर्ट।',
    durationWeeks: 3,
    teamSizeMax: 3,
    stipendPerStudent: '₹5,000 / completion stipend',
    mentorName: 'Alok Srivastava (Plant Head, Purvanchal Polymers)',
    status: 'Open for Applications',
    submissionsCount: 2,
    isSampleData: true
  },
  {
    id: 'proj_gida_203',
    titleEn: 'Transformer Coil Winding Tension Automation Jig',
    titleHi: 'ट्रांसफार्मर कॉइल वाइंडिंग टेंशन ऑटोमेशन जिग',
    companyName: 'Ankur Transformers',
    sector: 'Sector 15 Food and Transformers',
    problemStatementEn: 'Manual tensioning of copper strip causes occasional uneven winding layers. Develop a mechanical tension jig with digital load-cell readout.',
    problemStatementHi: 'कॉपर स्ट्रिप के मैनुअल तनाव से असमान वाइंडिंग होती है। डिजिटल लोड-सेल रीडआउट के साथ एक मैकेनिकल टेंशन जिग तैयार करें।',
    expectedDeliverableEn: 'CAD drawing of jig, fabricated prototype or 3D print model, tension calibration graph.',
    expectedDeliverableHi: 'जिग का कैड मॉडल, प्रोटोटाइप और टेंशन कैलिब्रेशन ग्राफ।',
    durationWeeks: 4,
    teamSizeMax: 2,
    stipendPerStudent: '₹6,500 / completion stipend',
    mentorName: 'Er. V. P. Rai (Production Head, Ankur Transformers)',
    status: 'Open for Applications',
    submissionsCount: 4,
    isSampleData: true
  }
];

export const SECTOR_HEATMAP_DATA: SectorHeatmapData[] = [
  {
    sector: 'Sector 13 Heavy Engineering',
    shortName: 'Sector 13',
    cnc: 'Severe',
    mold: 'Balanced',
    plc: 'Moderate',
    quality: 'Moderate',
    totalShortageWorkers: 245,
    priorityInterventionEn: 'Sanction a 6-week intensive CNC G-Code batch at Govt ITI Sahjanwa (120 seats).',
    priorityInterventionHi: 'राजकीय आईटीआई सहजनवां में 6-सप्ताह का गहन सीएनसी जी-कोड बैच स्वीकृत करें (120 सीटें)।'
  },
  {
    sector: 'Sector 27 Plastic Park',
    shortName: 'Sector 27',
    cnc: 'Moderate',
    mold: 'Severe',
    plc: 'Balanced',
    quality: 'Moderate',
    totalShortageWorkers: 190,
    priorityInterventionEn: 'Establish a CIPET-accredited Plastic Injection Mold Toolroom at Govt ITI Chargawan.',
    priorityInterventionHi: 'राजकीय आईटीआई चरगांवा में सीपेट-मान्यता प्राप्त प्लास्टिक मोल्ड टूलरूम स्थापित करें।'
  },
  {
    sector: 'Sector 15 Food and Transformers',
    shortName: 'Sector 15',
    cnc: 'Balanced',
    mold: 'Balanced',
    plc: 'Severe',
    quality: 'Moderate',
    totalShortageWorkers: 165,
    priorityInterventionEn: 'Deploy hands-on PLC and sensor wiring mobile training lab across Pipraich & Jungle Dhusan.',
    priorityInterventionHi: 'पिपराइच एवं जंगल धूसड़ में मोबाइल पीएलसी एवं सेंसर वायरिंग प्रशिक्षण लैब तैनात करें।'
  },
  {
    sector: 'Sahjanwa Textile Park',
    shortName: 'Textile Park',
    cnc: 'Balanced',
    mold: 'Balanced',
    plc: 'Moderate',
    quality: 'Severe',
    totalShortageWorkers: 210,
    priorityInterventionEn: 'Launch specialized Textile Weaving Quality & Fabric Defect Inspection training under UPSDM.',
    priorityInterventionHi: 'यूपीएसडीएम के तहत कपड़ा गुणवत्ता एवं फैब्रिक दोष निरीक्षण प्रशिक्षण शुरू करें।'
  }
];

export const GIDA_SHORTAGE_DIRECTIVES: ShortageDirective[] = [
  {
    id: 'DIR-2026-01',
    titleEn: 'Sanction 6-Week CNC G-Code Intensive Batch',
    titleHi: '6-सप्ताह का सीएनसी जी-कोड गहन बैच स्वीकृति',
    targetInstitute: 'Govt ITI Sahjanwa',
    trade: 'CNC Machining & VMC Programming',
    duration: '6 Weeks (Full Time Hands-on)',
    targetSeats: 120,
    allocatedBudget: '₹14.5 Lakhs (UPSDM Special Grant)',
    status: 'Active Directive',
    approvedDate: '2026-11-15'
  },
  {
    id: 'DIR-2026-02',
    titleEn: 'Establish Plastic Park Mold Maintenance Cell',
    titleHi: 'प्लास्टिक पार्क मोल्ड रखरखाव सेल की स्थापना',
    targetInstitute: 'Govt ITI Chargawan',
    trade: 'Plastic Injection Mold Tooling',
    duration: '8 Weeks',
    targetSeats: 90,
    allocatedBudget: '₹18.0 Lakhs',
    status: 'Active Directive',
    approvedDate: '2026-11-10'
  },
  {
    id: 'DIR-2026-03',
    titleEn: 'PLC Automation & Industrial Sensor Weekend Lab',
    titleHi: 'पीएलसी स्वचालन और औद्योगिक सेंसर सप्ताहांत लैब',
    targetInstitute: 'Govt Polytechnic Gorakhpur',
    trade: 'Industrial Automation (PLC & SCADA)',
    duration: '10 Weeks',
    targetSeats: 80,
    allocatedBudget: '₹12.0 Lakhs',
    status: 'Under Review',
    approvedDate: '2026-11-20'
  }
];

export const INSTITUTE_AUDIT_DATA: InstituteAudit[] = [
  {
    instituteName: 'Govt ITI Chargawan',
    location: 'Chargawan, Gorakhpur',
    enrolledStudents: 620,
    certifiedCount: 485,
    activePlacements: 395,
    placementRate: 81.4,
    flagshipTrade: 'CNC Machinist & Fitter'
  },
  {
    instituteName: 'Govt ITI Sahjanwa',
    location: 'Sahjanwa, GIDA Gorakhpur',
    enrolledStudents: 540,
    certifiedCount: 420,
    activePlacements: 360,
    placementRate: 85.7,
    flagshipTrade: 'Tool & Die Maker (Plastics)'
  },
  {
    instituteName: 'Govt Polytechnic Gorakhpur',
    location: 'Asuran, Gorakhpur',
    enrolledStudents: 780,
    certifiedCount: 690,
    activePlacements: 580,
    placementRate: 84.1,
    flagshipTrade: 'Electrical & Automation'
  },
  {
    instituteName: 'Buddha Institute of Technology (BIT)',
    location: 'CL-1, Sector 7, GIDA Gorakhpur',
    enrolledStudents: 920,
    certifiedCount: 840,
    activePlacements: 730,
    placementRate: 86.9,
    flagshipTrade: 'Mechanical & Automation Eng.'
  },
  {
    instituteName: 'UPSDM Skill Center Pipraich',
    location: 'Pipraich, Gorakhpur',
    enrolledStudents: 310,
    certifiedCount: 240,
    activePlacements: 185,
    placementRate: 77.1,
    flagshipTrade: 'Industrial Quality & 5S'
  }
];

export const SAMPLE_STUDENT_PROFILES = [
  {
    id: 'cand_101',
    name: 'Amit Kumar Verma',
    trade: 'Fitter / CNC Operator',
    institute: 'Govt ITI Chargawan',
    yearOfPassing: 2025,
    location: 'Chargawan, Gorakhpur',
    overallReadiness: 88,
    skills: {
      cnc_gcode: 4,
      cnc_vmc_operation: 4,
      gdt_inspection: 4,
      industrial_safety_ppe: 5,
      cad_solidworks: 3
    },
    cmapsRegistered: true,
    status: 'Shortlisted for Gallantt Ispat',
    isSampleData: true
  },
  {
    id: 'cand_102',
    name: 'Pooja Tiwari',
    trade: 'Plastics Processing Operator',
    institute: 'Govt ITI Sahjanwa',
    yearOfPassing: 2025,
    location: 'Sahjanwa, Gorakhpur',
    overallReadiness: 92,
    skills: {
      plastic_mold_tech: 5,
      mold_maintenance: 4,
      hydraulic_circuits: 4,
      gdt_inspection: 4,
      '5s_kaizen': 5
    },
    cmapsRegistered: true,
    status: 'Available for Scouting',
    isSampleData: true
  },
  {
    id: 'cand_103',
    name: 'Mohd. Imran Ansari',
    trade: 'Industrial Electrician',
    institute: 'Govt Polytechnic Gorakhpur',
    yearOfPassing: 2025,
    location: 'Pipraich, Gorakhpur',
    overallReadiness: 85,
    skills: {
      plc_ladder_logic: 4,
      sensor_wiring: 5,
      vfd_drives: 4,
      industrial_safety_ppe: 4
    },
    cmapsRegistered: true,
    status: 'Available for Scouting',
    isSampleData: true
  },
  {
    id: 'cand_104',
    name: 'Sandeep Nishad',
    trade: 'Mechanical Quality Control',
    institute: 'Buddha Institute of Technology',
    yearOfPassing: 2025,
    location: 'Jungle Dhusan, Gorakhpur',
    overallReadiness: 89,
    skills: {
      gdt_inspection: 5,
      cmm_testing: 4,
      spc_qc_tools: 4,
      '5s_kaizen': 5
    },
    cmapsRegistered: false,
    status: 'Interview Scheduled',
    isSampleData: true
  }
];

export const SAMPLE_CERTIFICATES: VerifiableCertificate[] = [
  {
    certificateId: 'GIDA-2026-CERT-9A82F1',
    verificationHash: 'e7f29a0b12c84de9f34a8109bfbc99c5',
    recipientName: 'Utkarsh Vishwakarma',
    recipientCollege: 'Buddha Institute of Technology, Gorakhpur',
    trade: 'Mechanical & Mechatronics Automation',
    projectOrRoleTitle: 'Slag Conveyor Sensor Interlocking & Emergency Stop System',
    issuingCompany: 'Gallantt Ispat Limited & GIDA Authority',
    issueDate: '2026-11-20',
    signatoryAuthority: 'Chief Executive Officer, GIDA & Managing Director, Gallantt Ispat',
    skillsVerified: [
      'PLC Ladder Logic (Delta/Siemens)',
      'Optical Temperature Sensor Interfacing',
      'Industrial Safety & LOTO Protocol',
      'Control Relay Cabinet Wiring'
    ],
    grade: 'Distinction',
    isValid: true
  }
];
