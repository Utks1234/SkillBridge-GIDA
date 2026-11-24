import { RoadmapWeek } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'kaushalya';
  text: string;
  hindiText?: string;
  timestamp: string;
  suggestedQuestions?: string[];
  audioSpeakableText?: string;
}

// 1. AI 12-Week Roadmap Generator (With Gorakhpur ITI Tailoring & Offline Engine)
export function generate12WeekRoadmap(roleId: string, missingSkillIds: string[]): RoadmapWeek[] {
  // Base syllabus mapping tailored specifically to Govt ITI Chargawan and Govt ITI Sahjanwa
  if (roleId === 'plastic_mold_technician') {
    return [
      {
        week: 1,
        titleEn: 'Thermoplastic Materials & Thermal Grading',
        titleHi: 'थर्मोप्लास्टिक सामग्री एवं थर्मल ग्रेडिंग',
        instituteLocation: 'Govt ITI Sahjanwa (Plastic Park Workshop)',
        practicalLabEn: 'Identify polymers (HDPE, PP, PET, Nylon) via burn and density test at ITI Sahjanwa lab.',
        practicalLabHi: 'आईटीआई सहजनवां लैब में बर्न एवं घनत्व परीक्षण द्वारा पॉलिमर की पहचान।',
        theoryModuleEn: 'Melt flow index (MFI), shrinkage rates, moisture pre-drying rules.',
        theoryModuleHi: 'मेल्ट फ्लो इंडेक्स, संकुचन दर, और प्लास्टिक प्री-हीटिंग नियम।',
        onlineResourceTitle: 'CIPET Plastic Testing Handbook (PDF)',
        onlineResourceUrl: 'https://upsdm.gov.in',
        milestoneOutcome: 'Material classification checklist completed.'
      },
      {
        week: 2,
        titleEn: 'Injection Molding Machine Anatomy & Hydraulics',
        titleHi: 'इंजेक्शन मोल्डिंग मशीन संरचना और हाइड्रोलिक्स',
        instituteLocation: 'Govt ITI Sahjanwa (Plastic Park Workshop)',
        practicalLabEn: 'Machine clamp tonnage calibration, toggle mechanism inspection, and hydraulic filter checks.',
        practicalLabHi: 'क्लैंप टॉनेज कैलिब्रेशन, टॉगल तंत्र निरीक्षण और हाइड्रोलिक फिल्टर जांच।',
        theoryModuleEn: 'Reciprocating screw L/D ratio, check ring valves, back pressure generation.',
        theoryModuleHi: 'स्क्रू एल/डी अनुपात, चेक रिंग वाल्व और बैक प्रेशर की कार्यप्रणाली।',
        onlineResourceTitle: 'Haitian Injection Machine Maintenance Module',
        onlineResourceUrl: 'https://swayam.gov.in',
        milestoneOutcome: 'Hydraulic safety check certified.'
      },
      {
        week: 3,
        titleEn: 'Mold Mounting & Clamping Safety',
        titleHi: 'मोल्ड माउंटिंग एवं क्लैंपिंग सुरक्षा',
        instituteLocation: 'Govt ITI Sahjanwa (Plastic Park Workshop)',
        practicalLabEn: 'Hoist crane handling for 2-plate mold, locating ring alignment, and mold clamp torque tightening.',
        practicalLabHi: 'क्रेन द्वारा मोल्ड हैंडलिंग, लोकेटिंग रिंग संरेखण और क्लैंप टॉर्क टाइटनिंग।',
        theoryModuleEn: 'Platen daylight calculation, mold safety interlocks, tie-bar strain precautions.',
        theoryModuleHi: 'प्लेटन डेलाइट गणना, मोल्ड सुरक्षा इंटरलॉक और टाई-बार सुरक्षा।',
        onlineResourceTitle: 'GIDA Sector 27 Toolroom Safety Standard',
        onlineResourceUrl: 'https://gida.up.gov.in',
        milestoneOutcome: 'Independent mold changeover demonstration.'
      },
      {
        week: 4,
        titleEn: 'Cooling Line Interfacing & Chiller Balancing',
        titleHi: 'कूलिंग लाइन इंटरफेसिंग और चिलर संतुलन',
        instituteLocation: 'Govt ITI Sahjanwa (Plastic Park Workshop)',
        practicalLabEn: 'Hook up quick-connect coolant hoses to mold baffles, check water flow rate with flowmeters.',
        practicalLabHi: 'मोल्ड बैफल्स में कूलेंट होज जोड़ना, फ्लोमीटर से पानी के प्रवाह की जांच।',
        theoryModuleEn: 'Reynolds number in cooling circuits, mold surface temperature differentials, thermal stress.',
        theoryModuleHi: 'कूलिंग सर्किट में रेनॉल्ड्स संख्या और थर्मल तनाव विश्लेषण।',
        onlineResourceTitle: 'Mold Chiller Temperature Optimization Guide',
        onlineResourceUrl: 'https://upsdm.gov.in',
        milestoneOutcome: 'Zero-leakage cooling setup verified.'
      },
      {
        week: 5,
        titleEn: 'Barrel Temperature Profiling & Plasticization',
        titleHi: 'बैरल तापमान प्रोफाइलिंग और प्लास्टिकीकरण',
        instituteLocation: 'Govt ITI Chargawan (Advanced Lab)',
        practicalLabEn: 'Set PID thermal controllers across Feed, Compression, Metering, and Nozzle zones.',
        practicalLabHi: 'फीड, कम्प्रेशन, मीटरिंग और नोजल ज़ोन में पीआईडी तापमान नियंत्रक सेट करना।',
        theoryModuleEn: 'Viscosity vs shear curves, thermal degradation of resin, purging procedures.',
        theoryModuleHi: 'विस्कोसिटी कर्व, राल का थर्मल डिग्रेडेशन और पर्जिंग प्रक्रिया।',
        onlineResourceTitle: 'Thermal Tuning in Polymers (Govt ITI Notes)',
        onlineResourceUrl: 'https://upsdm.gov.in',
        milestoneOutcome: 'PID zone profile logged within ±2°C.'
      },
      {
        week: 6,
        titleEn: 'Injection Pressure, Hold & Velocity Curves',
        titleHi: 'इंजेक्शन दबाव, होल्ड और वेग वक्र',
        instituteLocation: 'Govt ITI Chargawan (Advanced Lab)',
        practicalLabEn: 'Program multistage filling velocity on PLC console; balance V-P transfer point.',
        practicalLabHi: 'पीएलसी कंसोल पर मल्टीस्टेज फिलिंग वेग प्रोग्राम करना; वी-पी ट्रांसफर बैलेंस।',
        theoryModuleEn: 'Cavity pressure transmission, cushion control (3-5mm rule), sink mark elimination.',
        theoryModuleHi: 'कैविटी प्रेशर ट्रांसमिशन, कुशन कंट्रोल और सिंक मार्क उन्मूलन।',
        onlineResourceTitle: 'Scientific Molding Principles (NPTEL Lecture)',
        onlineResourceUrl: 'https://nptel.ac.in',
        milestoneOutcome: 'Balanced short-shot study documented.'
      },
      {
        week: 7,
        titleEn: 'Ejection Mechanics & Part Extraction',
        titleHi: 'इजेक्शन मैकेनिक्स और पार्ट निष्कर्षण',
        instituteLocation: 'Govt ITI Sahjanwa',
        practicalLabEn: 'Adjust stripper plate travel, ejector pin speed ramps, and pneumatic core-pull cylinders.',
        practicalLabHi: 'स्ट्रिपर प्लेट ट्रैवल, इजेक्टर पिन स्पीड और कोर-पुल सिलेंडर का समायोजन।',
        theoryModuleEn: 'Draft angle requirements, undercuts, mechanical slide cams.',
        theoryModuleHi: 'ड्राफ्ट कोण आवश्यकताएं, अंडरकट और स्लाइड कैम तंत्र।',
        onlineResourceTitle: 'Ejection Mechanism Troubleshooting Sheet',
        onlineResourceUrl: 'https://upsdm.gov.in',
        milestoneOutcome: 'Ejection stroke optimized with zero part scuffing.'
      },
      {
        week: 8,
        titleEn: 'Molding Defect Troubleshooting (Flash, Shrinkage, Warpage)',
        titleHi: 'मोल्डिंग दोष निवारण (फ्लैश, सिकुड़न, विकृति)',
        instituteLocation: 'Govt ITI Sahjanwa & Purvanchal Polymers Plant Visit',
        practicalLabEn: 'Troubleshoot live plant parts exhibiting silver streaks, weld lines, and diesel effect.',
        practicalLabHi: 'सिल्वर स्ट्रीक्स, वेल्ड लाइन्स और डीजल इफेक्ट वाले दोषों का लाइव समाधान।',
        theoryModuleEn: 'Root cause analysis matrices, gas venting depth standards (0.015-0.03mm).',
        theoryModuleHi: 'मूल कारण विश्लेषण मैट्रिक्स और गैस वेंटिंग गहराई मानक।',
        onlineResourceTitle: 'Industrial Defect Resolution Atlas',
        onlineResourceUrl: 'https://gida.up.gov.in',
        milestoneOutcome: 'Defect diagnosis exam passed with >85% score.'
      },
      {
        week: 9,
        titleEn: 'Precision Dimensional Metrology for Plastics',
        titleHi: 'प्लास्टिक के लिए सटीक आयामी मेट्रोलॉजी',
        instituteLocation: 'Govt ITI Chargawan (Metrology Lab)',
        practicalLabEn: 'Measure wall thickness with digital ultrasonic gauge and Vernier caliper.',
        practicalLabHi: 'डिजिटल अल्ट्रासोनिक गेज और वर्नियर से दीवार की मोटाई मापना।',
        theoryModuleEn: 'Post-mold shrinkage compensation, optical comparator inspection.',
        theoryModuleHi: 'पोस्ट-मोल्ड सिकुड़न और ऑप्टिकल कम्पेरेटर निरीक्षण।',
        onlineResourceTitle: 'Metrology for Industrial Technicians',
        onlineResourceUrl: 'https://swayam.gov.in',
        milestoneOutcome: 'Dimension inspection certificate generated.'
      },
      {
        week: 10,
        titleEn: 'Preventative Mold Maintenance & Ultrasonic Cleaning',
        titleHi: 'निवारक मोल्ड रखरखाव और अल्ट्रासोनिक सफाई',
        instituteLocation: 'Govt ITI Sahjanwa (Toolroom)',
        practicalLabEn: 'Dismantle mold insert, clean vent channels with brass scraper, ultrasonic bath cleaning.',
        practicalLabHi: 'मोल्ड इंसर्ट खोलना, वेंट चैनलों की सफाई और अल्ट्रासोनिक बाथ सफाई।',
        theoryModuleEn: 'Preventive maintenance schedule: 5,000, 25,000, and 100,000 shot milestones.',
        theoryModuleHi: '5,000 और 25,000 शॉट माइलस्टोन पर निवारक रखरखाव अनुसूची।',
        onlineResourceTitle: 'Toolroom PM Checklist (BIS 11131)',
        onlineResourceUrl: 'https://upsdm.gov.in',
        milestoneOutcome: 'Preventative log sheet fully audited.'
      },
      {
        week: 11,
        titleEn: 'Shopfloor 5S, Energy Efficiency & Safety Protocols',
        titleHi: 'शॉपफ्लोर 5S, ऊर्जा दक्षता और सुरक्षा प्रोटोकॉल',
        instituteLocation: 'Govt ITI Sahjanwa',
        practicalLabEn: 'Execute color-coded tool shadow boards, pellet spillage cleanup, LOTO lockout drills.',
        practicalLabHi: 'कलर-कोडेड टूल बोर्ड, पेलेट स्पिल की सफाई और एलओटीओ लॉकआउट अभ्यास।',
        theoryModuleEn: 'Heater band insulation savings, servo-pump energy profiles, OSHA 1910 standards.',
        theoryModuleHi: 'हीटर बैंड इंसुलेशन ऊर्जा बचत और ओशा 1910 सुरक्षा नियम।',
        onlineResourceTitle: '5S Japanese Methodology for Indian MSMEs',
        onlineResourceUrl: 'https://upsdm.gov.in',
        milestoneOutcome: 'Safety & 5S shop audit approved.'
      },
      {
        week: 12,
        titleEn: 'GIDA Industry Capstone Project & Apprenticeship Mock Interview',
        titleHi: 'गिडा उद्योग कैपस्टोन प्रोजेक्ट और साक्षात्कार तैयारी',
        instituteLocation: 'Buddha Institute of Technology & GIDA Nodal Office',
        practicalLabEn: 'Conduct 4-hour simulated shift trial on live Haitian machine with quality sign-off.',
        practicalLabHi: 'लाइव मशीन पर 4 घंटे का सिमुलेटेड शिफ्ट ट्रायल और गुणवत्ता साइन-ऑफ।',
        theoryModuleEn: 'Apprenticeship contract rules (NATS/CMAPS ₹1,000 stipend claim), professional soft skills.',
        theoryModuleHi: 'शिक्षुता अनुबंध नियम (सीएमएपी ₹1,000 दावा) और साक्षात्कार कौशल।',
        onlineResourceTitle: 'SkillBridge GIDA Final Assessment Portal',
        onlineResourceUrl: 'https://skillbridge-gida.vercel.app',
        milestoneOutcome: 'Industry-verified completion certificate awarded.'
      }
    ];
  }

  // Default: CNC & VMC Programming & Machining (Gorakhpur Sector 13 Focus)
  return [
    {
      week: 1,
      titleEn: 'Engineering Blueprint Reading & GD&T Symbols',
      titleHi: 'इंजीनियरिंग ड्राइंग पढ़ना और जीडी एंड टी प्रतीक',
      instituteLocation: 'Govt ITI Chargawan (CNC Center)',
      practicalLabEn: 'Decode isometric and orthographic projection drawings of Gallantt steel shafts.',
      practicalLabHi: 'गैलेंट स्टील शाफ्ट के ऑर्थोग्राफिक और आइसोमेट्रिक ड्रॉइंग को पढ़ना।',
      theoryModuleEn: 'Datums, parallelism, perpendicularity, concentricity, surface finish Ra symbols.',
      theoryModuleHi: 'डेटम, समानांतरता, लंबवतता, संकेंद्रण और सतह फिनिश Ra प्रतीक।',
      onlineResourceTitle: 'Engineering Drawing Fundamentals (Govt ITI)',
      onlineResourceUrl: 'https://swayam.gov.in',
      milestoneOutcome: 'Blueprint interpretation test completed.'
    },
    {
      week: 2,
      titleEn: 'Precision Measuring Tools & Calibration',
      titleHi: 'सटीक मापने वाले उपकरण एवं अंशांकन',
      instituteLocation: 'Govt ITI Chargawan (Metrology Lab)',
      practicalLabEn: 'Measure test specimens with Vernier caliper (0.02mm) and outside micrometer (0.001mm).',
      practicalLabHi: 'वर्नियर कैलीपर (0.02 मिमी) और माइक्रोमीटर (0.001 मिमी) से परीक्षण नमूने मापना।',
      theoryModuleEn: 'Zero error correction, Abbe principle, gauge blocks calibration standards.',
      theoryModuleHi: 'जीरो एरर सुधार, एबे सिद्धांत और गेज ब्लॉक कैलिब्रेशन मानक।',
      onlineResourceTitle: 'Precision Metrology Guide by DGT/UPSDM',
      onlineResourceUrl: 'https://upsdm.gov.in',
      milestoneOutcome: '10-part dimensional audit log signed off.'
    },
    {
      week: 3,
      titleEn: 'CNC Lathe vs VMC Coordinate Systems (G54-G59)',
      titleHi: 'सीएनसी लेथ बनाम वीएमसी समन्वय प्रणाली (G54-G59)',
      instituteLocation: 'Govt ITI Chargawan (CNC Workshop)',
      practicalLabEn: 'Set Machine Zero, Reference Zero, and Workpiece Zero using edge finder on CNC milling bed.',
      practicalLabHi: 'एज फाइंडर से वर्कपीस जीरो और वर्क कोऑर्डिनेट (G54) सेट करना।',
      theoryModuleEn: 'Cartesian coordinates (X, Y, Z, 4th axis), right-hand rule, G90 absolute vs G91 incremental.',
      theoryModuleHi: 'कार्तीय निर्देशांक (X, Y, Z), दायां हाथ नियम, G90 एब्सोल्यूट बनाम G91 इंक्रीमेंटल।',
      onlineResourceTitle: 'Fanuc 0i-MF Coordinate System Manual',
      onlineResourceUrl: 'https://swayam.gov.in',
      milestoneOutcome: 'Edge finder zero-touching verified by trainer.'
    },
    {
      week: 4,
      titleEn: 'Fundamentals of G-Codes (G00, G01, G02, G03)',
      titleHi: 'जी-कोड की मूल बातें (G00, G01, G02, G03)',
      instituteLocation: 'Govt ITI Chargawan',
      practicalLabEn: 'Write manual G-Code on paper, input to simulator, verify linear and circular arc interpolations.',
      practicalLabHi: 'कागज पर जी-कोड लिखना, सिम्युलेटर में फीड करना और वृत्ताकार आर्क की जांच।',
      theoryModuleEn: 'Feed rates (F), spindle speeds (S), clockwise (G02) and counter-clockwise (G03) arcs with I, J, K.',
      theoryModuleHi: 'फीड दर (F), स्पिंडल गति (S), दक्षिणावर्त एवं वामावर्त आर्क।',
      onlineResourceTitle: 'Interactive G-Code Simulator Module',
      onlineResourceUrl: 'https://swayam.gov.in',
      milestoneOutcome: 'Contour milling program simulated without collisions.'
    },
    {
      week: 5,
      titleEn: 'Tool Offsets & Tool Length Compensation (G43, H, D)',
      titleHi: 'टूल ऑफसेट और टूल लंबाई क्षतिपूर्ति (G43, H, D)',
      instituteLocation: 'Govt ITI Sahjanwa (Machine Lab)',
      practicalLabEn: 'Perform optical tool setter contact, record height offset H01-H12, input radius D offset.',
      practicalLabHi: 'टूल सेटर से टूल ऊंचाई H01-H12 रिकॉर्ड करना और त्रिज्या ऑफसेट D फीड करना।',
      theoryModuleEn: 'Tool wear compensation, cutter radius compensation (G41 left, G42 right, G40 cancel).',
      theoryModuleHi: 'कटर त्रिज्या मुआवजा (G41 बायां, G42 दायां) और वियर कंपेंसेशन।',
      onlineResourceTitle: 'VMC Tool Setter Operation Manual',
      onlineResourceUrl: 'https://upsdm.gov.in',
      milestoneOutcome: '10 tools probed and offset table validated.'
    },
    {
      week: 6,
      titleEn: 'Canned Cycles for Drilling & Tapping (G81, G83, G84)',
      titleHi: 'ड्रिलिंग और टैपिंग के लिए कैन्ड साइकिल (G81, G83, G84)',
      instituteLocation: 'Govt ITI Sahjanwa',
      practicalLabEn: 'Machine an 8-hole PCD flange with peck drilling cycle G83 and rigid tapping G84.',
      practicalLabHi: 'G83 पेक ड्रिलिंग और G84 रिजिड टैपिंग द्वारा 8-होल फ्लेंज की मशीनिंग।',
      theoryModuleEn: 'Retract plane (R), peck depth (Q), chip breaking mechanics, coolant delivery pressure.',
      theoryModuleHi: 'रिट्रैक्ट प्लेन (R), पेक डेप्थ (Q) और चिप ब्रेकिंग मैकेनिक्स।',
      onlineResourceTitle: 'Canned Cycles Reference Guide',
      onlineResourceUrl: 'https://upsdm.gov.in',
      milestoneOutcome: 'Flange piece tapped to pitch specification.'
    },
    {
      week: 7,
      titleEn: 'Workholding Fixtures, Clamping & Dial Indicator Aligning',
      titleHi: 'वर्कहोल्डिंग फिक्स्चर, क्लैंपिंग और डायल इंडिकेटर संरेखण',
      instituteLocation: 'Govt ITI Chargawan',
      practicalLabEn: 'True a heavy machine vice using dial test indicator within 0.01mm across 150mm length.',
      practicalLabHi: '150 मिमी लंबाई पर 0.01 मिमी के भीतर डायल इंडिकेटर से मशीन वाइस संरेखित करना।',
      theoryModuleEn: 'Clamping distortion in castings, soft jaws machining, modular fixture systems.',
      theoryModuleHi: 'कास्टिंग में क्लैंपिंग विकृति, सॉफ्ट जॉ मशीनिंग और मॉड्यूलर फिक्स्चर।',
      onlineResourceTitle: 'Machine Tool Setup & Alignment Standards',
      onlineResourceUrl: 'https://swayam.gov.in',
      milestoneOutcome: 'Vice alignment accuracy verified.'
    },
    {
      week: 8,
      titleEn: 'Cutting Tool Inserts, Speeds, Feeds & Tool Life',
      titleHi: 'कटिंग टूल इंसर्ट, स्पीड, फीड और टूल लाइफ',
      instituteLocation: 'Govt ITI Chargawan & Gallantt Ispat Visit',
      practicalLabEn: 'Select carbide inserts (CNMG, WNMG, APMT) for alloy steel milling; monitor chip colors.',
      practicalLabHi: 'अलॉय स्टील मिलिंग के लिए कार्बाइड इंसर्ट का चयन और चिप रंगों की निगरानी।',
      theoryModuleEn: 'Taylor tool life equation, surface cutting speed Vc in m/min, chip load per tooth.',
      theoryModuleHi: 'टेलर टूल लाइफ समीकरण, कटिंग स्पीड Vc और प्रति टूथ चिप लोड।',
      onlineResourceTitle: 'Sandvik Coromant Metal Cutting Guide',
      onlineResourceUrl: 'https://swayam.gov.in',
      milestoneOutcome: 'Insert selection and feed calculator worksheet submitted.'
    },
    {
      week: 9,
      titleEn: 'CAD to CAM: Toolpath Generation in SolidWorks CAM',
      titleHi: 'सीएडी से सीएएम: सॉलिडवर्क्स सीएएम में टूलपाथ बनाना',
      instituteLocation: 'Buddha Institute of Technology (CAD/CAM Lab)',
      practicalLabEn: 'Import 3D step file, define stock, generate 2.5D pocketing toolpaths, export post-processed NC code.',
      practicalLabHi: '3डी स्टेप फाइल इम्पोर्ट करना, स्टॉक चुनना और पोस्ट-प्रोसेस्ड एनसी कोड एक्सपोर्ट करना।',
      theoryModuleEn: 'Lead-in/lead-out strategies, adaptive roughing vs finishing passes, post-processor settings.',
      theoryModuleHi: 'लीड-इन/लीड-आउट रणनीतियां, अडैप्टिव रफिंग और पोस्ट-प्रोसेसर सेटिंग्स।',
      onlineResourceTitle: 'CAM Programming Video Tutorials',
      onlineResourceUrl: 'https://swayam.gov.in',
      milestoneOutcome: 'CAM generated NC program verified.'
    },
    {
      week: 10,
      titleEn: 'Machining Component on CNC VMC & Dimensional Inspection',
      titleHi: 'सीएनसी वीएमसी पर घटक मशीनिंग और आयामी निरीक्षण',
      instituteLocation: 'Govt ITI Chargawan',
      practicalLabEn: 'Execute full production run of a GIDA automotive connector bracket from raw aluminium stock.',
      practicalLabHi: 'कच्चे एल्यूमीनियम स्टॉक से जीआईडीए ऑटोमोटिव ब्रैकेट का पूर्ण उत्पादन रन।',
      theoryModuleEn: 'First article inspection report (FAIR), surface roughness measurement with tester.',
      theoryModuleHi: 'फर्स्ट आर्टिकल इंस्पेक्शन रिपोर्ट और सर्फेस रफनेस परीक्षण।',
      onlineResourceTitle: 'Quality Standard BIS ISO 9001:2015',
      onlineResourceUrl: 'https://upsdm.gov.in',
      milestoneOutcome: 'Component dimension report approved.'
    },
    {
      week: 11,
      titleEn: 'Machine Maintenance, TPM & Emergency Protocols',
      titleHi: 'मशीन रखरखाव, टीपीएम और आपातकालीन सुरक्षा',
      instituteLocation: 'Govt ITI Sahjanwa',
      practicalLabEn: 'Perform weekly slideway lubrication oil refill, air pressure regulator drain, spindle taper clean.',
      practicalLabHi: 'स्लाइडवे स्नेहन तेल रिफिल, एयर प्रेशर ड्रेन और स्पिंडल टेपर सफाई।',
      theoryModuleEn: 'Total Productive Maintenance (TPM), autonomous maintenance steps, E-stop circuit bypass risks.',
      theoryModuleHi: 'टोटल प्रोडक्टिव मेंटेनेंस (टीपीएम) और इमरजेंसी स्टॉप सर्किट सुरक्षा।',
      onlineResourceTitle: 'CNC Machine PM Checksheet',
      onlineResourceUrl: 'https://gida.up.gov.in',
      milestoneOutcome: 'TPM maintenance audit completed.'
    },
    {
      week: 12,
      titleEn: 'Live Industry Capstone Evaluation & Apprenticeship Onboarding',
      titleHi: 'लाइव उद्योग कैपस्टोन मूल्यांकन और शिक्षुता ऑनबोर्डिंग',
      instituteLocation: 'Buddha Institute of Technology & GIDA Nodal Office',
      practicalLabEn: 'Final practical test evaluated by Gallantt Ispat machine shop engineers.',
      practicalLabHi: 'गैलेंट इस्पात के इंजीनियरों द्वारा अंतिम व्यावहारिक परीक्षण का मूल्यांकन।',
      theoryModuleEn: 'CMAPS UP govt portal registration, apprentice stipend rules, shopfloor communication.',
      theoryModuleHi: 'सीएमएपी पोर्टल पंजीकरण, शिक्षु भत्ता नियम और औद्योगिक संचार कौशल।',
      onlineResourceTitle: 'SkillBridge GIDA Official Verification',
      onlineResourceUrl: 'https://skillbridge-gida.vercel.app',
      milestoneOutcome: 'GIDA Verifiable Technician Certification awarded.'
    }
  ];
}

