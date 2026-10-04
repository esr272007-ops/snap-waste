import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext
} from "react";
import "./App.css";

/* =========================================================
   SNAPWASTE
   Smart Waste Reporting & Cleanup
   ========================================================= */

/* Shared app data: submitted reports, crew assignment + cleanup proofs.
   Lets Municipality, Crew and Citizen dashboards stay in sync. */
const AppDataContext = createContext(null);

/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {
  en: {
    appName: "SNAPWASTE",
    tagline: "Snap & Clean",
    subtitle: "Smart Waste Reporting & Cleanup",

    citizen: "Citizen",
    municipality: "Municipality",
    crew: "Cleanup Crew",

    citizenDesc: "Report waste and track cleanup",
    municipalityDesc: "Manage reports and cleanup operations",
    crewDesc: "View and complete assigned tasks",

    selectRole: "Select Login",
    chooseRole: "Choose how you want to continue",

    login: "Login",
    logout: "Logout",
    back: "Back",

    citizenLogin: "Citizen Login",
    municipalityLogin: "Municipality Login",
    crewLogin: "Cleanup Crew Login",

    mobileNumber: "Mobile Number",
    aadhaar: "Aadhaar Number",
    municipalityId: "Municipality ID",
    officialEmail: "Official Email",
    crewId: "Crew ID",
    password: "Password",

    otp: "OTP",
    sendOtp: "Send OTP",
    verifyOtp: "Verify OTP",
    demoOtp: "Demo: Any 6-digit OTP is accepted",

    dashboard: "Dashboard",
    reportWaste: "Report Waste",
    myReports: "My Reports",
    notifications: "Notifications",
    profile: "Profile",

    overview: "Overview",
    liveReports: "Live Reports",
    hotspots: "Hotspots",
    crewManagement: "Crew Management",
    analytics: "Analytics",
    auditLogs: "Audit Logs",

    assignedTasks: "Assigned Tasks",
    completedTasks: "Completed Tasks",
    activeTask: "Active Task",

    snapReport: "Snap & Report",
    reportTitle: "Report Waste",
    capturePhoto: "Capture Live Photo",
    location: "Location",
    getLocation: "Get Current Location",
    submitReport: "Submit Report",

    aiVerification: "AI Verification",
    verifying: "Verifying...",
    verified: "Verified",
    pending: "Pending",
    rejected: "Rejected",

    recentReports: "Recent Reports",
    reportId: "Report ID",
    date: "Date",
    status: "Status",
    action: "Action",
    view: "View",
    assign: "Assign Crew",

    totalReports: "Total Reports",
    pendingReports: "Pending Reports",
    activeReports: "Active Reports",
    cleanedReports: "Cleaned Reports",
    hotspotCount: "Hotspots",

    liveMap: "Live Report Map",

    citizenReports: "Citizen Reports",
    reportDetails: "Report Details",
    wasteType: "Waste Type",
    address: "Address",
    reportedBy: "Reported By",
    reportedAt: "Reported At",

    crewName: "Crew Name",
    assignedTo: "Assigned To",
    taskLocation: "Task Location",
    startTask: "Start Task",
    markCleaned: "Mark as Cleaned",
    uploadProof: "Upload Cleanup Proof",

    welcome: "Welcome",
    welcomeText: "Together we can build a cleaner and greener city.",

    language: "Language",
    english: "English",
    telugu: "తెలుగు",
    hindi: "हिंदी",

    government: "Civic Waste Management Platform",
    secure: "Secure • Transparent • Accountable",

    menu: "Menu",
    close: "Close",

    success: "Success",
    reportSubmitted: "Waste report submitted successfully.",
    taskCompleted: "Cleanup task completed successfully.",

    pendingVerification: "Waiting for AI verification",
    aiApproved: "AI verification completed",
    crewAssigned: "Crew assigned",
    cleanupProgress: "Cleanup in progress",
    cleanupCompleted: "Cleanup completed",

    search: "Search",
    all: "All",

    city: "Smart City Municipal Corporation",

    heroTitle: "Report Waste. Track Cleanup. Keep Your City Clean.",

    heroText:
      "SnapWaste connects citizens, municipalities and cleanup crews through transparent digital waste reporting.",

    getStarted: "Get Started",
    howItWorks: "How It Works",

    step1: "Snap & Report",
    step1Text: "Capture a live waste photo and attach GPS location.",

    step2: "AI Verification",
    step2Text:
      "AI checks the image and identifies duplicate or invalid reports.",

    step3: "Municipality Action",
    step3Text:
      "Municipality verifies the report and assigns a nearby crew.",

    step4: "Clean & Confirm",
    step4Text: "Crew cleans the location and submits after-photo proof.",

    footerText: "Smart Waste Reporting & Cleanup Platform",

    emergency: "Emergency Access",
    settings: "Settings",

    emailAddress: "Email Address",
    enterEmailPassword: "Please enter your email and password.",
    invalidEmail: "Please enter a valid email address.",
    invalidCredentials:
      "Incorrect email or password. Try the demo credentials below.",
    showPassword: "Show",
    hidePassword: "Hide",
    signingIn: "Signing in...",
    demoCredentials: "Demo credentials",
    autofill: "Autofill",

    peopleWorkforce: "People & Workforce",
    peopleHeading: "Citizens, Crews & Municipal Staff",
    demoData: "Demo data",
    registeredCitizens: "Registered Citizens",
    activeReporters: "Active Reporters",
    cleanupWorkers: "Cleanup Workers",
    municipalStaff: "Municipal Staff",
    workforceBreakdown: "Workforce Breakdown",
    participationCoverage: "Participation & Coverage",
    wardPeople: "Ward-wise People",
    ward: "Ward",
    population: "Population",
    registered: "Registered",
    workers: "Workers",
    reportsLabel: "Reports",
    totalWorkforce: "Total workforce",

    coreLabel: "Core Innovation",
    coreTitle: "Reports You Can Trust",
    coreText:
      "Every report is captured live and geotagged, so the municipality gets real, verifiable evidence.",
    feat1: "Live Camera Only",
    feat1Text:
      "Photos are taken in the moment through the in-app camera. Gallery uploads are blocked, so old or fake images cannot be submitted.",
    feat2: "GPS Location Tracking",
    feat2Text:
      "The exact coordinates are attached automatically, helping crews reach the spot fast and map real hotspots.",
    feat3: "AI Duplicate Check",
    feat3Text:
      "AI checks the photo and location to flag duplicate or invalid reports before they reach the municipality.",
    feat4: "Before & After Proof",
    feat4Text:
      "Crews upload an after-cleanup photo, so every closed report has visible proof of completion.",
    chooseMethod: "Login with",
    loginWithMobile: "Mobile Number",
    loginWithAadhaar: "Aadhaar Number"
  },

  te: {
    appName: "స్నాప్‌వేస్ట్",
    tagline: "స్నాప్ & క్లీన్",
    subtitle: "స్మార్ట్ వ్యర్థాల నివేదిక & శుభ్రత",

    citizen: "పౌరుడు",
    municipality: "మున్సిపాలిటీ",
    crew: "శుభ్రత సిబ్బంది",

    citizenDesc: "వ్యర్థాలను నివేదించి శుభ్రపరిచే స్థితిని తెలుసుకోండి",
    municipalityDesc: "నివేదికలు మరియు శుభ్రత కార్యకలాపాలను నిర్వహించండి",
    crewDesc: "కేటాయించిన పనులను చూడండి మరియు పూర్తి చేయండి",

    selectRole: "లాగిన్ ఎంచుకోండి",
    chooseRole: "కొనసాగడానికి మీ పాత్రను ఎంచుకోండి",

    login: "లాగిన్",
    logout: "లాగ్ అవుట్",
    back: "వెనుకకు",

    citizenLogin: "పౌర లాగిన్",
    municipalityLogin: "మున్సిపాలిటీ లాగిన్",
    crewLogin: "శుభ్రత సిబ్బంది లాగిన్",

    mobileNumber: "మొబైల్ నంబర్",
    aadhaar: "ఆధార్ నంబర్",
    municipalityId: "మున్సిపాలిటీ ID",
    officialEmail: "అధికారిక ఇమెయిల్",
    crewId: "సిబ్బంది ID",
    password: "పాస్‌వర్డ్",

    otp: "OTP",
    sendOtp: "OTP పంపండి",
    verifyOtp: "OTP ధృవీకరించండి",
    demoOtp: "డెమో: ఏదైనా 6 అంకెల OTP అంగీకరించబడుతుంది",

    dashboard: "డ్యాష్‌బోర్డ్",
    reportWaste: "వ్యర్థాలను నివేదించండి",
    myReports: "నా నివేదికలు",
    notifications: "నోటిఫికేషన్లు",
    profile: "ప్రొఫైల్",

    overview: "అవలోకనం",
    liveReports: "లైవ్ నివేదికలు",
    hotspots: "హాట్‌స్పాట్‌లు",
    crewManagement: "సిబ్బంది నిర్వహణ",
    analytics: "విశ్లేషణ",
    auditLogs: "ఆడిట్ లాగ్స్",

    assignedTasks: "కేటాయించిన పనులు",
    completedTasks: "పూర్తయిన పనులు",
    activeTask: "క్రియాశీల పని",

    snapReport: "స్నాప్ & నివేదించండి",
    reportTitle: "వ్యర్థాల నివేదిక",
    capturePhoto: "లైవ్ ఫోటో తీయండి",
    location: "స్థానం",
    getLocation: "ప్రస్తుత స్థానం పొందండి",
    submitReport: "నివేదిక పంపండి",

    aiVerification: "AI ధృవీకరణ",
    verifying: "ధృవీకరిస్తోంది...",
    verified: "ధృవీకరించబడింది",
    pending: "పెండింగ్",
    rejected: "తిరస్కరించబడింది",

    recentReports: "ఇటీవలి నివేదికలు",
    reportId: "నివేదిక ID",
    date: "తేదీ",
    status: "స్థితి",
    action: "చర్య",
    view: "చూడండి",
    assign: "సిబ్బందిని కేటాయించండి",

    totalReports: "మొత్తం నివేదికలు",
    pendingReports: "పెండింగ్ నివేదికలు",
    activeReports: "క్రియాశీల నివేదికలు",
    cleanedReports: "శుభ్రం చేసినవి",
    hotspotCount: "హాట్‌స్పాట్‌లు",

    liveMap: "లైవ్ నివేదిక మ్యాప్",

    citizenReports: "పౌర నివేదికలు",
    reportDetails: "నివేదిక వివరాలు",
    wasteType: "వ్యర్థాల రకం",
    address: "చిరునామా",
    reportedBy: "నివేదించిన వారు",
    reportedAt: "నివేదించిన సమయం",

    crewName: "సిబ్బంది పేరు",
    assignedTo: "కేటాయించిన వారు",
    taskLocation: "పని స్థానం",
    startTask: "పని ప్రారంభించండి",
    markCleaned: "శుభ్రం చేసినట్లు గుర్తించండి",
    uploadProof: "శుభ్రత ఆధారం అప్‌లోడ్ చేయండి",

    welcome: "స్వాగతం",
    welcomeText:
      "కలిసి మన నగరాన్ని పరిశుభ్రంగా మరియు పచ్చగా మార్చుకుందాం.",

    language: "భాష",
    english: "English",
    telugu: "తెలుగు",
    hindi: "हिंदी",

    government: "పౌర వ్యర్థాల నిర్వహణ వేదిక",
    secure: "సురక్షితం • పారదర్శకం • బాధ్యతాయుతం",

    menu: "మెను",
    close: "మూసివేయి",

    success: "విజయం",
    reportSubmitted: "వ్యర్థాల నివేదిక విజయవంతంగా పంపబడింది.",
    taskCompleted: "శుభ్రత పని విజయవంతంగా పూర్తయింది.",

    pendingVerification: "AI ధృవీకరణ కోసం వేచి ఉంది",
    aiApproved: "AI ధృవీకరణ పూర్తయింది",
    crewAssigned: "సిబ్బంది కేటాయించబడింది",
    cleanupProgress: "శుభ్రత కొనసాగుతోంది",
    cleanupCompleted: "శుభ్రత పూర్తయింది",

    search: "వెతకండి",
    all: "అన్నీ",

    city: "స్మార్ట్ సిటీ మున్సిపల్ కార్పొరేషన్",

    heroTitle:
      "వ్యర్థాలను నివేదించండి. శుభ్రతను ట్రాక్ చేయండి. నగరాన్ని పరిశుభ్రంగా ఉంచండి.",

    heroText:
      "స్నాప్‌వేస్ట్ పౌరులు, మున్సిపాలిటీలు మరియు శుభ్రత సిబ్బందిని డిజిటల్ వ్యర్థాల నివేదిక ద్వారా కలుపుతుంది.",

    getStarted: "ప్రారంభించండి",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",

    step1: "స్నాప్ & నివేదించండి",
    step1Text: "లైవ్ వ్యర్థాల ఫోటో తీసి GPS స్థానాన్ని జోడించండి.",

    step2: "AI ధృవీకరణ",
    step2Text:
      "AI చిత్రాన్ని తనిఖీ చేసి నకిలీ లేదా చెల్లని నివేదికలను గుర్తిస్తుంది.",

    step3: "మున్సిపాలిటీ చర్య",
    step3Text:
      "మున్సిపాలిటీ నివేదికను ధృవీకరించి సమీప సిబ్బందిని కేటాయిస్తుంది.",

    step4: "శుభ్రపరచి నిర్ధారించండి",
    step4Text: "సిబ్బంది ప్రాంతాన్ని శుభ్రపరిచి తర్వాతి ఫోటోను పంపుతుంది.",

    footerText: "స్మార్ట్ వ్యర్థాల నివేదిక & శుభ్రత వేదిక",

    emergency: "అత్యవసర ప్రాప్యత",
    settings: "సెట్టింగ్స్",

    emailAddress: "ఇమెయిల్ చిరునామా",
    invalidCredentials: "ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పు",
    signingIn: "లాగిన్ అవుతోంది...",
    demoCredentials: "డెమో వివరాలు",
    autofill: "ఆటోఫిల్",
    peopleWorkforce: "ప్రజలు & సిబ్బంది",
    registeredCitizens: "నమోదైన పౌరులు",
    cleanupWorkers: "శుభ్రత కార్మికులు",
    municipalStaff: "మున్సిపల్ సిబ్బంది"
  },

  hi: {
    appName: "स्नैपवेस्ट",
    tagline: "स्नैप & क्लीन",
    subtitle: "स्मार्ट कचरा रिपोर्टिंग और सफाई",

    citizen: "नागरिक",
    municipality: "नगरपालिका",
    crew: "सफाई दल",

    citizenDesc: "कचरे की रिपोर्ट करें और सफाई की स्थिति ट्रैक करें",
    municipalityDesc: "रिपोर्ट और सफाई कार्यों का प्रबंधन करें",
    crewDesc: "सौंपे गए कार्य देखें और पूरा करें",

    selectRole: "लॉगिन चुनें",
    chooseRole: "जारी रखने के लिए अपनी भूमिका चुनें",

    login: "लॉगिन",
    logout: "लॉगआउट",
    back: "वापस",

    citizenLogin: "नागरिक लॉगिन",
    municipalityLogin: "नगरपालिका लॉगिन",
    crewLogin: "सफाई दल लॉगिन",

    mobileNumber: "मोबाइल नंबर",
    aadhaar: "आधार नंबर",
    municipalityId: "नगरपालिका ID",
    officialEmail: "आधिकारिक ईमेल",
    crewId: "कर्मचारी ID",
    password: "पासवर्ड",

    otp: "OTP",
    sendOtp: "OTP भेजें",
    verifyOtp: "OTP सत्यापित करें",
    demoOtp: "डेमो: कोई भी 6 अंकों का OTP स्वीकार किया जाएगा",

    dashboard: "डैशबोर्ड",
    reportWaste: "कचरे की रिपोर्ट करें",
    myReports: "मेरी रिपोर्ट",
    notifications: "सूचनाएं",
    profile: "प्रोफ़ाइल",

    overview: "अवलोकन",
    liveReports: "लाइव रिपोर्ट",
    hotspots: "हॉटस्पॉट",
    crewManagement: "दल प्रबंधन",
    analytics: "विश्लेषण",
    auditLogs: "ऑडिट लॉग",

    assignedTasks: "सौंपे गए कार्य",
    completedTasks: "पूर्ण कार्य",
    activeTask: "सक्रिय कार्य",

    snapReport: "स्नैप और रिपोर्ट",
    reportTitle: "कचरा रिपोर्ट",
    capturePhoto: "लाइव फोटो लें",
    location: "स्थान",
    getLocation: "वर्तमान स्थान प्राप्त करें",
    submitReport: "रिपोर्ट भेजें",

    aiVerification: "AI सत्यापन",
    verifying: "सत्यापन हो रहा है...",
    verified: "सत्यापित",
    pending: "लंबित",
    rejected: "अस्वीकृत",

    recentReports: "हाल की रिपोर्ट",
    reportId: "रिपोर्ट ID",
    date: "तारीख",
    status: "स्थिति",
    action: "कार्य",
    view: "देखें",
    assign: "दल नियुक्त करें",

    totalReports: "कुल रिपोर्ट",
    pendingReports: "लंबित रिपोर्ट",
    activeReports: "सक्रिय रिपोर्ट",
    cleanedReports: "साफ की गई रिपोर्ट",
    hotspotCount: "हॉटस्पॉट",

    liveMap: "लाइव रिपोर्ट मैप",

    citizenReports: "नागरिक रिपोर्ट",
    reportDetails: "रिपोर्ट विवरण",
    wasteType: "कचरे का प्रकार",
    address: "पता",
    reportedBy: "रिपोर्ट करने वाला",
    reportedAt: "रिपोर्ट का समय",

    crewName: "दल का नाम",
    assignedTo: "नियुक्त",
    taskLocation: "कार्य स्थान",
    startTask: "कार्य शुरू करें",
    markCleaned: "सफाई पूरी करें",
    uploadProof: "सफाई का प्रमाण अपलोड करें",

    welcome: "स्वागत है",
    welcomeText: "मिलकर अपने शहर को स्वच्छ और हरा-भरा बनाएं।",

    language: "भाषा",
    english: "English",
    telugu: "తెలుగు",
    hindi: "हिंदी",

    government: "नागरिक कचरा प्रबंधन प्लेटफॉर्म",
    secure: "सुरक्षित • पारदर्शी • जवाबदेह",

    menu: "मेनू",
    close: "बंद करें",

    success: "सफलता",
    reportSubmitted: "कचरा रिपोर्ट सफलतापूर्वक भेज दी गई।",
    taskCompleted: "सफाई कार्य सफलतापूर्वक पूरा हुआ।",

    pendingVerification: "AI सत्यापन की प्रतीक्षा",
    aiApproved: "AI सत्यापन पूरा हुआ",
    crewAssigned: "दल नियुक्त किया गया",
    cleanupProgress: "सफाई जारी है",
    cleanupCompleted: "सफाई पूरी हुई",

    search: "खोजें",
    all: "सभी",

    city: "स्मार्ट सिटी नगर निगम",

    heroTitle:
      "कचरे की रिपोर्ट करें। सफाई ट्रैक करें। अपने शहर को स्वच्छ रखें।",

    heroText:
      "स्नैपवेस्ट नागरिकों, नगरपालिकाओं और सफाई दलों को डिजिटल कचरा रिपोर्टिंग के माध्यम से जोड़ता है।",

    getStarted: "शुरू करें",
    howItWorks: "यह कैसे काम करता है",

    step1: "स्नैप और रिपोर्ट",
    step1Text: "लाइव कचरे की फोटो लें और GPS स्थान जोड़ें।",

    step2: "AI सत्यापन",
    step2Text:
      "AI फोटो की जांच करता है और डुप्लिकेट या गलत रिपोर्ट पहचानता है।",

    step3: "नगरपालिका कार्रवाई",
    step3Text:
      "नगरपालिका रिपोर्ट सत्यापित करके नजदीकी सफाई दल नियुक्त करती है।",

    step4: "सफाई और पुष्टि",
    step4Text: "सफाई दल स्थान को साफ करके बाद की फोटो भेजता है।",

    footerText: "स्मार्ट कचरा रिपोर्टिंग और सफाई प्लेटफॉर्म",

    emergency: "आपातकालीन पहुंच",
    settings: "सेटिंग्स",

    emailAddress: "ईमेल पता",
    invalidCredentials: "ईमेल या पासवर्ड गलत है",
    signingIn: "साइन इन हो रहा है...",
    demoCredentials: "डेमो क्रेडेंशियल",
    autofill: "ऑटोफिल",
    peopleWorkforce: "लोग और कार्यबल",
    registeredCitizens: "पंजीकृत नागरिक",
    cleanupWorkers: "सफाई कर्मी",
    municipalStaff: "नगरपालिका स्टाफ"
  }
};