// 2. AI Bilingual Job Description Writer (Offline Rule-Based + LLM-Ready)
export interface GeneratedJobDescription {
  titleEn: string;
  titleHi: string;
  sector: string;
  stipendSalary: string;
  overviewEn: string;
  overviewHi: string;
  keyResponsibilitiesEn: string[];
  keyResponsibilitiesHi: string[];
  requiredSkills: { skillId: string; minLevel: number }[];
  safetyAndPpeRulesEn: string[];
  safetyAndPpeRulesHi: string[];
  cmapsEligibility: string;
}

export function generateBilingualJobDescription(input: {
  trade: string;
  sector: string;
  companyName: string;
  rawBullets: string;
  openings: number;
  salaryMin: number;
  salaryMax: number;
}): GeneratedJobDescription {
  const isCnc = input.trade.toLowerCase().includes('cnc') || input.rawBullets.toLowerCase().includes('cnc');
  const isMold = input.trade.toLowerCase().includes('mold') || input.trade.toLowerCase().includes('plastic');
  const isPlc = input.trade.toLowerCase().includes('plc') || input.trade.toLowerCase().includes('electric');

  if (isMold) {
    return {
      titleEn: `Plastic Injection Molding Operator & Technician`,
      titleHi: `प्लास्टिक इंजेक्शन मोल्डिंग ऑपरेटर एवं तकनीशियन`,
      sector: input.sector || 'Sector 27 Plastic Park',
      stipendSalary: `₹${input.salaryMin.toLocaleString('en-IN')} - ₹${input.salaryMax.toLocaleString('en-IN')} / month`,
      overviewEn: `${input.companyName} is seeking ${input.openings} skilled Plastic Injection Molding Technicians for our Sector 27 GIDA manufacturing facility. The role involves machine cycle parameter tuning, mold changeovers, and zero-defect packaging production.`,
      overviewHi: `${input.companyName} को सेक्टर 27 गिडा संयंत्र के लिए ${input.openings} कुशल प्लास्टिक इंजेक्शन मोल्डिंग तकनीशियनों की आवश्यकता है। मोल्ड परिवर्तन, मशीन साइकिल ट्यूनिंग और गुणवत्ता उत्पादन का कार्य।`,
      keyResponsibilitiesEn: [
        'Operate and set up 150T to 450T Haitian and Toshiba injection molding machines.',
        'Monitor barrel zone temperatures, injection speed, backpressure, and cooling time.',
        'Carry out fast mold changeovers using overhead cranes and secure mold clamping.',
        'Inspect produced preforms and caps with vernier calipers for flash and sink mark defects.'
      ],
      keyResponsibilitiesHi: [
        '150T से 450T इंजेक्शन मोल्डिंग मशीनों का संचालन और सेटअप।',
        'बैरल तापमान, इंजेक्शन गति, बैकप्रेशर और कूलिंग समय की निगरानी।',
        'क्रेन की सहायता से मोल्ड बदलना और सुरक्षित क्लैंपिंग करना।',
        'तैयार घटकों में फ्लैश और सिंक मार्क दोषों की जांच करना।'
      ],
      requiredSkills: [
        { skillId: 'plastic_mold_tech', minLevel: 4 },
        { skillId: 'mold_maintenance', minLevel: 3 },
        { skillId: 'gdt_inspection', minLevel: 3 }
      ],
      safetyAndPpeRulesEn: [
        'Thermal-resistant safety gloves mandatory during nozzle purging.',
        'Safety shoes with anti-skid polyurethane soles required on oily shopfloor.',
        'Strict Lockout-Tagout (LOTO) adherence before clearing barrel hopper blockages.'
      ],
      safetyAndPpeRulesHi: [
        'नोजल पर्जिंग के समय थर्मल-प्रतिरोधी सुरक्षा दस्ताने पहनना अनिवार्य।',
        'ऑयली शॉपफ्लोर पर फिसलन-रोधी सुरक्षा जूते आवश्यक।',
        'बैरल हॉपर में रुकावट ठीक करने से पहले LOTO सुरक्षा का कड़ाई से पालन।'
      ],
      cmapsEligibility: 'CMAPS Eligible: Eligible candidates under 35 years receive ₹1,000 extra monthly stipend directly from UP Government.'
    };
  }

  if (isPlc) {
    return {
      titleEn: `Industrial Automation & PLC Panel Electrician`,
      titleHi: `औद्योगिक स्वचालन एवं पीएलसी पैनल इलेक्ट्रीशियन`,
      sector: input.sector || 'Sector 15 Food and Transformers',
      stipendSalary: `₹${input.salaryMin.toLocaleString('en-IN')} - ₹${input.salaryMax.toLocaleString('en-IN')} / month`,
      overviewEn: `${input.companyName} requires ${input.openings} certified Automation Technicians for automated production lines in GIDA. Responsible for Delta/Siemens PLC troubleshooting, sensor loops, and motor control centers.`,
      overviewHi: `${input.companyName} को गिडा की स्वचालित उत्पादन लाइनों के लिए ${input.openings} प्रमाणित ऑटोमेशन तकनीशियनों की आवश्यकता है। पीएलसी और सेंसर वायरिंग का कार्य।`,
      keyResponsibilitiesEn: [
        'Read electrical schematics and wire 24VDC control circuits with optical and proximity sensors.',
        'Troubleshoot PLC input/output status LEDs and monitor ladder logic sequences.',
        'Configure Variable Frequency Drives (VFDs) for conveyor speed synchronization.',
        'Perform preventive maintenance on contactors, relays, and emergency stop interlocks.'
      ],
      keyResponsibilitiesHi: [
        'इलेक्ट्रिकल ड्राइंग पढ़ना और 24VDC कंट्रोल सर्किट व सेंसर वायरिंग करना।',
        'पीएलसी इनपुट/आउटपुट एलईडी की फॉल्ट ट्रेसिंग और लैडर लॉजिक निगरानी।',
        'कन्वेयर स्पीड के लिए वीएफडी ड्राइव को कॉन्फ़िगर करना।',
        'कॉन्टैक्टर्स, रिले और इमरजेंसी स्टॉप का निवारक रखरखाव।'
      ],
      requiredSkills: [
        { skillId: 'plc_ladder_logic', minLevel: 3 },
        { skillId: 'sensor_wiring', minLevel: 4 },
        { skillId: 'vfd_drives', minLevel: 3 }
      ],
      safetyAndPpeRulesEn: [
        '11kV certified electrical insulated boots mandatory inside power distribution bays.',
        'Arc-flash protective safety visor when testing live 415V panels.',
        'Use insulated VDE tools only (tested up to 1000V).'
      ],
      safetyAndPpeRulesHi: [
        'पावर वितरण रूम में 11kV प्रमाणित इन्सुलेटेड जूते पहनना अनिवार्य।',
        '415V लाइव पैनल की जांच करते समय आर्क-फ्लैश सुरक्षात्मक वाइज़र।',
        'केवल 1000V प्रमाणित इंसुलेटेड VDE टूल्स का उपयोग करें।'
      ],
      cmapsEligibility: 'CMAPS Eligible: Approved under UP Apprenticeship scheme with ₹1,000 state allowance.'
    };
  }

  // Default: CNC Machining
  return {
    titleEn: `CNC VMC Machine Operator & Programmer`,
    titleHi: `सीएनसी वीएमसी मशीन ऑपरेटर एवं प्रोग्रामर`,
    sector: input.sector || 'Sector 13 Heavy Engineering',
    stipendSalary: `₹${input.salaryMin.toLocaleString('en-IN')} - ₹${input.salaryMax.toLocaleString('en-IN')} / month`,
    overviewEn: `${input.companyName} is hiring ${input.openings} CNC & VMC operators for precision machining operations in GIDA Gorakhpur. Must be capable of workpiece setup, tool offsetting, and blueprint verification.`,
    overviewHi: `${input.companyName} को गिडा गोरखपुर में सटीक मशीनिंग संचालन के लिए ${input.openings} सीएनसी एवं वीएमसी ऑपरेटरों की आवश्यकता है। टूल ऑफसेट और वर्कपीस सेटअप का कार्य।`,
    keyResponsibilitiesEn: [
      'Load raw billets, align fixtures, and establish workpiece origin (G54).',
      'Input tool length and radius offsets (G43 H-offset, D-offset) into Fanuc controller.',
      'Execute contour milling, pocketing, and tapping programs with high dimensional accuracy.',
      'Inspect finished components with Vernier calipers, depth micrometers, and bore gauges.'
    ],
    keyResponsibilitiesHi: [
      'कच्चे माल को लोड करना, फिक्स्चर संरेखित करना और वर्कपीस ओरिजिन (G54) सेट करना।',
      'फैनुक कंट्रोलर में टूल लंबाई और त्रिज्या ऑफसेट फीड करना।',
      'सटीक आयामों के साथ मिलिंग, पॉकेटिंग और टैपिंग प्रोग्राम चलाना।',
      'वर्नियर कैलीपर और माइक्रोमीटर से तैयार घटकों का निरीक्षण करना।'
    ],
    requiredSkills: [
      { skillId: 'cnc_gcode', minLevel: 3 },
      { skillId: 'cnc_vmc_operation', minLevel: 4 },
      { skillId: 'gdt_inspection', minLevel: 3 }
    ],
    safetyAndPpeRulesEn: [
      'Safety goggles with side shields mandatory during active chip cutting.',
      'Steel-toe safety shoes (ISI marked) required on the shopfloor.',
      'Never wear loose clothing, ties, or gloves while rotating spindle is running.'
    ],
    safetyAndPpeRulesHi: [
      'कटिंग के दौरान साइड शील्ड वाले सेफ्टी चश्मे पहनना अनिवार्य।',
      'शॉपफ्लोर पर स्टील-टो सेफ्टी जूते आवश्यक।',
      'स्पिंडल घूमते समय ढीले कपड़े या दस्ताने कभी न पहनें।'
    ],
    cmapsEligibility: 'CMAPS Eligible: ₹1,000 monthly allowance provided by UP Government for 1-year apprenticeship.'
  };
}