/* =========================================================
   REPORT DATA
   ========================================================= */

const reportsData = [
  { id: "SW-1024", location: "Main Road, Ward 12", type: "Mixed Waste", priority: "High", status: "Pending", citizen: "Sai Charan", time: "10 min ago", crew: "-" },
  { id: "SW-1023", location: "Market Area, Ward 8", type: "Plastic Waste", priority: "Medium", status: "Active", citizen: "Ravi Kumar", time: "32 min ago", crew: "Crew C-14" },
  { id: "SW-1022", location: "School Road, Ward 5", type: "Construction Waste", priority: "High", status: "Cleaned", citizen: "Anitha", time: "1 hr ago", crew: "Crew C-09" },
  { id: "SW-1021", location: "Bus Stand, Ward 3", type: "Plastic Waste", priority: "Medium", status: "Active", citizen: "Rahul", time: "2 hrs ago", crew: "Crew C-07" },
  { id: "SW-1020", location: "Lake Road, Ward 10", type: "Organic Waste", priority: "Low", status: "Cleaned", citizen: "Priya", time: "3 hrs ago", crew: "Crew C-11" }
];

/* Extra demo reports - used by the municipality detail views */
const moreReports = [
  { id: "SW-1027", location: "Hospital Road, Ward 9", type: "Electronic Waste", priority: "Medium", status: "Pending", citizen: "Fatima", time: "25 min ago", crew: "-" },
  { id: "SW-1026", location: "Railway Colony, Ward 15", type: "Mixed Waste", priority: "High", status: "Pending", citizen: "Kiran", time: "18 min ago", crew: "-" },
  { id: "SW-1025", location: "Temple Street, Ward 6", type: "Organic Waste", priority: "Medium", status: "Pending", citizen: "Lakshmi", time: "5 min ago", crew: "-" },
  { id: "SW-1019", location: "Park Avenue, Ward 7", type: "Mixed Waste", priority: "Medium", status: "Cleaned", citizen: "Suresh", time: "4 hrs ago", crew: "Crew C-14" },
  { id: "SW-1018", location: "Old Town, Ward 2", type: "Plastic Waste", priority: "Medium", status: "Cleaned", citizen: "Meena", time: "5 hrs ago", crew: "Crew C-09" },
  { id: "SW-1017", location: "Canal Bank, Ward 11", type: "Organic Waste", priority: "Low", status: "Active", citizen: "Vikram", time: "6 hrs ago", crew: "Crew C-11" },
  { id: "SW-1016", location: "Gandhi Chowk, Ward 4", type: "Construction Waste", priority: "High", status: "Cleaned", citizen: "Divya", time: "1 day ago", crew: "Crew C-07" },
  { id: "SW-1015", location: "Water Tank Road, Ward 13", type: "Plastic Waste", priority: "Low", status: "Cleaned", citizen: "Arjun", time: "1 day ago", crew: "Crew C-11" }
];

/* Demo map positions per ward (around Narasaraopet) */
const MAP_CENTER = [16.2347, 80.048];

const wardCoords = {
  2: [16.2418, 80.0412],
  3: [16.2326, 80.0451],
  4: [16.2371, 80.0498],
  5: [16.2392, 80.0536],
  6: [16.2349, 80.0422],
  7: [16.2302, 80.0508],
  8: [16.2361, 80.0462],
  9: [16.2284, 80.0476],
  10: [16.2431, 80.0489],
  11: [16.2405, 80.0551],
  12: [16.2338, 80.0527],
  13: [16.2273, 80.0431],
  14: [16.2377, 80.0399],
  15: [16.2296, 80.0554]
};

/* Give each demo report a map position: ward centre + small offset
   (derived from the report number so reports in a ward don't overlap) */
const withCoords = (report) => {
  const ward = Number((report.location.match(/Ward (\d+)/) || [])[1]);
  const base = wardCoords[ward] || MAP_CENTER;
  const n = parseInt(report.id.slice(3), 10) || 0;

  return {
    ...report,
    lat: base[0] + (((n * 37) % 21) - 10) * 0.00005,
    lng: base[1] + (((n * 53) % 21) - 10) * 0.00005
  };
};

const cityReports = [...reportsData, ...moreReports]
  .map(withCoords)
  .sort((a, b) => b.id.localeCompare(a.id));

/* Headline numbers shown on the municipality overview cards */
const municipalityCounts = {
  total: 248,
  pending: 42,
  active: 17,
  cleaned: 189
};

/* Reports belonging to the logged-in citizen (demo): 12 total */
const myReportsData = Array.from({ length: 12 }, (_, i) => {
  const base = reportsData[i % reportsData.length];
  const status = i === 0 ? "Pending" : i < 3 ? "Active" : "Cleaned";

  return {
    ...base,
    id: "SW-" + (1024 - i),
    citizen: "Sai Charan",
    status,
    crew:
      status === "Pending"
        ? "-"
        : base.crew === "-"
        ? "Crew C-14"
        : base.crew,
    time: i === 0 ? "10 min ago" : i === 1 ? "1 day ago" : i + " days ago"
  };
});

/* Citizen stat-card popups */
const CITIZEN_DETAIL = {
  total: { eyebrow: "All reports", title: "Total Reports", note: "Every waste report you have submitted.", status: null },
  pending: { eyebrow: "Needs action", title: "Pending Reports", note: "Waiting for AI verification and crew assignment.", status: "Pending" },
  active: { eyebrow: "Crews deployed", title: "Active Reports", note: "A cleanup crew is currently working on these.", status: "Active" },
  cleaned: { eyebrow: "Completed", title: "Cleaned Reports", note: "Cleanup finished and confirmed.", status: "Cleaned" }
};

/* Editable profiles (demo) */
const initialProfiles = {
  citizen: { name: "E. Sai Charan", mobile: "", aadhaar: "", city: "Narasaraopet" },
  crew: { name: "Green Warriors", mobile: "9848011201", aadhaar: "", city: "Narasaraopet" }
};

const initialsOf = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

/* "16.2357° N, 80.0497° E" */
const formatCoords = (lat, lng) =>
  `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lng).toFixed(
    4
  )}° ${lng >= 0 ? "E" : "W"}`;

/* =========================================================
   CREW DATA
   ========================================================= */

const crewData = [
  { id: "C-14", name: "Green Warriors", ward: "Ward 8 · Market Area", members: 5, supervisor: "Ramesh Babu", status: "Active", tasks: 11, completed: 6 },
  { id: "C-09", name: "Clean City Team", ward: "Ward 5 · School Road", members: 4, supervisor: "Sunitha Rao", status: "Available", tasks: 6, completed: 6 },
  { id: "C-07", name: "Eco Cleaners", ward: "Ward 3 · Bus Stand", members: 6, supervisor: "Ramesh Babu", status: "Active", tasks: 7, completed: 5 },
  { id: "C-11", name: "Swachh Squad", ward: "Ward 10 · Lake Road", members: 5, supervisor: "Venkat Reddy", status: "Active", tasks: 9, completed: 7 },
  { id: "C-03", name: "Urban Sweepers", ward: "Ward 12 · Main Road", members: 6, supervisor: "Anil Kumar", status: "Active", tasks: 10, completed: 8 },
  { id: "C-05", name: "Green Guardians", ward: "Ward 15 · Railway Colony", members: 4, supervisor: "Sunitha Rao", status: "Available", tasks: 5, completed: 5 },
  { id: "C-12", name: "Clean Sweep", ward: "Ward 7 · Park Avenue", members: 5, supervisor: "Venkat Reddy", status: "Active", tasks: 6, completed: 3 },
  { id: "C-18", name: "Eco Force", ward: "Ward 2 · Old Town", members: 4, supervisor: "Anil Kumar", status: "Available", tasks: 4, completed: 4 }
];

/* Ward supervisors (demo) */
const supervisorsData = [
  { name: "Ramesh Babu", wards: "Ward 3, Ward 8", crews: 2, phone: "+91 98480 11201", status: "On duty" },
  { name: "Sunitha Rao", wards: "Ward 5, Ward 15", crews: 2, phone: "+91 98480 11202", status: "On duty" },
  { name: "Venkat Reddy", wards: "Ward 7, Ward 10", crews: 2, phone: "+91 98480 11203", status: "On duty" },
  { name: "Anil Kumar", wards: "Ward 2, Ward 12", crews: 2, phone: "+91 98480 11204", status: "On duty" },
  { name: "Lakshmi Devi", wards: "Ward 4, Ward 6", crews: 1, phone: "+91 98480 11205", status: "Off duty" },
  { name: "Prasad Rao", wards: "Ward 9, Ward 13", crews: 1, phone: "+91 98480 11206", status: "On duty" }
];

/* Municipal officers (demo) */
const officersData = [
  { name: "Dr. K. Srinivas", designation: "Municipal Commissioner", department: "Administration", handled: 248 },
  { name: "P. Madhavi", designation: "Health Officer", department: "Public Health", handled: 96 },
  { name: "S. Nageswara Rao", designation: "Sanitary Inspector", department: "Sanitation", handled: 84 },
  { name: "B. Anusha", designation: "Assistant Engineer", department: "Engineering", handled: 41 },
  { name: "M. Harish", designation: "Verification Officer", department: "Report Verification", handled: 132 },
  { name: "G. Swathi", designation: "Ward Officer", department: "Ward Operations", handled: 67 }
];

/* Tasks assigned to the logged-in cleanup crew (Green Warriors, C-14) */
const crewTasksData = [
  { id: "SW-1014", location: "Gandhi Nagar, Ward 14", type: "Mixed Waste", priority: "High", status: "Pending", time: "Assigned 10 min ago" },
  { id: "SW-1013", location: "Fish Market, Ward 8", type: "Organic Waste", priority: "Medium", status: "Pending", time: "Assigned 25 min ago" },
  { id: "SW-1012", location: "Bus Depot, Ward 3", type: "Plastic Waste", priority: "High", status: "Pending", time: "Assigned 40 min ago" },
  { id: "SW-1023", location: "Market Area, Ward 8", type: "Plastic Waste", priority: "High", status: "Active", time: "Started 32 min ago" },
  { id: "SW-1010", location: "Temple Street, Ward 6", type: "Construction Waste", priority: "Medium", status: "Active", time: "Started 1 hr ago" },
  { id: "SW-1009", location: "Lake Road, Ward 10", type: "Organic Waste", priority: "Low", status: "Cleaned", time: "Done 1 hr ago" },
  { id: "SW-1008", location: "School Road, Ward 5", type: "Construction Waste", priority: "High", status: "Cleaned", time: "Done 2 hrs ago" },
  { id: "SW-1007", location: "Park Avenue, Ward 7", type: "Mixed Waste", priority: "Medium", status: "Cleaned", time: "Done 3 hrs ago" },
  { id: "SW-1006", location: "Old Town, Ward 2", type: "Plastic Waste", priority: "Medium", status: "Cleaned", time: "Done 4 hrs ago" },
  { id: "SW-1005", location: "Hospital Road, Ward 9", type: "Electronic Waste", priority: "High", status: "Cleaned", time: "Done 5 hrs ago" },
  { id: "SW-1004", location: "Canal Bank, Ward 11", type: "Organic Waste", priority: "Low", status: "Cleaned", time: "Done 6 hrs ago" }
];

/* =========================================================
   DEMO ACCOUNTS (prototype only - replace with real auth API)
   ========================================================= */

const DEMO_ACCOUNTS = {
  municipality: [
    {
      email: "admin@narasaraopet.gov.in",
      password: "Muni@2026",
      name: "Municipal Administrator",
      initials: "MA"
    }
  ],
  crew: [
    {
      email: "greenwarriors@snapwaste.in",
      password: "Crew@2026",
      name: "Green Warriors",
      initials: "GW"
    }
  ]
};

/* =========================================================
   PEOPLE & WORKFORCE DATA (demo)
   ========================================================= */

const wardPeople = [
  { ward: "Ward 3 · Bus Stand", population: 15600, citizens: 2860, reporters: 590, workers: 18, reports: 41 },
  { ward: "Ward 5 · School Road", population: 13200, citizens: 2480, reporters: 510, workers: 20, reports: 28 },
  { ward: "Ward 8 · Market Area", population: 24800, citizens: 4210, reporters: 890, workers: 28, reports: 62 },
  { ward: "Ward 10 · Lake Road", population: 12100, citizens: 2190, reporters: 496, workers: 16, reports: 31 },
  { ward: "Ward 12 · Main Road", population: 19500, citizens: 3560, reporters: 720, workers: 22, reports: 52 },
  { ward: "Ward 15 · Railway Colony", population: 16400, citizens: 3120, reporters: 640, workers: 24, reports: 34 }
];

const municipalStaffData = {
  officers: 22,
  supervisors: 15,
  crews: 24,
  crewsOnDuty: 12,
  attendance: 94
};

/* =========================================================
   SHARED-DATA HELPERS
   ========================================================= */

/* Headline counts: demo numbers + reports submitted in this session */
function useCityStats() {
  const { submittedReports } = useContext(AppDataContext);
  const n = submittedReports.length;

  return {
    total: municipalityCounts.total + n,
    pending: municipalityCounts.pending + n,
    active: municipalityCounts.active,
    cleaned: municipalityCounts.cleaned
  };
}

/* Newest citizen submissions first, then the demo reports */
function useAllReports() {
  const { submittedReports } = useContext(AppDataContext);

  return [...submittedReports, ...cityReports];
}

/* =========================================================
   ICON / LOGO / LANGUAGE SELECTOR
   ========================================================= */

function Icon({ name, size = 20 }) {
  const icons = {
    home: "⌂",
    camera: "📷",
    location: "📍",
    report: "📋",
    bell: "🔔",
    user: "👤",
    building: "🏛️",
    crew: "🧹",
    map: "🗺️",
    hotspot: "🔥",
    analytics: "📊",
    settings: "⚙️",
    logout: "↪",
    arrow: "→",
    check: "✓",
    clock: "◷",
    warning: "⚠",
    search: "⌕",
    menu: "☰",
    close: "×",
    shield: "🛡️",
    phone: "📱",
    lock: "🔒",
    photo: "🖼️",
    trash: "♻️"
  };

  return (
    <span className="icon" style={{ fontSize: size }}>
      {icons[name] || "•"}
    </span>
  );
}

function Logo({ t }) {
  return (
    <div className="brand">
      <div className="brand-icon">♻</div>

      <div>
        <div className="brand-name">{t.appName}</div>
        <div className="brand-tagline">{t.tagline}</div>
      </div>
    </div>
  );
}

function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="language-selector">
      <span className="language-globe">🌐</span>

      <button
        className={language === "en" ? "language active" : "language"}
        onClick={() => setLanguage("en")}
      >
        English
      </button>

      <button
        className={language === "te" ? "language active" : "language"}
        onClick={() => setLanguage("te")}
      >
        తెలుగు
      </button>

      <button
        className={language === "hi" ? "language active" : "language"}
        onClick={() => setLanguage("hi")}
      >
        हिंदी
      </button>
    </div>
  );
}

/* =========================================================
   LEAFLET MAP (OpenStreetMap tiles, no API key, no backend)
   reports: [{ id, lat, lng, status, type, location, photo?, marker? }]
   ========================================================= */

const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ])
  );

const popupHtml = (r) =>
  `<strong>${esc(r.id)}</strong><br/>` +
  (r.type
    ? `${esc(r.type)}${r.status ? " · " + esc(r.status) : ""}<br/>`
    : "") +
  `<span>${esc(r.location)}</span>` +
  (r.photo ? `<img src="${r.photo}" alt="" />` : "");

/* Leaflet is loaded from a CDN the first time a map is shown,
   so no `npm install leaflet` is needed (internet connection required). */
const LEAFLET_URL = "https://unpkg.com/leaflet@1.9.4/dist";
let leafletPromise = null;

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);

  if (leafletPromise) return leafletPromise;

  leafletPromise = new Promise((resolve, reject) => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = `${LEAFLET_URL}/leaflet.css`;
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = `${LEAFLET_URL}/leaflet.js`;
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = () => {
      leafletPromise = null;
      reject(new Error("Leaflet failed to load"));
    };
    document.body.appendChild(script);
  });

  return leafletPromise;
}