// 3. "कौशल्या" (Kaushalya) Bilingual AI Career Guide Engine
export function getKaushalyaResponse(userQuery: string, lang: 'en' | 'hi'): {
  replyEn: string;
  replyHi: string;
  suggestedQuestions: string[];
} {
  const q = userQuery.toLowerCase();

  // CMAPS ₹1,000 allowance queries
  if (q.includes('cmaps') || q.includes('allowance') || q.includes('1000') || q.includes('stipend') || q.includes('भत्ता') || q.includes('स्टाइपेंड') || q.includes('योजना')) {
    return {
      replyEn: `Under the Chief Minister Apprenticeship Promotion Scheme (CMAPS), technical youth from ITIs and Polytechnics working in GIDA factories receive an extra ₹1,000/month stipend directly transferred by the UP State Government, over and above the factory's base stipend. To claim this: 1) Register on the UP Apprenticeship portal with your ITI marksheet and Aadhaar-linked bank account, 2) Select any CMAPS-tagged job on SkillBridge GIDA, and 3) The GIDA nodal desk validates your attendance for direct DBT payment!`,
      replyHi: `मुख्यमंत्री शिक्षुता प्रोत्साहन योजना (CMAPS) के तहत, गिडा (GIDA) की फैक्ट्रियों में अप्रेंटिसशिप करने वाले आईटीआई और पॉलिटेक्निक युवाओं को फैक्ट्री के मूल वेतन के अतिरिक्त उत्तर प्रदेश सरकार द्वारा सीधे उनके बैंक खाते में ₹1,000 प्रति माह का अतिरिक्त भत्ता DBT के माध्यम से भेजा जाता है। इसके लिए आपको अपना आधार लिंक बैंक खाता और आईटीआई मार्कशीट से अप्रेंटिसशिप पोर्टल पर रजिस्टर होना होगा। स्किलब्रिज गिडा पर सभी पात्र नौकरियों पर "CMAPS Eligible" टैग लगा हुआ है!`,
      suggestedQuestions: [
        lang === 'hi' ? 'गैलेंट इस्पात में अप्रेंटिसशिप कैसे मिलेगी?' : 'How to apply for Gallantt Ispat apprenticeship?',
        lang === 'hi' ? 'आईटीआई सहजनवां में कौन से कोर्स उपलब्ध हैं?' : 'Which courses are available at ITI Sahjanwa?',
        lang === 'hi' ? 'सीएनसी ऑपरेटर के लिए इंटरव्यू टिप्स दें' : 'Give me interview tips for CNC operator'
      ]
    };
  }

  // CNC & Heavy Engineering
  if (q.includes('cnc') || q.includes('vmc') || q.includes('gallantt') || q.includes('g-code') || q.includes('सीएनसी') || q.includes('मशीन')) {
    return {
      replyEn: `GIDA's Sector 13 Heavy Engineering hub (anchored by Gallantt Ispat, steel rolling, and component units) currently has over 245 open vacancies for certified CNC and VMC machinists! The highest-demand skills are Fanuc G-Code programming, edge-finder zero setting (G54), tool height compensation (G43), and Vernier measurement. You can enrol in the GIDA-sanctioned 6-week intensive CNC hands-on batch at Govt ITI Sahjanwa or Chargawan to become 100% placement-ready.`,
      replyHi: `गिडा (GIDA) के सेक्टर 13 हेवी इंजीनियरिंग हब में (विशेषकर गैलेंट इस्पात और इंजीनियरिंग इकाइयों में) सीएनसी एवं वीएमसी ऑपरेटरों के लिए 245 से अधिक पद रिक्त हैं! सबसे ज्यादा मांग फैनुक जी-कोड प्रोग्रामिंग, वर्कपीस जीरो सेटिंग (G54), टूल हाइट ऑफसेट (G43) और वर्नियर कैलीपर जांच की है। आप राजकीय आईटीआई सहजनवां या चरगांवा में स्वीकृत 6-सप्ताह के गहन सीएनसी बैच में दाखिला लेकर सीधे प्लेसमेंट पा सकते हैं।`,
      suggestedQuestions: [
        lang === 'hi' ? 'सीएनसी का 12-सप्ताह का रोडमैप कैसे शुरू करें?' : 'How to start the 12-week CNC roadmap?',
        lang === 'hi' ? 'सीएमएपी योजना का लाभ कैसे लें?' : 'What are CMAPS stipend benefits?',
        lang === 'hi' ? 'प्लास्टिक पार्क में क्या अवसर हैं?' : 'What opportunities exist in Sector 27 Plastic Park?'
      ]
    };
  }

  // Plastic Park / Mold
  if (q.includes('plastic') || q.includes('mold') || q.includes('sector 27') || q.includes('purvanchal') || q.includes('प्लास्टिक') || q.includes('मोल्ड')) {
    return {
      replyEn: `GIDA Sector 27 Plastic Park houses state-of-the-art injection molding and packaging units like Purvanchal Polymers and packaging mills. Factories urgently need technicians skilled in mold clamping, barrel PID temperature profiling (Feed to Nozzle), chiller flow balancing, and hydraulic pressure troubleshooting. Average starting salaries range from ₹17,000 to ₹23,000/month. Govt ITI Chargawan and Sahjanwa offer hands-on mold maintenance workshops!`,
      replyHi: `गिडा सेक्टर 27 प्लास्टिक पार्क में पूर्वांचल पॉलिमर्स सहित दर्जनों आधुनिक इंजेक्शन मोल्डिंग और पैकेजिंग इकाइयां हैं। यहाँ मोल्ड क्लैंपिंग, बैरल तापमान नियंत्रण, चिलर फ्लो संतुलन और हाइड्रोलिक वाल्व के जानकार तकनीशियनों की भारी मांग है। शुरुआती वेतन ₹17,000 से ₹23,000/माह तक मिलता है। राजकीय आईटीआई सहजनवां और चरगांवा में इसके व्यावहारिक प्रशिक्षण वर्कशॉप उपलब्ध हैं!`,
      suggestedQuestions: [
        lang === 'hi' ? 'मोल्ड तकनीशियन बनने के लिए कौन से कौशल चाहिए?' : 'What skills are needed for Mold Technician?',
        lang === 'hi' ? 'पूर्वांचल पॉलिमर्स में लाइव प्रोजेक्ट्स क्या हैं?' : 'What live projects are available at Purvanchal Polymers?',
        lang === 'hi' ? 'सेक्टर 13 में कौन सी फैक्ट्रियां हैं?' : 'Which factories are in Sector 13?'
      ]
    };
  }

  // Interview preparation
  if (q.includes('interview') || q.includes('tip') || q.includes('साक्षात्कार') || q.includes('तैयारी') || q.includes('सवाल')) {
    return {
      replyEn: `Top 4 GIDA Factory Interview Tips: 1) Practical Demonstration: Almost all GIDA units (Gallantt, Purvanchal Polymers, Ankur) will ask you to read a real engineering blueprint and measure a test piece with Vernier/Micrometer on the spot. 2) Safety Awareness: Always mention Lockout-Tagout (LOTO), wearing steel-toe boots, and never wearing loose clothing near rotating spindles. 3) Know G-Codes & Circuits: Be ready to explain G01 vs G02, or how a proximity sensor relay connects to a PLC input. 4) Highlight your SkillBridge assessment score and any completed industry-academia projects!`,
      replyHi: `गिडा फैक्ट्री इंटरव्यू के लिए शीर्ष 4 सुझाव: 1) प्रैक्टिकल टेस्ट: लगभग सभी फैक्ट्रियां (गैलेंट, पूर्वांचल पॉलिमर्स, अंकुर) आपसे मौके पर वर्नियर कैलीपर या माइक्रोमीटर से पीस नापने और ड्राइंग पढ़ने को कहेंगी। 2) सुरक्षा जागरूकता: हमेशा LOTO (लॉकआउट-टैगआउट), सेफ्टी जूते और रोटेटिंग मशीन के पास ढीले कपड़े न पहनने की बात कहें। 3) कोड और सर्किट की समझ: G01 बनाम G02 का अंतर या पीएलसी में सेंसर वायरिंग की जानकारी रखें। 4) अपने स्किलब्रिज गिडा स्कोर और प्रोजेक्ट सर्टिफिकेट को इंटरव्यूअर को जरूर दिखाएं!`,
      suggestedQuestions: [
        lang === 'hi' ? 'वेरिफिएबल सर्टिफिकेट कैसे डाउनलोड करें?' : 'How do I download my verifiable certificate?',
        lang === 'hi' ? 'सीएमएपी ₹1,000 भत्ता कैसे मिलता है?' : 'How do I get the ₹1,000 CMAPS stipend?',
        lang === 'hi' ? 'आईटीआई चरगांवा में प्लेसमेंट रेट क्या है?' : 'What is the placement rate at ITI Chargawan?'
      ]
    };
  }

  // Default helpful response
  return {
    replyEn: `Hello! I am Kaushalya (कौशल्या), your bilingual AI Career Guide for SkillBridge GIDA. I can help you understand local job vacancies across Sector 13 Heavy Engineering, Sector 27 Plastic Park, Sector 15 Food & Transformers, and Sahjanwa Textile Park. I can also guide you on claiming the ₹1,000 CMAPS UP Govt stipend, choosing 12-week courses at Govt ITI Chargawan & Sahjanwa, and preparing for factory technical interviews. How can I assist you today?`,
    replyHi: `नमस्ते! मैं कौशल सेतु गिडा की द्विभाषी एआई करियर मार्गदर्शिका "कौशल्या" हूँ। मैं आपको सेक्टर 13 हेवी इंजीनियरिंग, सेक्टर 27 प्लास्टिक पार्क, सेक्टर 15 फूड व ट्रांसफार्मर, और सहजनवां टेक्सटाइल पार्क में स्थानीय नौकरियों की जानकारी दे सकती हूँ। इसके अलावा यूपी सरकार के ₹1,000 सीएमएपी भत्ते का दावा करने, राजकीय आईटीआई चरगांवा व सहजनवां के 12-सप्ताह के कोर्स चुनने, और फैक्ट्री इंटरव्यू की तैयारी में आपकी मदद कर सकती हूँ। आप क्या जानना चाहते हैं?`,
    suggestedQuestions: [
      lang === 'hi' ? 'CMAPS योजना में ₹1,000 का अतिरिक्त भत्ता कैसे प्राप्त करें?' : 'How to get ₹1,000 extra stipend under CMAPS?',
      lang === 'hi' ? 'गैलेंट इस्पात और प्लास्टिक पार्क में कौन से पद खुले हैं?' : 'What roles are open at Gallantt Ispat & Plastic Park?',
      lang === 'hi' ? 'सीएनसी और पीएलसी के लिए 12-सप्ताह का रोडमैप क्या है?' : 'What is the 12-week roadmap for CNC and PLC?'
    ]
  };
}