function LeafletMap({ reports, height = 360 }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const reportsRef = useRef(reports);
  const lastFitRef = useRef("");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  reportsRef.current = reports;

  const valid = reports.filter(
    (r) => typeof r.lat === "number" && typeof r.lng === "number"
  );

  /* changes when markers are added / moved / change status */
  const markerSig = valid
    .map((r) => `${r.id}:${r.lat}:${r.lng}:${r.status}`)
    .join("|");

  /* changes only when the set of positions changes (used to re-fit the view) */
  const positionSig = valid.map((r) => `${r.id}:${r.lat}:${r.lng}`).join("|");

  /* create the map once */
  useEffect(() => {
    let cancelled = false;
    let map = null;
    let timer = null;

    loadLeaflet()
      .then((L) => {
        if (cancelled || !containerRef.current) return;

        map = L.map(containerRef.current, {
          center: MAP_CENTER,
          zoom: 14,
          scrollWheelZoom: false
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        layerRef.current = L.layerGroup().addTo(map);
        mapRef.current = map;

        /* make sure tiles fill the container after the first layout */
        timer = setTimeout(() => map.invalidateSize(), 0);

        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);

      if (map) map.remove();

      mapRef.current = null;
      layerRef.current = null;
      lastFitRef.current = "";
    };
  }, []);

  /* redraw markers (runs once the map exists, then whenever markers change) */
  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    const layer = layerRef.current;

    if (!L || !map || !layer) return;

    layer.clearLayers();

    const points = [];

    reportsRef.current.forEach((r) => {
      if (typeof r.lat !== "number" || typeof r.lng !== "number") return;

      const kind = r.marker || String(r.status || "pending").toLowerCase();

      const icon = L.divIcon({
        className: `sw-marker sw-marker-${kind}`,
        html: "<span></span>",
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -12]
      });

      L.marker([r.lat, r.lng], { icon })
        .bindPopup(popupHtml(r))
        .addTo(layer);

      points.push([r.lat, r.lng]);
    });

    /* move the view only when positions changed, so panning/zooming
       is not reset every time the parent re-renders */
    if (points.length && lastFitRef.current !== positionSig) {
      lastFitRef.current = positionSig;

      if (points.length === 1) {
        map.setView(points[0], 16);
      } else {
        map.fitBounds(points, { padding: [30, 30], maxZoom: 16 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerSig, ready]);

  return (
    <>
      <div
        ref={containerRef}
        className="leaflet-map"
        style={{ "--map-h": `${height}px`, display: failed ? "none" : undefined }}
      />

      {failed && (
        <div className="empty-state">
          The map could not load. Check your internet connection and refresh.
        </div>
      )}
    </>
  );
}

/* =========================================================
   LANDING PAGE
   ========================================================= */

function LandingPage({ t, language, setLanguage, onRole }) {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <Logo t={t} />
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🇮🇳</span>
              {t.government}
            </div>

            <h1>{t.heroTitle}</h1>

            <p>{t.heroText}</p>

            <button
              className="primary-button hero-button"
              onClick={() =>
                document
                  .getElementById("login-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t.getStarted}
              <Icon name="arrow" />
            </button>

            <div className="hero-security">
              <Icon name="shield" size={14} />
              {t.secure}
            </div>
          </div>

          <div className="hero-visual">
            <div className="city-card">
              <div className="city-card-top">
                <span>LIVE CITY STATUS</span>
                <span className="live-dot">● LIVE</span>
              </div>

              <div className="mini-map">
                <div className="mini-road one"></div>
                <div className="mini-road two"></div>
                <div className="mini-road three"></div>

                <span className="mini-pin pin-1">📍</span>
                <span className="mini-pin pin-2">📍</span>
                <span className="mini-pin pin-3">📍</span>
                <span className="mini-pin pin-4">📍</span>

                <div className="mini-hotspot">🔥</div>
              </div>

              <div className="mini-stat-row">
                <div>
                  <strong>248</strong>
                  <span>Reports</span>
                </div>

                <div>
                  <strong>42</strong>
                  <span>Active</span>
                </div>

                <div>
                  <strong>189</strong>
                  <span>Cleaned</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="core-section">
          <div className="section-heading">
            <span className="section-label">{t.coreLabel}</span>
            <h2>{t.coreTitle}</h2>
            <p className="section-sub">{t.coreText}</p>
          </div>

          <div className="core-grid">
            <div className="core-card core-main">
              <div className="core-icon">📷</div>
              <h3>{t.feat1}</h3>
              <p>{t.feat1Text}</p>
              <div className="core-tags">
                <span>● Live capture</span>
                <span>✕ No gallery uploads</span>
              </div>
            </div>

            <div className="core-card core-main">
              <div className="core-icon">📍</div>
              <h3>{t.feat2}</h3>
              <p>{t.feat2Text}</p>
              <div className="core-tags">
                <span>● Auto geotag</span>
                <span>● Hotspot mapping</span>
              </div>
            </div>

            <div className="core-card">
              <div className="core-icon">🛡️</div>
              <h3>{t.feat3}</h3>
              <p>{t.feat3Text}</p>
            </div>

            <div className="core-card">
              <div className="core-icon">✅</div>
              <h3>{t.feat4}</h3>
              <p>{t.feat4Text}</p>
            </div>
          </div>
        </section>

        <section className="how-section">
          <div className="section-heading">
            <span className="section-label">{t.howItWorks}</span>
            <h2>From Report to Cleanup</h2>
          </div>

          <div className="steps-grid">
            <StepCard number="01" icon="camera" title={t.step1} text={t.step1Text} />
            <StepCard number="02" icon="shield" title={t.step2} text={t.step2Text} />
            <StepCard number="03" icon="building" title={t.step3} text={t.step3Text} />
            <StepCard number="04" icon="check" title={t.step4} text={t.step4Text} />
          </div>
        </section>

        <section className="login-selection" id="login-section">
          <div className="section-heading">
            <span className="section-label">{t.selectRole}</span>
            <h2>{t.chooseRole}</h2>
          </div>

          <div className="role-grid">
            <RoleCard
              icon="👤"
              title={t.citizen}
              description={t.citizenDesc}
              color="green"
              onClick={() => onRole("citizen")}
            />

            <RoleCard
              icon="🏛️"
              title={t.municipality}
              description={t.municipalityDesc}
              color="blue"
              onClick={() => onRole("municipality")}
            />

            <RoleCard
              icon="🧹"
              title={t.crew}
              description={t.crewDesc}
              color="orange"
              onClick={() => onRole("crew")}
            />
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <Logo t={t} />

        <p>© 2026 SNAPWASTE · {t.footerText}</p>
      </footer>
    </div>
  );
}

function StepCard({ number, icon, title, text }) {
  return (
    <div className="step-card">
      <div className="step-number">{number}</div>

      <div className="step-icon">
        <Icon name={icon} size={24} />
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function RoleCard({ icon, title, description, color, onClick }) {
  return (
    <button className={`role-card role-${color}`} onClick={onClick}>
      <div className="role-icon">{icon}</div>

      <div className="role-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="role-arrow">→</div>
    </button>
  );
}

/* =========================================================
   LOGIN HELPERS
   ========================================================= */

/* Aadhaar: state stores digits only, display shows 1234-5678-9012 */
const formatAadhaar = (digits) => digits.replace(/(\d{4})(?=\d)/g, "$1-");

/* OTP validity window in seconds */
const OTP_SECONDS = 60;

/* 6-box OTP input: auto-advance, backspace, arrows, paste */
function OtpInput({ value, onChange, length = 6 }) {
  const refs = useRef([]);

  const focusBox = (i) => {
    const el = refs.current[Math.max(0, Math.min(i, length - 1))];

    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleChange = (i, e) => {
    let v = e.target.value.replace(/\D/g, "");

    /* box cleared */
    if (!v) {
      const next = [...value];
      next[i] = "";
      onChange(next);
      return;
    }

    /* typed over an existing digit: keep only the new one */
    if (v.length === 2 && value[i]) {
      v = v.replace(value[i], "");
    }

    /* several digits at once (autofill): spread across boxes */
    const next = [...value];
    let idx = i;

    for (const ch of v) {
      if (idx >= length) break;
      next[idx++] = ch;
    }

    onChange(next);

    /* jump to next box */
    focusBox(idx);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      e.preventDefault();

      const next = [...value];
      next[i - 1] = "";
      onChange(next);

      focusBox(i - 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(i + 1);
    }
  };

  const handlePaste = (i, e) => {
    e.preventDefault();

    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!text) return;

    const start = text.length === length ? 0 : i;
    const next = [...value];

    text.split("").forEach((ch, k) => {
      if (start + k < length) {
        next[start + k] = ch;
      }
    });

    onChange(next);
    focusBox(start + text.length);
  };

  return (
    <div className="otp-container">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          autoFocus={i === 0}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}

/* =========================================================
   LOGIN PAGE
   ========================================================= */

/* Email + password form shared by Municipality and Crew logins */
function CredentialForm({ role, t, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const demo = DEMO_ACCOUNTS[role][0];

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const submit = (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email.trim() || !password) {
      setError(t.enterEmailPassword);
      return;
    }

    if (!emailValid) {
      setError(t.invalidEmail);
      return;
    }

    setError("");
    setLoading(true);

    /* simulated network call */
    setTimeout(() => {
      const account = DEMO_ACCOUNTS[role].find(
        (a) =>
          a.email === email.trim().toLowerCase() && a.password === password
      );

      if (account) {
        onLogin(role, account);
      } else {
        setLoading(false);
        setError(t.invalidCredentials);
      }
    }, 700);
  };

  const autofill = () => {
    setEmail(demo.email);
    setPassword(demo.password);
    setError("");
  };

  const buttonClass =
    role === "municipality" ? "municipality-button" : "crew-button";

  return (
    <form className="credential-form" onSubmit={submit} noValidate>
      <div className="input-group">
        <label htmlFor={`${role}-email`}>
          {role === "municipality" ? t.officialEmail : t.emailAddress}
        </label>

        <div
          className={
            error && !emailValid
              ? "input-with-icon invalid"
              : "input-with-icon"
          }
        >
          <span>✉</span>

          <input
            id={`${role}-email`}
            type="email"
            autoComplete="username"
            placeholder={
              role === "municipality"
                ? "admin@municipality.gov.in"
                : "crew@snapwaste.in"
            }
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor={`${role}-password`}>{t.password}</label>

        <div
          className={
            error && !password ? "input-with-icon invalid" : "input-with-icon"
          }
        >
          <Icon name="lock" />

          <input
            id={`${role}-password`}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? t.hidePassword : t.showPassword}
          </button>
        </div>
      </div>

      {error && (
        <div className="form-error" role="alert">
          ⚠ {error}
        </div>
      )}

      <button
        type="submit"
        className={`primary-button ${buttonClass} full-width`}
        disabled={loading}
      >
        {loading ? t.signingIn : t.login}
        {!loading && <Icon name="arrow" />}
      </button>

      <div className="demo-credentials">
        <div className="demo-credentials-text">
          <strong>{t.demoCredentials}</strong>
          <span>{demo.email}</span>
          <span>{demo.password}</span>
        </div>

        <button type="button" className="secondary-button" onClick={autofill}>
          {t.autofill}
        </button>
      </div>
    </form>
  );
}

function LoginPage({ role, t, language, setLanguage, onLogin, onBack }) {
  const [method, setMethod] = useState("mobile"); /* "mobile" | "aadhaar" */
  const [mobile, setMobile] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(0); /* seconds left on the OTP */

  /* 60-second OTP countdown */
  useEffect(() => {
    if (!otpSent || timer <= 0) return;

    const id = setTimeout(() => setTimer((s) => s - 1), 1000);

    return () => clearTimeout(id);
  }, [otpSent, timer]);

  const roleTitle =
    role === "citizen"
      ? t.citizenLogin
      : role === "municipality"
      ? t.municipalityLogin
      : t.crewLogin;

  const handleCitizenOtp = () => {
    if (method === "mobile" && mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
    } else if (method === "aadhaar" && aadhaar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number.");
    } else {
      setOtpSent(true);
      setTimer(OTP_SECONDS);
    }
  };

  const resendOtp = () => {
    setOtp(Array(6).fill(""));
    setTimer(OTP_SECONDS);
  };

  /* citizen: OTP verification - only the chosen identifier is passed on */
  const handleLogin = () => {
    if (timer === 0) {
      alert("OTP expired. Please resend the OTP.");
      return;
    }

    if (otp.every(Boolean)) {
      onLogin(role, {
        method,
        mobile: method === "mobile" ? mobile : "",
        aadhaar: method === "aadhaar" ? aadhaar : ""
      });
    } else {
      alert("Please enter a 6-digit OTP.");
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <button className="back-button" onClick={onBack}>
          ← {t.back}
        </button>

        <Logo t={t} />

        <LanguageSelector language={language} setLanguage={setLanguage} />
      </header>

      <main className="auth-main">
        <div className="auth-card">
          <div
            className={`auth-role-icon ${
              role === "citizen"
                ? "auth-green"
                : role === "municipality"
                ? "auth-blue"
                : "auth-orange"
            }`}
          >
            {role === "citizen" ? "👤" : role === "municipality" ? "🏛️" : "🧹"}
          </div>

          <div className="auth-heading">
            <span className="section-label">{t.login}</span>

            <h1>{roleTitle}</h1>

            <p>
              {role === "citizen"
                ? t.citizenDesc
                : role === "municipality"
                ? t.municipalityDesc
                : t.crewDesc}
            </p>
          </div>

          {role === "citizen" && (
            <>
              {!otpSent ? (
                <>
                  <div className="method-label">{t.chooseMethod}</div>

                  <div className="method-toggle" role="tablist">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={method === "mobile"}
                      className={method === "mobile" ? "method-tab active" : "method-tab"}
                      onClick={() => setMethod("mobile")}
                    >
                      📱 {t.loginWithMobile}
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={method === "aadhaar"}
                      className={method === "aadhaar" ? "method-tab active" : "method-tab"}
                      onClick={() => setMethod("aadhaar")}
                    >
                      🪪 {t.loginWithAadhaar}
                    </button>
                  </div>

                  {method === "mobile" ? (
                    <div className="input-group">
                      <label>{t.mobileNumber}</label>

                      <div className="phone-input">
                        <span>+91</span>

                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength="10"
                          placeholder="9876543210"
                          value={mobile}
                          onChange={(e) =>
                            setMobile(
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="input-group">
                      <label>{t.aadhaar}</label>

                      <input
                        className="aadhaar-input"
                        type="text"
                        inputMode="numeric"
                        maxLength={14}
                        placeholder="XXXX-XXXX-XXXX"
                        value={formatAadhaar(aadhaar)}
                        onChange={(e) =>
                          setAadhaar(
                            e.target.value.replace(/\D/g, "").slice(0, 12)
                          )
                        }
                      />
                    </div>
                  )}

                  <button
                    className="primary-button full-width"
                    onClick={handleCitizenOtp}
                  >
                    {t.sendOtp}
                    <Icon name="arrow" />
                  </button>
                </>
              ) : (
                <>
                  <div className="otp-info">
                    <div className="otp-info-icon">📱</div>

                    <div>
                      <strong>{t.otp}</strong>
                      <span>{t.demoOtp}</span>
                    </div>
                  </div>

                  <OtpInput value={otp} onChange={setOtp} />

                  <div className="otp-timer">
                    {timer > 0 ? (
                      <>
                        Resend OTP in{" "}
                        <strong>0:{String(timer).padStart(2, "0")}</strong>
                      </>
                    ) : (
                      <>
                        OTP expired.{" "}
                        <button
                          type="button"
                          className="text-button"
                          onClick={resendOtp}
                        >
                          Resend OTP
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    className="primary-button full-width"
                    onClick={handleLogin}
                    disabled={timer === 0}
                  >
                    {t.verifyOtp}
                    <Icon name="check" />
                  </button>

                  <button
                    className="text-button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp(Array(6).fill(""));
                      setTimer(0);
                    }}
                  >
                    ← {t.back}
                  </button>
                </>
              )}
            </>
          )}

          {role !== "citizen" && (
            <CredentialForm role={role} t={t} onLogin={onLogin} />
          )}

          <div className="auth-security">🛡️ {t.secure}</div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   SHARED DETAIL COMPONENTS (popup + tables)
   ========================================================= */

/* Popup used when a stat card or breakdown row is clicked */
function DetailModal({ eyebrow, title, onClose, closeLabel = "Close", children }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="section-label">{eyebrow}</span>
            <h2>{title}</h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            ×
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

/* Row of small summary boxes: items = [[value, label], ...] */
function DetailStats({ items }) {
  return (
    <div className="detail-stats">
      {items.map(([value, label]) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* Generic table: columns = [{ key, label, render? }] */
function DataTable({ columns, rows }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((c) => (
                <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const crewColumns = [
  { key: "id", label: "Crew ID", render: (r) => <strong>{r.id}</strong> },
  { key: "name", label: "Crew Name" },
  { key: "ward", label: "Ward" },
  { key: "members", label: "Workers" },
  { key: "supervisor", label: "Supervisor" },
  { key: "tasks", label: "Tasks Done", render: (r) => `${r.completed}/${r.tasks}` },
  {
    key: "status",
    label: "Status",
    render: (r) => (
      <span className={`crew-status ${r.status === "Active" ? "active" : "available"}`}>
        {r.status}
      </span>
    )
  }
];

const dutyBadge = (r) => (
  <span className={`crew-status ${r.status === "On duty" ? "active" : "off"}`}>
    {r.status}
  </span>
);

const supervisorColumns = [
  { key: "name", label: "Supervisor", render: (r) => <strong>{r.name}</strong> },
  { key: "wards", label: "Wards" },
  { key: "crews", label: "Crews" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", render: dutyBadge }
];

const officerColumns = [
  { key: "name", label: "Officer", render: (r) => <strong>{r.name}</strong> },
  { key: "designation", label: "Designation" },
  { key: "department", label: "Department" },
  { key: "handled", label: "Reports Handled" }
];

/* Crew task table with optional Start / Mark Cleaned buttons */
function TaskTable({ tasks, t, onStart, onComplete }) {
  const hasActions = Boolean(onStart || onComplete);

  if (!tasks.length) {
    return <div className="empty-state">No tasks in this category.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Location</th>
            <th>Waste Type</th>
            <th>Priority</th>
            <th>Time</th>
            <th>Status</th>
            {hasActions && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <strong>{task.id}</strong>
              </td>

              <td>
                <div className="location-cell">📍 {task.location}</div>
              </td>

              <td>{task.type}</td>

              <td>
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </td>

              <td>{task.time}</td>

              <td>
                <StatusBadge status={task.status} />
              </td>

              {hasActions && (
                <td>
                  {task.status === "Pending" && onStart && (
                    <button
                      className="table-action"
                      onClick={() => onStart(task.id)}
                    >
                      {t.startTask}
                    </button>
                  )}

                  {task.status === "Active" && onComplete && (
                    <button
                      className="table-action"
                      onClick={() => onComplete(task.id)}
                    >
                      {t.markCleaned}
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   CLEANUP PROOF MODAL (crew takes an after-cleanup photo)
   Live camera only - no gallery upload.
   ========================================================= */

function CleanupProofModal({ task, onClose, onSubmit }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [camError, setCamError] = useState("");

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    setCamError("");

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("no camera");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setCamError("Camera unavailable or permission denied.");
    }
  };

  useEffect(() => {
    startCamera();

    return stopCamera;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = () => {
    const video = videoRef.current;

    if (!video || !video.videoWidth) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    setPhoto(canvas.toDataURL("image/jpeg", 0.8));
    stopCamera();
  };

  /* fallback for laptops without a webcam (prototype demo only) */
  const demoPhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 640, 400);
    gradient.addColorStop(0, "#dff3e6");
    gradient.addColorStop(1, "#7cc79a");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 640, 400);

    ctx.fillStyle = "#0d6337";
    ctx.textAlign = "center";
    ctx.font = "bold 30px Arial";
    ctx.fillText("AFTER CLEANUP (demo)", 320, 190);
    ctx.font = "20px Arial";
    ctx.fillText(task.location, 320, 230);

    setPhoto(canvas.toDataURL("image/jpeg", 0.8));
    stopCamera();
  };

  const retake = () => {
    setPhoto(null);
    setTimeout(startCamera, 0);
  };

  return (
    <DetailModal
      eyebrow="Cleanup proof"
      title={`After-cleanup photo · ${task.id}`}
      onClose={onClose}
    >
      <p className="detail-note">
        📍 {task.location}. Take a live photo of the cleaned spot. It will be
        sent to the municipality for verification.
      </p>

      {!photo ? (
        <>
          {camError ? (
            <div className="empty-state">{camError}</div>
          ) : (
            <video
              ref={videoRef}
              className="proof-video"
              autoPlay
              playsInline
              muted
            />
          )}

          <div className="task-actions proof-actions">
            <button className="secondary-button" onClick={demoPhoto}>
              Use demo photo
            </button>

            {!camError && (
              <button className="primary-button" onClick={capture}>
                📷 Capture Photo
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <img className="proof-video" src={photo} alt="After cleanup" />

          <div className="task-actions proof-actions">
            <button className="secondary-button" onClick={retake}>
              Retake
            </button>

            <button className="primary-button" onClick={() => onSubmit(photo)}>
              Send to Municipality
              <Icon name="check" />
            </button>
          </div>
        </>
      )}
    </DetailModal>
  );
}

/* =========================================================
   DASHBOARD LAYOUT
   ========================================================= */

/* Bell icon in the header: click to open a dropdown with the latest
   notifications for the logged-in role (citizen / municipality / crew). */
function NotificationBell({ role, title }) {
  const {
    submittedReports: allSubmitted,
    assignedIds,
    proofs: allProofs,
    citizenId
  } = useContext(AppDataContext);

  /* a citizen only sees their own reports and the photos sent to them */
  const submittedReports =
    role === "citizen"
      ? allSubmitted.filter((r) => r.ownerId === citizenId)
      : allSubmitted;

  const proofs =
    role === "citizen"
      ? allProofs.filter((p) => p.ownerId === citizenId)
      : allProofs;

  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  /* close on outside click or Escape */
  useEffect(() => {
    if (!open) return;

    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  let items = [];

  if (role === "citizen") {
    items = [
      ...proofs
        .filter((p) => p.sent)
        .map((p) => ({
          icon: "✓",
          title: `Report ${p.id} cleaned`,
          text: `The municipality confirmed the cleanup at ${p.location}.`,
          time: p.sentAt
        })),
      ...submittedReports.map((r) => ({
        icon: "📋",
        title: `Report ${r.id} submitted`,
        text: `Your ${r.type.toLowerCase()} report is waiting for verification.`,
        time: r.time
      })),
      { icon: "✓", title: "Report SW-1022 cleaned", text: "The cleanup crew completed the task.", time: "20 min ago" },
      { icon: "🧹", title: "Crew assigned to SW-1023", text: "Cleanup team C-14 has been dispatched.", time: "1 hour ago" },
      { icon: "🛡️", title: "Report verified", text: "AI verification completed successfully.", time: "2 hours ago" }
    ];
  } else if (role === "municipality") {
    items = [
      ...submittedReports.map((r) => ({
        icon: "📋",
        title: `New report ${r.id}`,
        text: `${r.type} reported by ${r.citizen}. Needs verification.`,
        time: r.time
      })),
      ...proofs
        .filter((p) => !p.sent)
        .map((p) => ({
          icon: "📷",
          title: `Cleanup proof for ${p.id}`,
          text: `${p.crew} sent an after-cleanup photo from ${p.location}.`,
          time: p.time
        })),
      ...assignedIds.map((id) => ({
        icon: "🧹",
        title: `Crew assigned to ${id}`,
        text: "A cleanup crew has been dispatched.",
        time: "Just now"
      })),
      { icon: "⚠", title: "3 reports pending verification", text: "SW-1027, SW-1026 and SW-1025 need action.", time: "5 min ago" },
      { icon: "🔥", title: "Hotspot alert: Market Area", text: "18 reports received from this area.", time: "30 min ago" },
      { icon: "✓", title: "Report SW-1022 cleaned", text: "Crew C-09 completed the cleanup.", time: "1 hour ago" }
    ];
  } else {
    items = [
      ...assignedIds.map((id) => ({
        icon: "📋",
        title: `Report ${id} assigned`,
        text: "The municipality assigned a new report to a crew.",
        time: "Just now"
      })),
      ...proofs
        .filter((p) => p.sent)
        .map((p) => ({
          icon: "✓",
          title: `Proof for ${p.id} confirmed`,
          text: "The municipality forwarded your cleanup photo to the citizen.",
          time: p.sentAt
        })),
      { icon: "🧹", title: "New task: SW-1014", text: "Gandhi Nagar, Ward 14 · High priority.", time: "10 min ago" },
      { icon: "🧹", title: "New task: SW-1013", text: "Fish Market, Ward 8 · Medium priority.", time: "25 min ago" },
      { icon: "⚠", title: "High priority: SW-1012", text: "Bus Depot, Ward 3 is waiting to be started.", time: "40 min ago" }
    ];
  }

  return (
    <div className="notification-wrapper" ref={wrapRef}>
      <button
        className="notification-button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={title}
      >
        🔔
        <span></span>
      </button>

      {open && (
        <div className="notification-panel" role="dialog" aria-label={title}>
          <div className="notification-panel-header">
            <strong>{title}</strong>

            <span className="notification-count">{items.length}</span>
          </div>

          <div className="notification-panel-list">
            {items.map((item, index) => (
              <div className="notification-panel-item" key={index}>
                <div className="notification-panel-icon">{item.icon}</div>

                <div>
                  <strong>{item.title}</strong>

                  <p>{item.text}</p>

                  <small>{item.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardLayout({
  role,
  t,
  language,
  setLanguage,
  onLogout,
  activePage,
  setActivePage,
  user,
  children
}) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const menus = {
    citizen: [
      ["home", t.dashboard],
      ["camera", t.reportWaste],
      ["report", t.myReports],
      ["bell", t.notifications],
      ["user", t.profile]
    ],

    municipality: [
      ["home", t.overview],
      ["map", t.liveReports],
      ["hotspot", t.hotspots],
      ["crew", t.crewManagement],
      ["analytics", t.analytics],
      ["report", t.auditLogs]
    ],

    crew: [
      ["home", t.dashboard],
      ["report", t.assignedTasks],
      ["check", t.completedTasks],
      ["user", t.profile]
    ]
  };

  const roleIcon =
    role === "citizen" ? "👤" : role === "municipality" ? "🏛️" : "🧹";

  const roleName =
    role === "citizen"
      ? t.citizen
      : role === "municipality"
      ? t.municipality
      : t.crew;

  return (
    <div className="dashboard-layout">
      {mobileMenu && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileMenu(false)}
        ></div>
      )}

      <aside className={mobileMenu ? "sidebar sidebar-open" : "sidebar"}>
        <div className="sidebar-logo">
          <Logo t={t} />

          <button className="mobile-close" onClick={() => setMobileMenu(false)}>
            ×
          </button>
        </div>

        <div className="role-badge">
          <div className="role-badge-icon">{roleIcon}</div>

          <div>
            <strong>{roleName}</strong>

            <small>
              {user?.email ||
                (role === "citizen"
                  ? "Citizen Account"
                  : role === "municipality"
                  ? "Municipal Administrator"
                  : "Cleanup Team")}
            </small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menus[role].map(([icon, label], index) => (
            <button
              key={`${label}-${index}`}
              className={activePage === index ? "nav-item active" : "nav-item"}
              onClick={() => {
                setActivePage(index);
                setMobileMenu(false);
              }}
            >
              <Icon name={icon} size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item logout" onClick={onLogout}>
            <Icon name="logout" size={18} />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
          >
            ☰
          </button>

          <div className="header-page-title">
            <span>{roleIcon}</span>

            <div>
              <strong>{roleName}</strong>

              <small>{role === "municipality" ? t.city : t.subtitle}</small>
            </div>
          </div>

          <div className="header-actions">
            <LanguageSelector language={language} setLanguage={setLanguage} />

            <NotificationBell role={role} title={t.notifications} />

            <div className="header-avatar">
              {user?.initials ||
                (role === "citizen"
                  ? "SC"
                  : role === "municipality"
                  ? "MA"
                  : "C1")}
            </div>
          </div>
        </header>

        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD (clickable when onClick is given)
   ========================================================= */

function StatCard({ icon, title, value, change, type = "green", onClick }) {
  const clickable = typeof onClick === "function";

  return (
    <div
      className={`stat-card stat-${type}${clickable ? " clickable" : ""}`}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="stat-top">
        <div className="stat-icon">
          <Icon name={icon} size={20} />
        </div>

        <span className="stat-change">{change}</span>
      </div>

      <strong>{value}</strong>

      <span>{title}</span>

      {clickable && <em className="stat-hint">View details →</em>}
    </div>
  );
}

/* =========================================================
   DASHBOARD TITLE
   ========================================================= */

function DashboardTitle({ eyebrow, title, description }) {
  return (
    <div className="dashboard-title">
      <div>
        <span className="section-label">{eyebrow}</span>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      <div className="system-online">
        <span>●</span>
        System Online
      </div>
    </div>
  );
}

/* =========================================================
   CITIZEN DASHBOARD
   ========================================================= */

function CitizenDashboard({ t, activePage, setActivePage, profile, onSaveProfile }) {
  const [reportSuccess, setReportSuccess] = useState(false);
  const [detail, setDetail] = useState(null);

  const {
    submittedReports: allSubmitted,
    submitReport,
    citizenId
  } = useContext(AppDataContext);

  /* only the reports this citizen submitted */
  const submittedReports = allSubmitted.filter((r) => r.ownerId === citizenId);

  /* reports sent in this session + the demo history */
  const myReports = [...submittedReports, ...myReportsData];

  if (activePage === 1) {
    return (
      <CitizenReportPage
        t={t}
        onSubmit={(data) => {
          submitReport({ ...data, citizen: profile.name });
          setReportSuccess(true);
          setActivePage(0);
        }}
      />
    );
  }

  if (activePage === 2) {
    return <CitizenReports t={t} reports={myReports} />;
  }

  if (activePage === 3) {
    return <NotificationsPage t={t} />;
  }

  if (activePage === 4) {
    return <ProfilePage t={t} profile={profile} onSave={onSaveProfile} />;
  }

  const countOf = (status) =>
    myReports.filter((r) => r.status === status).length;

  const total = myReports.length;
  const cleaned = countOf("Cleaned");

  const cfg = detail ? CITIZEN_DETAIL[detail] : null;

  const list = cfg
    ? cfg.status
      ? myReports.filter((r) => r.status === cfg.status)
      : myReports
    : [];

  return (
    <>
      {reportSuccess && (
        <SuccessBanner
          t={t}
          text={t.reportSubmitted}
          onClose={() => setReportSuccess(false)}
        />
      )}

      <DashboardTitle
        eyebrow={t.welcome}
        title={profile.name}
        description={t.welcomeText}
      />

      <div className="stats-grid">
        <StatCard
          icon="report"
          title={t.totalReports}
          value={total}
          change={`+${2 + submittedReports.length} this month`}
          type="green"
          onClick={() => setDetail("total")}
        />

        <StatCard
          icon="warning"
          title={t.pendingReports}
          value={countOf("Pending")}
          change="Awaiting action"
          type="orange"
          onClick={() => setDetail("pending")}
        />

        <StatCard
          icon="clock"
          title={t.activeReports}
          value={countOf("Active")}
          change="Currently active"
          type="blue"
          onClick={() => setDetail("active")}
        />

        <StatCard
          icon="check"
          title={t.cleanedReports}
          value={cleaned}
          change={Math.round((cleaned / total) * 100) + "% resolved"}
          type="purple"
          onClick={() => setDetail("cleaned")}
        />
      </div>

      <div className="dashboard-grid-two">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">{t.snapReport}</span>
              <h2>{t.reportTitle}</h2>
            </div>

            <div className="card-feature-icon green">📷</div>
          </div>

          <p className="card-description">
            Capture a live photo of waste and automatically attach your
            location.
          </p>

          <button className="primary-button" onClick={() => setActivePage(1)}>
            {t.reportWaste}
            <Icon name="arrow" />
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">{t.recentReports}</span>
              <h2>Latest Activity</h2>
            </div>

            <div className="small-card-icon">📋</div>
          </div>

          <div className="activity-list">
            {myReports.slice(0, 3).map((report) => (
              <div className="activity-item" key={report.id}>
                <div className="activity-icon">♻</div>

                <div className="activity-content">
                  <strong>{report.id}</strong>
                  <span>{report.location}</span>
                </div>

                <StatusBadge status={report.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {cfg && (
        <DetailModal
          eyebrow={cfg.eyebrow}
          title={cfg.title}
          onClose={() => setDetail(null)}
          closeLabel={t.close}
        >
          <DetailStats
            items={[
              [list.length, "Reports"],
              [Math.round((list.length / total) * 100) + "%", "Share of total"],
              [list.filter((r) => r.priority === "High").length, "High priority"]
            ]}
          />

          <p className="detail-note">{cfg.note}</p>

          <ReportTable reports={list} t={t} citizen />

          <p className="detail-foot">
            Showing {list.length} of {total} reports
          </p>
        </DetailModal>
      )}
    </>
  );
}

/* =========================================================
   CITIZEN REPORT PAGE
   Real camera (getUserMedia) + real GPS (navigator.geolocation)
   ========================================================= */

function CitizenReportPage({ t, onSubmit }) {
  const [photo, setPhoto] = useState(null); /* data URL of the live photo */
  const [cameraOpen, setCameraOpen] = useState(false);
  const [camError, setCamError] = useState("");

  const [coords, setCoords] = useState(null); /* { lat, lng, accuracy } */
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  const [wasteType, setWasteType] = useState("Mixed Waste");

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  /* start the camera whenever the viewfinder is shown, stop it otherwise */
  useEffect(() => {
    if (!cameraOpen) return;

    let cancelled = false;

    (async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("no camera");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        if (!cancelled) {
          setCamError(
            "Camera unavailable or permission denied. The camera needs HTTPS (or localhost) and your permission."
          );
          setCameraOpen(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [cameraOpen]);

  const openCamera = () => {
    setCamError("");
    setCameraOpen(true);
  };

  const capture = () => {
    const video = videoRef.current;

    if (!video || !video.videoWidth) return;

    /* keep the photo light: max 800px wide */
    const scale = Math.min(1, 800 / video.videoWidth);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    setPhoto(canvas.toDataURL("image/jpeg", 0.8));
    setCameraOpen(false);
  };

  /* fallback for laptops without a webcam (testing only) */
  const demoPhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#cfd8d2";
    ctx.fillRect(0, 0, 640, 400);
    ctx.fillStyle = "#44564b";
    ctx.textAlign = "center";
    ctx.font = "bold 28px Arial";
    ctx.fillText("WASTE PHOTO (demo)", 320, 200);

    setPhoto(canvas.toDataURL("image/jpeg", 0.8));
    setCamError("");
  };

  const retake = () => {
    setPhoto(null);
    openCamera();
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by this browser.");
      return;
    }

    setLocating(true);
    setGeoError("");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy)
        });
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setGeoError(
          err.code === 1
            ? "Location permission denied. Allow location access in your browser and try again."
            : err.code === 2
            ? "Your position is unavailable right now. Check GPS / network and try again."
            : "Getting your location timed out. Please try again."
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const submitReport = () => {
    if (!photo || !coords) {
      alert("Please capture a live photo and attach your location.");
      return;
    }

    onSubmit({
      photo,
      lat: coords.lat,
      lng: coords.lng,
      accuracy: coords.accuracy,
      type: wasteType
    });
  };

  return (
    <>
      <DashboardTitle
        eyebrow={t.snapReport}
        title={t.reportWaste}
        description="Submit a verified waste report using live camera capture and GPS."
      />

      <div className="report-layout">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">STEP 01</span>
              <h2>{t.capturePhoto}</h2>
            </div>
          </div>

          <div className="camera-box">
            {!cameraOpen && !photo && (
              <>
                <div className="camera-large-icon">📷</div>

                <h3>{t.capturePhoto}</h3>

                <p>Gallery uploads are disabled for verified reporting.</p>

                {camError && <div className="form-error">⚠ {camError}</div>}

                <button className="primary-button" onClick={openCamera}>
                  📷 Open Camera
                </button>

                {camError && (
                  <button
                    className="text-button"
                    onClick={demoPhoto}
                    type="button"
                  >
                    No camera? Use a demo photo (testing only)
                  </button>
                )}
              </>
            )}

            {cameraOpen && !photo && (
              <div className="camera-demo">
                <div className="live-cam">
                  <video
                    ref={videoRef}
                    className="report-video"
                    autoPlay
                    playsInline
                    muted
                  />

                  <span className="live-tag">● LIVE CAMERA</span>
                </div>

                <button
                  className="capture-button"
                  onClick={capture}
                  aria-label="Capture photo"
                >
                  ●
                </button>

                <small>Tap to capture live photo</small>
              </div>
            )}

            {photo && (
              <div className="camera-success">
                <img className="report-video" src={photo} alt="Captured waste" />

                <strong>Live photo captured</strong>

                <span>Ready for AI verification.</span>

                <button className="secondary-button" onClick={retake}>
                  Retake Photo
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">STEP 02</span>
              <h2>{t.location}</h2>
            </div>
          </div>

          <div className="location-box">
            <div className="location-icon">📍</div>

            <div>
              <strong>
                {coords
                  ? "Location attached"
                  : locating
                  ? "Getting your location..."
                  : "Location not attached"}
              </strong>

              <span>
                {coords
                  ? `${formatCoords(coords.lat, coords.lng)} (±${coords.accuracy} m)`
                  : "GPS location required"}
              </span>
            </div>
          </div>

          {geoError && (
            <div className="form-error" role="alert">
              ⚠ {geoError}
            </div>
          )}

          {coords && (
            <div className="location-preview">
              <LeafletMap
                height={170}
                reports={[
                  {
                    id: "Your location",
                    lat: coords.lat,
                    lng: coords.lng,
                    marker: "you",
                    location: `±${coords.accuracy} m accuracy`
                  }
                ]}
              />
            </div>
          )}

          <button
            className="secondary-button full-width"
            onClick={getLocation}
            disabled={locating}
          >
            📍 {locating ? "Locating..." : coords ? "Refresh Location" : t.getLocation}
          </button>

          <div className="input-group report-select">
            <label>{t.wasteType}</label>

            <select
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
            >
              <option>Mixed Waste</option>
              <option>Plastic Waste</option>
              <option>Organic Waste</option>
              <option>Construction Waste</option>
              <option>Electronic Waste</option>
            </select>
          </div>

          <div className="report-ready-box">
            <div>
              <span>Photo</span>
              <strong>{photo ? "Attached" : "Required"}</strong>
            </div>

            <div>
              <span>GPS</span>
              <strong>{coords ? "Attached" : "Required"}</strong>
            </div>

            <div>
              <span>AI</span>
              <strong>Ready</strong>
            </div>
          </div>

          <button className="primary-button full-width" onClick={submitReport}>
            {t.submitReport}
            <Icon name="arrow" />
          </button>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <div>
            <span className="section-label">VERIFICATION</span>
            <h2>Report Verification Flow</h2>
          </div>
        </div>

        <div className="verification-flow">
          <VerificationStep number="1" title={t.capturePhoto} active={Boolean(photo)} />
          <div className="flow-line"></div>
          <VerificationStep number="2" title={t.location} active={Boolean(coords)} />
          <div className="flow-line"></div>
          <VerificationStep number="3" title={t.aiVerification} active={false} />
          <div className="flow-line"></div>
          <VerificationStep number="4" title={t.crewAssigned} active={false} />
        </div>
      </div>
    </>
  );
}

function VerificationStep({ number, title, active }) {
  return (
    <div className={active ? "verification-step active" : "verification-step"}>
      <div className="verification-number">{active ? "✓" : number}</div>

      <span>{title}</span>
    </div>
  );
}

/* =========================================================
   CITIZEN REPORTS
   ========================================================= */

function CitizenReports({ t, reports }) {
  return (
    <>
      <DashboardTitle
        eyebrow={t.myReports}
        title={t.myReports}
        description="Track every report from submission to cleanup."
      />

      <div className="dashboard-card">
        <div className="table-header">
          <div>
            <span className="section-label">REPORT HISTORY</span>
            <h2>{t.recentReports}</h2>
          </div>

          <div className="search-box">
            🔍
            <input placeholder={t.search} />
          </div>
        </div>

        <ReportTable reports={reports} t={t} citizen />
      </div>
    </>
  );
}

/* =========================================================
   MUNICIPALITY DASHBOARD
   ========================================================= */

/* Config for the four report-count popups */
const REPORT_DETAIL = {
  total: {
    eyebrow: "All reports",
    title: "Total Reports",
    note: "Every waste report received from citizens across all wards.",
    status: null
  },
  pending: {
    eyebrow: "Needs action",
    title: "Pending Reports",
    note: "Reports waiting for verification and crew assignment.",
    status: "Pending"
  },
  active: {
    eyebrow: "Crews deployed",
    title: "Active Reports",
    note: "Reports where a cleanup crew is currently working.",
    status: "Active"
  },
  cleaned: {
    eyebrow: "Completed",
    title: "Cleaned Reports",
    note: "Reports where cleanup has been finished and confirmed.",
    status: "Cleaned"
  }
};

/* Popup content for report cards and workforce rows */
function MunicipalityDetail({ type, onClose, t }) {
  const { officers, supervisors, crews, crewsOnDuty, attendance } =
    municipalStaffData;

  const stats = useCityStats();
  const allReports = useAllReports();

  const workers = wardPeople.reduce((total, w) => total + w.workers, 0);

  /* total / pending / active / cleaned reports */
  if (REPORT_DETAIL[type]) {
    const cfg = REPORT_DETAIL[type];

    const list = cfg.status
      ? allReports.filter((r) => r.status === cfg.status)
      : allReports;

    const count = stats[type];
    const share = Math.round((count / stats.total) * 100);
    const high = list.filter((r) => r.priority === "High").length;

    return (
      <DetailModal
        eyebrow={cfg.eyebrow}
        title={cfg.title}
        onClose={onClose}
        closeLabel={t.close}
      >
        <DetailStats
          items={[
            [count, "Reports"],
            [`${share}%`, "Share of total"],
            [high, "High priority (shown)"]
          ]}
        />

        <p className="detail-note">{cfg.note}</p>

        <ReportTable reports={list} t={t} municipality />

        <p className="detail-foot">
          Showing latest {list.length} of {count} reports
        </p>
      </DetailModal>
    );
  }

  /* Cleanup Workers row */
  if (type === "workers") {
    return (
      <DetailModal
        eyebrow="Workforce breakdown"
        title="Cleanup Workers & Crews"
        onClose={onClose}
        closeLabel={t.close}
      >
        <DetailStats
          items={[
            [workers, "Cleanup workers"],
            [crews, "Crews"],
            [crewsOnDuty, "Crews on duty"],
            [Math.round(workers / crews), "Avg. crew size"]
          ]}
        />

        <h3 className="detail-subtitle">Workers by ward</h3>

        <div className="ward-chips">
          {wardPeople.map((w) => (
            <div className="ward-chip" key={w.ward}>
              <strong>{w.workers}</strong>
              <span>{w.ward}</span>
            </div>
          ))}
        </div>

        <h3 className="detail-subtitle">Crew details</h3>

        <DataTable columns={crewColumns} rows={crewData} />

        <p className="detail-foot">
          Showing {crewData.length} of {crews} crews
        </p>
      </DetailModal>
    );
  }

  /* Ward Supervisors row */
  if (type === "supervisors") {
    return (
      <DetailModal
        eyebrow="Workforce breakdown"
        title="Ward Supervisors"
        onClose={onClose}
        closeLabel={t.close}
      >
        <DetailStats
          items={[
            [supervisors, "Supervisors"],
            [crews, "Crews supervised"],
            [(crews / supervisors).toFixed(1), "Crews per supervisor"],
            [`${attendance}%`, "Attendance"]
          ]}
        />

        <p className="detail-note">
          Field inspection of cleanup work in each ward.
        </p>

        <DataTable columns={supervisorColumns} rows={supervisorsData} />

        <p className="detail-foot">
          Showing {supervisorsData.length} of {supervisors} supervisors
        </p>
      </DetailModal>
    );
  }

  /* Municipal Officers row */
  return (
    <DetailModal
      eyebrow="Workforce breakdown"
      title="Municipal Officers"
      onClose={onClose}
      closeLabel={t.close}
    >
      <DetailStats
        items={[
          [officers, "Officers"],
          [officersData.length, "Departments shown"],
          [`${attendance}%`, "Attendance"]
        ]}
      />

      <p className="detail-note">
        Officers who verify reports and assign cleanup crews.
      </p>

      <DataTable columns={officerColumns} rows={officersData} />

      <p className="detail-foot">
        Showing {officersData.length} of {officers} officers
      </p>
    </DetailModal>
  );
}

/* =========================================================
   CLEANUP PROOFS (municipality reviews crew photos and
   forwards them to the citizen)
   ========================================================= */

function CleanupProofs() {
  const { proofs, sendProofToCitizen } = useContext(AppDataContext);

  const waiting = proofs.filter((p) => !p.sent).length;

  return (
    <div className="dashboard-card">
      <div className="card-heading">
        <div>
          <span className="section-label">CLEANUP PROOF</span>
          <h2>Completed Cleanups</h2>
        </div>

        <span className="demo-chip">{waiting} awaiting</span>
      </div>

      {proofs.length === 0 ? (
        <div className="empty-state">No cleanup proofs received yet.</div>
      ) : (
        <div className="proof-list">
          {proofs.map((p) => (
            <div className="proof-item" key={p.id}>
              <img src={p.photo} alt={`After cleanup ${p.id}`} />

              <div className="proof-info">
                <strong>
                  {p.id} · {p.type}
                </strong>

                <span>📍 {p.location}</span>

                <span>
                  🧹 {p.crew} · {p.time}
                </span>

                <span>
                  👤 For: {p.citizen || "Demo report (no citizen account)"}
                </span>
              </div>

              {p.sent ? (
                <span className="status-badge status-cleaned">
                  ✓ Sent to citizen
                </span>
              ) : (
                <button
                  className="primary-button"
                  onClick={() => sendProofToCitizen(p.id)}
                >
                  Send to Citizen
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MunicipalityDashboard({ t, activePage }) {
  /* which popup is open: total | pending | active | cleaned | workers | supervisors | officers */
  const [detail, setDetail] = useState(null);

  const stats = useCityStats();
  const { submittedReports } = useContext(AppDataContext);

  if (activePage === 1) {
    return <MunicipalityReports t={t} />;
  }

  if (activePage === 2) {
    return <HotspotsPage t={t} />;
  }

  if (activePage === 3) {
    return <CrewManagementPage t={t} />;
  }

  if (activePage === 4) {
    return <AnalyticsPage t={t} />;
  }

  if (activePage === 5) {
    return <AuditLogsPage t={t} />;
  }

  /* newest citizen submissions appear at the top of the live table */
  const recentReports = [...submittedReports, ...reportsData];

  return (
    <>
      <DashboardTitle
        eyebrow={t.overview}
        title={t.municipality}
        description="Monitor city-wide waste reports, hotspots and cleanup operations."
      />

      <div className="stats-grid">
        <StatCard
          icon="report"
          title={t.totalReports}
          value={stats.total}
          change={`+${18 + submittedReports.length} today`}
          type="green"
          onClick={() => setDetail("total")}
        />

        <StatCard
          icon="clock"
          title={t.pendingReports}
          value={stats.pending}
          change="Needs action"
          type="orange"
          onClick={() => setDetail("pending")}
        />

        <StatCard
          icon="map"
          title={t.activeReports}
          value={stats.active}
          change="Crews deployed"
          type="blue"
          onClick={() => setDetail("active")}
        />

        <StatCard
          icon="check"
          title={t.cleanedReports}
          value={stats.cleaned}
          change="76% completion"
          type="purple"
          onClick={() => setDetail("cleaned")}
        />
      </div>

      <PeopleWorkforce t={t} onOpen={setDetail} />

      <div className="municipality-grid">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">{t.liveReports}</span>
              <h2>{t.liveMap}</h2>
            </div>

            <span className="live-indicator">● LIVE</span>
          </div>

          <MunicipalityMap />
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">{t.hotspots}</span>
              <h2>Active Hotspots</h2>
            </div>

            <div className="card-feature-icon orange">🔥</div>
          </div>

          <div className="hotspot-list">
            <Hotspot name="Market Area" reports="18 reports" level="High" />
            <Hotspot name="Bus Stand" reports="12 reports" level="Medium" />
            <Hotspot name="Lake Road" reports="8 reports" level="Medium" />
            <Hotspot name="School Road" reports="5 reports" level="Low" />
          </div>
        </div>
      </div>

      <CleanupProofs />

      <div className="dashboard-card">
        <div className="card-heading">
          <div>
            <span className="section-label">{t.liveReports}</span>
            <h2>{t.recentReports}</h2>
          </div>

          <button className="secondary-button">{t.view} All</button>
        </div>

        <ReportTable reports={recentReports} t={t} municipality />
      </div>

      {detail && (
        <MunicipalityDetail
          type={detail}
          t={t}
          onClose={() => setDetail(null)}
        />
      )}
    </>
  );
}

/* =========================================================
   PEOPLE & WORKFORCE (municipality overview)
   ========================================================= */

function PeopleWorkforce({ t, onOpen }) {
  const sum = (key) => wardPeople.reduce((total, w) => total + w[key], 0);

  const fmt = (n) => n.toLocaleString("en-IN");

  const population = sum("population");
  const citizens = sum("citizens");
  const reporters = sum("reporters");
  const workers = sum("workers");
  const reports = sum("reports");

  const { officers, supervisors, crews, crewsOnDuty, attendance } =
    municipalStaffData;

  const staff = officers + supervisors;

  const pct = (a, b) => Math.round((a / b) * 100);

  /* [icon, label, sub-label, count, popup key] */
  const breakdown = [
    ["🧹", "Cleanup Workers", `${crews} crews`, workers, "workers"],
    ["🦺", "Ward Supervisors", "Field inspection", supervisors, "supervisors"],
    ["🏛️", "Municipal Officers", "Verification & assignment", officers, "officers"]
  ];

  return (
    <section className="people-section">
      <div className="people-heading">
        <div>
          <span className="section-label">{t.peopleWorkforce}</span>

          <h2>{t.peopleHeading}</h2>
        </div>

        <span className="demo-chip">{t.demoData}</span>
      </div>

      <div className="stats-grid">
        <StatCard
          icon="user"
          title={t.registeredCitizens}
          value={fmt(citizens)}
          change={`${pct(citizens, population)}% of ${fmt(population)}`}
          type="green"
        />

        <StatCard
          icon="camera"
          title={t.activeReporters}
          value={fmt(reporters)}
          change={`${pct(reporters, citizens)}% of citizens`}
          type="blue"
        />

        <StatCard
          icon="crew"
          title={t.cleanupWorkers}
          value={fmt(workers)}
          change={`${crews} crews`}
          type="orange"
          onClick={onOpen ? () => onOpen("workers") : undefined}
        />

        <StatCard
          icon="building"
          title={t.municipalStaff}
          value={fmt(staff)}
          change={`${officers} officers · ${supervisors} supervisors`}
          type="purple"
        />
      </div>

      <div className="dashboard-grid-two">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">{t.crew}</span>

              <h2>{t.workforceBreakdown}</h2>
            </div>

            <div className="small-card-icon">👥</div>
          </div>

          <div className="people-list">
            {breakdown.map(([icon, label, sub, count, key]) => (
              <div
                className="people-row clickable"
                key={label}
                role="button"
                tabIndex={0}
                onClick={() => onOpen && onOpen(key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen && onOpen(key);
                  }
                }}
              >
                <div className="people-row-icon">{icon}</div>

                <div className="people-row-info">
                  <strong>{label}</strong>
                  <span>{sub}</span>
                </div>

                <strong className="people-row-count">{fmt(count)}</strong>

                <span className="row-chevron">›</span>
              </div>
            ))}

            <div className="people-total">
              <span>{t.totalWorkforce}</span>
              <strong>{fmt(workers + staff)}</strong>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">{t.citizen}</span>

              <h2>{t.participationCoverage}</h2>
            </div>

            <div className="small-card-icon">📈</div>
          </div>

          <ProgressItem
            title="Citizen registration"
            value={`${pct(citizens, population)}%`}
          />

          <ProgressItem
            title="Active reporters"
            value={`${pct(reporters, citizens)}%`}
          />

          <ProgressItem
            title="Crews on duty"
            value={`${pct(crewsOnDuty, crews)}%`}
          />

          <ProgressItem title="Staff attendance" value={`${attendance}%`} />
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <div>
            <span className="section-label">{t.ward}</span>

            <h2>{t.wardPeople}</h2>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="people-table">
            <thead>
              <tr>
                <th>{t.ward}</th>
                <th>{t.population}</th>
                <th>{t.registered}</th>
                <th>{t.activeReporters}</th>
                <th>{t.workers}</th>
                <th>{t.reportsLabel}</th>
              </tr>
            </thead>

            <tbody>
              {wardPeople.map((w) => (
                <tr key={w.ward}>
                  <td>
                    <strong>{w.ward}</strong>
                  </td>

                  <td>{fmt(w.population)}</td>

                  <td>
                    <div className="mini-cell">
                      <span>{fmt(w.citizens)}</span>

                      <div className="mini-track">
                        <div
                          className="mini-fill"
                          style={{
                            width: `${pct(w.citizens, w.population) * 3}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td>{fmt(w.reporters)}</td>

                  <td>{w.workers}</td>

                  <td>{w.reports}</td>
                </tr>
              ))}

              <tr className="people-table-total">
                <td>
                  <strong>Total</strong>
                </td>
                <td>{fmt(population)}</td>
                <td>{fmt(citizens)}</td>
                <td>{fmt(reporters)}</td>
                <td>{workers}</td>
                <td>{reports}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MUNICIPALITY REPORTS
   ========================================================= */

function MunicipalityReports({ t }) {
  const [filter, setFilter] = useState("All");

  const allReports = useAllReports();

  const filtered =
    filter === "All"
      ? allReports
      : allReports.filter((item) => item.status === filter);

  return (
    <>
      <DashboardTitle
        eyebrow={t.liveReports}
        title={t.citizenReports}
        description="Review, verify and assign incoming citizen reports."
      />

      <CleanupProofs />

      <div className="dashboard-card">
        <div className="filter-bar">
          <div className="filter-buttons">
            {["All", "Pending", "Active", "Cleaned"].map((item) => (
              <button
                key={item}
                className={
                  filter === item ? "filter-button active" : "filter-button"
                }
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="search-box">
            🔍
            <input placeholder={t.search} />
          </div>
        </div>

        <ReportTable reports={filtered} t={t} municipality />
      </div>
    </>
  );
}

/* =========================================================
   REPORT TABLE
   Pending reports show "Assign Crew"; once clicked the
   button changes to "Assigned" (state shared via context).
   Reports submitted with a live photo show a thumbnail.
   ========================================================= */

function ReportTable({ reports, t, municipality }) {
  const { assignedIds, assignReport } = useContext(AppDataContext);

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>{t.reportId}</th>
            <th>{t.location}</th>
            <th>{t.wasteType}</th>
            {municipality && <th>{t.reportedBy}</th>}
            <th>{t.date}</th>
            <th>{t.status}</th>
            {municipality && <th>{t.action}</th>}
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => {
            const isAssigned = assignedIds.includes(report.id);

            const shownStatus =
              municipality && isAssigned && report.status === "Pending"
                ? "Assigned"
                : report.status;

            return (
              <tr key={report.id}>
                <td>
                  <strong>{report.id}</strong>
                </td>

                <td>
                  <div className="location-cell">📍 {report.location}</div>

                  {report.photo && (
                    <img
                      className="report-thumb"
                      src={report.photo}
                      alt={`Waste at ${report.location}`}
                    />
                  )}
                </td>

                <td>{report.type}</td>

                {municipality && <td>{report.citizen}</td>}

                <td>{report.time}</td>

                <td>
                  <StatusBadge status={shownStatus} />
                </td>

                {municipality && (
                  <td>
                    {report.status === "Pending" ? (
                      isAssigned ? (
                        <button className="table-action assigned" disabled>
                          ✓ Assigned
                        </button>
                      ) : (
                        <button
                          className="table-action"
                          onClick={() => assignReport(report.id)}
                        >
                          {t.assign}
                        </button>
                      )
                    ) : (
                      <button className="table-action">{t.view}</button>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
   ========================================================= */

function StatusBadge({ status }) {
  const className =
    status === "Cleaned"
      ? "status-cleaned"
      : status === "Active" || status === "Assigned"
      ? "status-active"
      : status === "Rejected"
      ? "status-rejected"
      : "status-pending";

  return (
    <span className={`status-badge ${className}`}>
      <span>●</span>
      {status}
    </span>
  );
}

/* =========================================================
   MUNICIPALITY MAP
   Real OpenStreetMap map: every report (demo + citizen
   submissions) is a coloured marker; click one for details.
   ========================================================= */

function MunicipalityMap() {
  const allReports = useAllReports();

  return (
    <div>
      <LeafletMap reports={allReports} height={360} />

      <div className="map-legend">
        <div>
          <span className="legend-dot red"></span>
          Pending
        </div>

        <div>
          <span className="legend-dot orange"></span>
          In progress
        </div>

        <div>
          <span className="legend-dot green"></span>
          Cleaned
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HOTSPOT
   ========================================================= */

function Hotspot({ name, reports, level }) {
  return (
    <div className="hotspot-item">
      <div className="hotspot-icon">🔥</div>

      <div className="hotspot-info">
        <strong>{name}</strong>
        <span>{reports}</span>
      </div>

      <span className={`priority ${level.toLowerCase()}`}>{level}</span>
    </div>
  );
}

function HotspotsPage({ t }) {
  return (
    <>
      <DashboardTitle
        eyebrow={t.hotspots}
        title="Waste Hotspots"
        description="Identify locations receiving multiple waste reports."
      />

      <div className="stats-grid">
        <StatCard icon="hotspot" title="Critical Hotspots" value="4" change="Requires attention" type="orange" />
        <StatCard icon="report" title="Reports in Hotspots" value="43" change="17% of total" type="red" />
        <StatCard icon="crew" title="Crews Deployed" value="9" change="Across hotspots" type="blue" />
        <StatCard icon="check" title="Resolved Hotspots" value="12" change="This month" type="green" />
      </div>

      <div className="dashboard-grid-two">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">HOTSPOT MAP</span>
              <h2>City Hotspots</h2>
            </div>
          </div>

          <MunicipalityMap />
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">PRIORITY</span>
              <h2>Top Locations</h2>
            </div>
          </div>

          <div className="hotspot-list">
            <Hotspot name="Market Area" reports="18 reports" level="High" />
            <Hotspot name="Bus Stand" reports="12 reports" level="Medium" />
            <Hotspot name="Lake Road" reports="8 reports" level="Medium" />
            <Hotspot name="School Road" reports="5 reports" level="Low" />
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CREW MANAGEMENT
   ========================================================= */

function CrewManagementPage({ t }) {
  return (
    <>
      <DashboardTitle
        eyebrow={t.crewManagement}
        title="Cleanup Crew Management"
        description="Monitor crew availability and assign cleanup tasks."
      />

      <div className="stats-grid">
        <StatCard icon="crew" title="Total Crews" value="24" change="Registered" type="blue" />
        <StatCard icon="check" title="Available" value="8" change="Ready for dispatch" type="green" />
        <StatCard icon="clock" title="On Task" value="12" change="Currently working" type="orange" />
        <StatCard icon="report" title="Completed Today" value="36" change="+8 from yesterday" type="purple" />
      </div>

      <div className="crew-grid">
        {crewData.map((crew) => (
          <div className="crew-card" key={crew.id}>
            <div className="crew-card-header">
              <div className="crew-avatar">🧹</div>

              <div className="crew-info">
                <strong>{crew.name}</strong>
                <span>{crew.id}</span>
              </div>

              <span
                className={
                  crew.status === "Active"
                    ? "crew-status active"
                    : "crew-status available"
                }
              >
                {crew.status}
              </span>
            </div>

            <div className="crew-details">
              <div>
                <span>Members</span>
                <strong>{crew.members}</strong>
              </div>

              <div>
                <span>Tasks</span>
                <strong>{crew.tasks}</strong>
              </div>

              <div>
                <span>Completed</span>
                <strong>{crew.completed}</strong>
              </div>
            </div>

            <button className="secondary-button full-width">{t.view}</button>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   ANALYTICS PAGE
   ========================================================= */

function AnalyticsPage({ t }) {
  return (
    <>
      <DashboardTitle
        eyebrow={t.analytics}
        title="Cleanup Analytics"
        description="Track reporting and cleanup performance across the city."
      />

      <div className="stats-grid">
        <StatCard icon="report" title="Reports This Month" value="842" change="+14.8%" type="green" />
        <StatCard icon="check" title="Resolution Rate" value="91%" change="+6.2%" type="blue" />
        <StatCard icon="clock" title="Avg. Response" value="42 min" change="-12 min" type="purple" />
        <StatCard icon="hotspot" title="Hotspots Reduced" value="18%" change="This quarter" type="orange" />
      </div>

      <div className="dashboard-grid-two">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">REPORTS</span>
              <h2>Weekly Reports</h2>
            </div>
          </div>

          <BarChart />
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">CLEANUP</span>
              <h2>Resolution Performance</h2>
            </div>
          </div>

          <ProgressItem title="Same Day Resolution" value="76%" />
          <ProgressItem title="Within 24 Hours" value="91%" />
          <ProgressItem title="Within SLA" value="96%" />
          <ProgressItem title="Citizen Confirmation" value="88%" />
        </div>
      </div>
    </>
  );
}

function BarChart() {
  const values = [45, 70, 55, 88, 65, 92, 78];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="bar-chart">
      {values.map((value, index) => (
        <div className="bar-wrapper" key={index}>
          <div className="bar" style={{ height: `${value}%` }}></div>

          <span>{days[index]}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressItem({ title, value }) {
  return (
    <div className="progress-item">
      <div className="progress-label">
        <span>{title}</span>

        <strong>{value}</strong>
      </div>

      <div className="progress-track">
        <div className="progress-value" style={{ width: value }}></div>
      </div>
    </div>
  );
}

/* =========================================================
   AUDIT LOGS
   ========================================================= */

function AuditLogsPage({ t }) {
  const logs = [
    { time: "10:42 AM", user: "Municipality Admin", action: "Assigned SW-1024" },
    { time: "10:35 AM", user: "AI Verification", action: "Verified SW-1023" },
    { time: "10:21 AM", user: "Crew C-09", action: "Completed SW-1022" },
    { time: "09:58 AM", user: "Municipality Admin", action: "Reviewed SW-1021" }
  ];

  return (
    <>
      <DashboardTitle
        eyebrow={t.auditLogs}
        title={t.auditLogs}
        description="Transparent record of municipal waste management actions."
      />

      <div className="dashboard-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>User</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.time}</td>

                  <td>
                    <strong>{log.user}</strong>
                  </td>

                  <td>{log.action}</td>

                  <td>
                    <StatusBadge status="Cleaned" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   CREW DASHBOARD
   ========================================================= */

/* Config for the four crew task popups */
const CREW_DETAIL = {
  assigned: {
    eyebrow: "All tasks",
    title: "Assigned Tasks",
    note: "Every cleanup job assigned to your crew.",
    status: null
  },
  pending: {
    eyebrow: "Awaiting start",
    title: "Pending Tasks",
    note: "Assigned to your crew but not started yet. Tap Start Task to begin.",
    status: "Pending"
  },
  active: {
    eyebrow: "Currently working",
    title: "In Progress Tasks",
    note: "Cleanup started. Mark a task as cleaned and send an after-cleanup photo when the work is done.",
    status: "Active"
  },
  completed: {
    eyebrow: "Finished",
    title: "Completed Tasks",
    note: "Cleanup work your crew has finished.",
    status: "Cleaned"
  }
};

function CrewDashboard({ t, activePage, user, profile, onSaveProfile }) {
  /* task list lives here so every page and popup stays in sync */
  const [tasks, setTasks] = useState(crewTasksData);
  const [detail, setDetail] = useState(null);
  const [notice, setNotice] = useState(false);

  /* task waiting for its after-cleanup photo */
  const [proofTask, setProofTask] = useState(null);

  const { submitProof, submittedReports, assignedIds } =
    useContext(AppDataContext);

  /* reports the municipality assigned show up as new Pending tasks */
  useEffect(() => {
    const incoming = submittedReports.filter((r) => assignedIds.includes(r.id));

    if (!incoming.length) return;

    setTasks((prev) => {
      const known = new Set(prev.map((task) => task.id));

      const fresh = incoming
        .filter((r) => !known.has(r.id))
        .map((r) => ({
          id: r.id,
          location: r.location,
          type: r.type,
          priority: r.priority,
          status: "Pending",
          time: "Assigned just now",
          ownerId: r.ownerId,
          citizen: r.citizen
        }));

      return fresh.length ? [...fresh, ...prev] : prev;
    });
  }, [submittedReports, assignedIds]);

  const startTask = (id) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: "Active", time: "Started just now" }
          : task
      )
    );

  const completeTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: "Cleaned", time: "Done just now" }
          : task
      )
    );

    setNotice(true);
  };

  /* "Mark as Cleaned" first asks for an after-cleanup photo */
  const requestComplete = (id) =>
    setProofTask(tasks.find((task) => task.id === id) || null);

  /* photo taken: close the task and send the proof to the municipality */
  const finishWithProof = (photo) => {
    completeTask(proofTask.id);

    submitProof({
      id: proofTask.id,
      location: proofTask.location,
      type: proofTask.type,
      crew: `${profile.name} (C-14)`,
      photo,
      time: "Just now",
      ownerId: proofTask.ownerId,
      citizen: proofTask.citizen
    });

    setProofTask(null);
  };

  const proofModal = proofTask && (
    <CleanupProofModal
      task={proofTask}
      onClose={() => setProofTask(null)}
      onSubmit={finishWithProof}
    />
  );

  const countOf = (status) =>
    tasks.filter((task) => task.status === status).length;

  const counts = {
    assigned: tasks.length,
    pending: countOf("Pending"),
    active: countOf("Active"),
    completed: countOf("Cleaned")
  };

  const highPriority = tasks.filter(
    (task) => task.priority === "High" && task.status !== "Cleaned"
  ).length;

  const activeTask = tasks.find((task) => task.status === "Active");

  if (activePage === 1) {
    return (
      <>
        <CrewTasks
          t={t}
          tasks={tasks}
          onStart={startTask}
          onComplete={requestComplete}
          notice={notice}
          onCloseNotice={() => setNotice(false)}
        />

        {proofModal}
      </>
    );
  }

  if (activePage === 2) {
    return <CompletedTasks t={t} tasks={tasks} />;
  }

  if (activePage === 3) {
    return (
      <ProfilePage
        t={t}
        crew
        user={user}
        profile={profile}
        onSave={onSaveProfile}
      />
    );
  }

  const cfg = detail ? CREW_DETAIL[detail] : null;

  const detailTasks = cfg
    ? cfg.status
      ? tasks.filter((task) => task.status === cfg.status)
      : tasks
    : [];

  return (
    <>
      {notice && (
        <SuccessBanner
          t={t}
          text={t.taskCompleted}
          onClose={() => setNotice(false)}
        />
      )}

      <DashboardTitle
        eyebrow={t.welcome}
        title={profile.name}
        description="Complete assigned cleanup tasks and submit proof."
      />

      <div className="stats-grid">
        <StatCard
          icon="report"
          title={t.assignedTasks}
          value={counts.assigned}
          change={`${highPriority} high priority`}
          type="blue"
          onClick={() => setDetail("assigned")}
        />

        <StatCard
          icon="clock"
          title="Pending Tasks"
          value={counts.pending}
          change="Awaiting start"
          type="orange"
          onClick={() => setDetail("pending")}
        />

        <StatCard
          icon="hotspot"
          title="In Progress"
          value={counts.active}
          change="Currently working"
          type="purple"
          onClick={() => setDetail("active")}
        />

        <StatCard
          icon="check"
          title={t.completedTasks}
          value={counts.completed}
          change="Today"
          type="green"
          onClick={() => setDetail("completed")}
        />
      </div>

      <div className="dashboard-card active-task-card">
        {activeTask ? (
          <>
            <div className="card-heading">
              <div>
                <span className="section-label">{t.activeTask}</span>

                <h2>
                  {activeTask.id} · {activeTask.location.split(",")[0]}
                </h2>
              </div>

              <StatusBadge status="Active" />
            </div>

            <div className="task-information">
              <div>
                <span>{t.location}</span>
                <strong>📍 {activeTask.location}</strong>
              </div>

              <div>
                <span>{t.wasteType}</span>
                <strong>{activeTask.type}</strong>
              </div>

              <div>
                <span>Priority</span>
                <strong
                  className={`priority ${activeTask.priority.toLowerCase()}`}
                >
                  {activeTask.priority}
                </strong>
              </div>
            </div>

            <div className="task-actions">
              <button
                className="secondary-button"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      activeTask.location
                    )}`,
                    "_blank",
                    "noopener"
                  )
                }
              >
                📍 Navigate
              </button>

              <button
                className="primary-button"
                onClick={() => requestComplete(activeTask.id)}
              >
                {t.markCleaned}
                <Icon name="check" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="card-heading">
              <div>
                <span className="section-label">{t.activeTask}</span>

                <h2>No task in progress</h2>
              </div>
            </div>

            <div className="empty-state">
              Start a pending task to see its details here.
            </div>

            <div className="task-actions">
              <button
                className="primary-button"
                onClick={() => setDetail("pending")}
              >
                View pending tasks
                <Icon name="arrow" />
              </button>
            </div>
          </>
        )}
      </div>

      {cfg && (
        <DetailModal
          eyebrow={cfg.eyebrow}
          title={cfg.title}
          onClose={() => setDetail(null)}
          closeLabel={t.close}
        >
          <DetailStats
            items={[
              [detailTasks.length, "Tasks"],
              [
                counts.assigned
                  ? `${Math.round((detailTasks.length / counts.assigned) * 100)}%`
                  : "0%",
                "Share of assigned"
              ],
              [
                detailTasks.filter((task) => task.priority === "High").length,
                "High priority"
              ]
            ]}
          />

          <p className="detail-note">{cfg.note}</p>

          <TaskTable
            tasks={detailTasks}
            t={t}
            onStart={startTask}
            onComplete={requestComplete}
          />
        </DetailModal>
      )}

      {proofModal}
    </>
  );
}

/* =========================================================
   CREW TASKS
   ========================================================= */

function CrewTasks({ t, tasks, onStart, onComplete, notice, onCloseNotice }) {
  const [filter, setFilter] = useState("All");

  const filters = [
    ["All", "All"],
    ["Pending", "Pending"],
    ["Active", "In Progress"],
    ["Cleaned", "Completed"]
  ];

  const countOf = (key) =>
    key === "All"
      ? tasks.length
      : tasks.filter((task) => task.status === key).length;

  const visible =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <>
      <DashboardTitle
        eyebrow={t.assignedTasks}
        title={t.assignedTasks}
        description="View all cleanup jobs assigned to your team."
      />

      {notice && (
        <SuccessBanner t={t} text={t.taskCompleted} onClose={onCloseNotice} />
      )}

      <div className="filter-bar">
        <div className="filter-buttons">
          {filters.map(([key, label]) => (
            <button
              key={key}
              className={
                filter === key ? "filter-button active" : "filter-button"
              }
              onClick={() => setFilter(key)}
            >
              {label} ({countOf(key)})
            </button>
          ))}
        </div>
      </div>

      <div className="task-list">
        {visible.length === 0 && (
          <div className="empty-state">No tasks in this category.</div>
        )}

        {visible.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-card-icon">🧹</div>

            <div className="task-card-main">
              <div className="task-card-top">
                <strong>{task.id}</strong>

                <StatusBadge status={task.status} />
              </div>

              <h3>{task.location}</h3>

              <p>
                {task.type} · {task.priority} priority · {task.time}
              </p>
            </div>

            <div className="task-card-action">
              {task.status === "Pending" && (
                <button
                  className="primary-button"
                  onClick={() => onStart(task.id)}
                >
                  {t.startTask}
                </button>
              )}

              {task.status === "Active" && (
                <button
                  className="primary-button"
                  onClick={() => onComplete(task.id)}
                >
                  {t.markCleaned}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   COMPLETED TASKS
   ========================================================= */

function CompletedTasks({ t, tasks }) {
  const done = tasks.filter((task) => task.status === "Cleaned");

  return (
    <>
      <DashboardTitle
        eyebrow={t.completedTasks}
        title={t.completedTasks}
        description="Previously completed cleanup tasks."
      />

      <div className="dashboard-card">
        <TaskTable tasks={done} t={t} />
      </div>
    </>
  );
}

/* =========================================================
   NOTIFICATIONS
   Cleanup photos forwarded by the municipality appear first,
   then confirmations for reports submitted this session.
   ========================================================= */

function NotificationsPage({ t }) {
  const {
    proofs,
    submittedReports: allSubmitted,
    citizenId
  } = useContext(AppDataContext);

  const submittedReports = allSubmitted.filter((r) => r.ownerId === citizenId);

  /* cleanup photos the municipality sent to this citizen only */
  const cleanedUpdates = proofs.filter(
    (p) => p.sent && p.ownerId === citizenId
  );

  const notifications = [
    {
      icon: "✓",
      title: "Report SW-1022 cleaned",
      text: "The cleanup crew completed the task.",
      time: "20 min ago"
    },
    {
      icon: "🧹",
      title: "Crew assigned to SW-1023",
      text: "Cleanup team C-14 has been dispatched.",
      time: "1 hour ago"
    },
    {
      icon: "🛡️",
      title: "Report verified",
      text: "AI verification completed successfully.",
      time: "2 hours ago"
    }
  ];

  return (
    <>
      <DashboardTitle
        eyebrow={t.notifications}
        title={t.notifications}
        description="Updates about your waste reports."
      />

      <div className="notification-list">
        {cleanedUpdates.map((p) => (
          <div className="notification-card" key={`proof-${p.id}`}>
            <div className="notification-icon">✓</div>

            <div>
              <strong>Report {p.id} cleaned</strong>

              <p>
                The municipality confirmed the cleanup at {p.location}.
                After-cleanup photo:
              </p>

              <img
                className="notification-photo"
                src={p.photo}
                alt={`After cleanup ${p.id}`}
              />

              <small>{p.sentAt}</small>
            </div>
          </div>
        ))}

        {submittedReports.map((r) => (
          <div className="notification-card" key={`submitted-${r.id}`}>
            <div className="notification-icon">📋</div>

            <div>
              <strong>Report {r.id} submitted</strong>

              <p>
                Your {r.type.toLowerCase()} report was sent to the municipality
                and is waiting for verification.
              </p>

              <small>{r.time}</small>
            </div>
          </div>
        ))}

        {notifications.map((item, index) => (
          <div className="notification-card" key={index}>
            <div className="notification-icon">{item.icon}</div>

            <div>
              <strong>{item.title}</strong>

              <p>{item.text}</p>

              <small>{item.time}</small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   PROFILE (with Edit Profile form)
   ========================================================= */

function ProfilePage({ t, crew = false, user, profile, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const fmtMobile = (m) =>
    m ? "+91 " + m.slice(0, 5) + " " + m.slice(5) : "Not added";

  /* Aadhaar is shown masked: XXXX-XXXX-1234 */
  const maskAadhaar = (a) => "XXXX-XXXX-" + a.slice(8);

  const startEdit = () => {
    setForm(profile);
    setError("");
    setSaved(false);
    setEditing(true);
  };

  const cancel = () => {
    setEditing(false);
    setError("");
  };

  const save = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return setError("Name cannot be empty.");

    /* mobile is optional (an Aadhaar login has none) but must be valid if given */
    if (form.mobile && form.mobile.length !== 10)
      return setError("Enter a valid 10-digit mobile number.");

    if (!form.city.trim()) return setError("City cannot be empty.");

    onSave({ ...form, name: form.name.trim(), city: form.city.trim() });
    setEditing(false);
    setSaved(true);
  };

  const set = (key, value) => {
    setForm({ ...form, [key]: value });
    setError("");
  };

  return (
    <>
      <DashboardTitle
        eyebrow={t.profile}
        title={profile.name}
        description="Account information and platform preferences."
      />

      {saved && (
        <SuccessBanner
          t={t}
          text="Profile updated successfully."
          onClose={() => setSaved(false)}
        />
      )}

      <div className="profile-layout">
        <div className="dashboard-card profile-card">
          <div className="profile-large-avatar">
            {crew ? "🧹" : initialsOf(profile.name) || "👤"}
          </div>

          <h2>{profile.name}</h2>

          <p>{crew ? "Cleanup Crew C-14" : "Citizen Account"}</p>

          {!editing && (
            <button className="secondary-button" onClick={startEdit}>
              ✎ Edit Profile
            </button>
          )}
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span className="section-label">ACCOUNT</span>
              <h2>{editing ? "Edit Profile" : "Account Details"}</h2>
            </div>
          </div>

          {editing ? (
            <form className="profile-form" onSubmit={save} noValidate>
              <div className="input-group">
                <label htmlFor="pf-name">
                  {crew ? "Crew Name" : "Full Name"}
                </label>

                <input
                  id="pf-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="pf-mobile">{t.mobileNumber}</label>

                <div className="phone-input">
                  <span>+91</span>

                  <input
                    id="pf-mobile"
                    type="tel"
                    inputMode="numeric"
                    value={form.mobile}
                    onChange={(e) =>
                      set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="pf-city">City</label>

                <input
                  id="pf-city"
                  type="text"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                />
              </div>

              {error && (
                <div className="form-error" role="alert">
                  ⚠ {error}
                </div>
              )}

              <div className="profile-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={cancel}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  Save Changes <Icon name="check" />
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              {user && user.email && (
                <ProfileRow label={t.emailAddress} value={user.email} />
              )}

              <ProfileRow label={t.mobileNumber} value={fmtMobile(profile.mobile)} />

              {profile.aadhaar && (
                <ProfileRow label={t.aadhaar} value={maskAadhaar(profile.aadhaar)} />
              )}

              <ProfileRow label="City" value={profile.city} />
              <ProfileRow label="Account Status" value="Verified" />
              <ProfileRow label="Member Since" value="January 2026" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="profile-row">
      <span>{label}</span>

      <strong>{value}</strong>
    </div>
  );
}

/* =========================================================
   SUCCESS BANNER
   ========================================================= */

function SuccessBanner({ t, text, onClose }) {
  return (
    <div className="success-banner">
      <div className="success-icon">✓</div>

      <div>
        <strong>{t.success}</strong>

        <p>{text}</p>
      </div>

      {onClose && <button onClick={onClose}>×</button>}
    </div>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [language, setLanguage] = useState("en");
  const [role, setRole] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState(initialProfiles);

  /* shared data: citizen reports, crew assignment + cleanup proofs */
  const [submittedReports, setSubmittedReports] = useState([]);
  const [assignedIds, setAssignedIds] = useState([]);
  const [proofs, setProofs] = useState([]);

  /* id (mobile or Aadhaar) of the logged-in citizen: keeps reports,
     proofs and notifications private to the person they belong to */
  const [citizenId, setCitizenId] = useState("");

  const store = {
    submittedReports,
    assignedIds,
    proofs,
    citizenId,

    /* citizen: Submit Report -> shows up for the municipality (Pending) */
    submitReport: ({ citizen, type, lat, lng, accuracy, photo }) =>
      setSubmittedReports((prev) => [
        {
          id: "SW-" + (1028 + prev.length),
          location: `GPS ${formatCoords(lat, lng)} (±${accuracy} m)`,
          type,
          priority: "Medium",
          status: "Pending",
          citizen,
          time: "Just now",
          crew: "-",
          lat,
          lng,
          photo,
          ownerId: citizenId
        },
        ...prev
      ]),

    /* municipality: Assign Crew -> Assigned */
    assignReport: (id) =>
      setAssignedIds((prev) => (prev.includes(id) ? prev : [...prev, id])),

    /* crew: after-cleanup photo sent to the municipality */
    submitProof: (proof) =>
      setProofs((prev) => [{ ...proof, sent: false }, ...prev]),

    /* municipality: forward the clean photo to the citizen */
    sendProofToCitizen: (id) =>
      setProofs((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, sent: true, sentAt: "Just now" } : p
        )
      )
  };

  /* fall back to English for any key missing in te / hi */
  const t = {
    ...translations.en,
    ...translations[language]
  };

  const handleLogin = (selectedRole, account = null) => {
    setRole(selectedRole);

    if (selectedRole === "citizen" && account) {
      /* the number used to log in is saved into the citizen profile */
      setProfiles((prev) => ({
        ...prev,
        citizen: {
          ...prev.citizen,
          mobile: account.mobile,
          aadhaar: account.aadhaar
        }
      }));
      setCitizenId(account.mobile || account.aadhaar || "");
      setUser(null);
    } else {
      setUser(account);
    }

    setLoggedIn(true);
    setActivePage(0);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setCitizenId("");
    setRole(null);
    setActivePage(0);
  };

  const saveProfile = (key) => (data) =>
    setProfiles((prev) => ({ ...prev, [key]: data }));

  /* header avatar follows the edited citizen name */
  const layoutUser =
    role === "citizen"
      ? { initials: initialsOf(profiles.citizen.name) }
      : user;

  if (!role) {
    return (
      <LandingPage
        t={t}
        language={language}
        setLanguage={setLanguage}
        onRole={setRole}
      />
    );
  }

  if (!loggedIn) {
    return (
      <LoginPage
        role={role}
        t={t}
        language={language}
        setLanguage={setLanguage}
        onLogin={handleLogin}
        onBack={() => setRole(null)}
      />
    );
  }

  return (
    <AppDataContext.Provider value={store}>
      <DashboardLayout
        role={role}
        t={t}
        language={language}
        setLanguage={setLanguage}
        onLogout={handleLogout}
        activePage={activePage}
        setActivePage={setActivePage}
        user={layoutUser}
      >
        {role === "citizen" && (
          <CitizenDashboard
            t={t}
            activePage={activePage}
            setActivePage={setActivePage}
            profile={profiles.citizen}
            onSaveProfile={saveProfile("citizen")}
          />
        )}

        {role === "municipality" && (
          <MunicipalityDashboard t={t} activePage={activePage} />
        )}

        {role === "crew" && (
          <CrewDashboard
            t={t}
            activePage={activePage}
            user={user}
            profile={profiles.crew}
            onSaveProfile={saveProfile("crew")}
          />
        )}
      </DashboardLayout>
    </AppDataContext.Provider>
  );
}

export default App;