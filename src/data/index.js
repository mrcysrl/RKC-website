// ─── IMAGE IMPORTS ───────────────────────────────────────────────

// Homepage
import heroImage from "../assets/images/Hero.jpg";

// Products
import vfdDrive from "../assets/images/VFD Drive - 7.5kW 3-Phase.jpg";
import monoCrystalline from "../assets/images/410W Monocrystalline Solar Panel.jpg";
import mitsubishi from "../assets/images/Mitsubishi iQ-R Series PLC.jpg";
import solarInverter from "../assets/images/5kW Hybrid Solar Inverter.jpg";
import schneider from "../assets/images/Schneider LC1D80 Contactor.jpg";
import abbTmax from "../assets/images/ABB Tmax XT4 160A MCCB.jpg";

// News
import solarPanelCanada from "../assets/images/Solar Panel Canada.jpg";
import seminar from "../assets/images/Seminar.jpg";


// Services
import solarPanel from "../assets/images/Solar Panel.jpg";
import energyStorage from "../assets/images/Energy Storage.jpg";
import freeAssessment from "../assets/images/Free Assessment.jpg";
import maintenance from "../assets/images/Maintenance.jpg";
import energyAudit from "../assets/images/Energy Audit.jpg";

// Contact Page
import contactMap from "../assets/images/Contacts-map.jpg";


// ─── HOMEPAGE DATA ──────────────────────────────────────────────
export const HOMEPAGE = {
  heroImage: heroImage,
  heroPill: "Industrial Automation & Renewable Energy",
  heroTitle: "Powering Industry, Energizing Tomorrow",
  heroSubtitle: "Your trusted partner for industrial automation components and renewable energy solutions — delivering quality products, expert installation, and reliable support across the Philippines.",
  heroCtaPrimary: "Browse Products",
  heroCtaSecondary: "Request a Quote",
  
  services: [
    { icon: "Settings", label: "Industrial Automation" },
    { icon: "Sun", label: "Renewable Energy" },
    { icon: "Package", label: "Installation Services" },
    { icon: "Truck", label: "Pick-up & Delivery" },
    { icon: "Zap", label: "Electrical Supply" },
  ],
  
  servicesList: [
    {
      icon: "Settings",
      title: "Industrial Automation",
      desc: "Complete PLC programming, VFD installation, motor control, SCADA systems, and panel fabrication.",
    },
    {
      icon: "Sun",
      title: "Renewable Energy",
      desc: "On-grid and off-grid solar PV systems, battery storage, and energy monitoring solutions.",
    },
    {
      icon: "Package",
      title: "Installation & Commissioning",
      desc: "Expert site surveys, professional installation, testing, and after-sales support by certified engineers.",
    },
    {
      icon: "Truck",
      title: "Pick-up & Delivery",
      desc: "Nationwide logistics for industrial components — from Metro Manila to provincial job sites.",
    },
  ],
  
  stats: [
    { icon: "Star", value: "500+", label: "Products in Stock" },
    { icon: "Users", value: "1,200+", label: "Clients Served" },
    { icon: "Globe", value: "18+", label: "Brand Partners" },
    { icon: "Award", value: "10+", label: "Years in Industry" },
  ],
  
  whyChoose: [
    "Authorized distributor for leading global brands",
    "Certified engineers for installation & commissioning",
    "Fast nationwide delivery with reliable logistics",
  ],
};

// ─── MOCK PRODUCTS ──────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: "vfd-siemens-7-5kw",
    name: "VFD Drive - 7.5kW 3-Phase",
    brand: "Siemens",
    sku: "SIE-SINAMICS-7.5KW",
    category: "Industrial Automation",
    price: 28500,
    stock: "In Stock",
    badge: "Best Seller",
    badgeColor: "#F5A800",
    img: vfdDrive,
    description:
      "The Siemens SINAMICS G120 Variable Frequency Drive delivers precise motor control for pumps, fans, compressors, and conveyors.",
    specs: [
      { label: "Power Rating", value: "7.5 kW" },
      { label: "Input Voltage", value: "380-480V 3-Phase" },
      { label: "Output Frequency", value: "0-550 Hz" },
      { label: "Protection Class", value: "IP20" },
      { label: "Communication", value: "PROFIBUS, PROFINET" },
      { label: "Dimensions (mm)", value: "270 x 140 x 195" },
    ],
  },
  {
    id: "solar-panel-410w",
    name: "410W Monocrystalline Solar Panel",
    brand: "Canadian Solar",
    sku: "CS-HIKU6-410",
    category: "Renewable Energy",
    price: 12800,
    stock: "In Stock",
    badge: "New Arrival",
    badgeColor: "#2E6BB0",
    img: monoCrystalline,
    description:
      "High-efficiency 410W monocrystalline solar panel with PERC technology, ideal for industrial rooftop and ground-mount installations.",
    specs: [
      { label: "Power", value: "410Wp" },
      { label: "Efficiency", value: "21.2%" },
      { label: "Cell Type", value: "Monocrystalline" },
      { label: "Dimensions", value: "1722 x 1134 x 30 mm" },
      { label: "Weight", value: "21.5 kg" },
      { label: "Warranty", value: "25 years" },
    ],
  },
  {
    id: "mitsubishi-plc-iqr",
    name: "Mitsubishi iQ-R Series PLC",
    brand: "Mitsubishi Electric",
    sku: "MIT-RJ7102P21-SX",
    category: "Industrial Automation",
    price: 64000,
    stock: "In Stock",
    badge: "Featured",
    badgeColor: "#1A3D6E",
    img: mitsubishi,
    description:
      "The Mitsubishi iQ-R Series PLC offers high-speed processing, expanded I/O, and enhanced CC-Link IE connectivity for complex automation systems.",
    specs: [
      { label: "Processing Speed", value: "1.9 ns" },
      { label: "I/O Points", value: "Up to 4096" },
      { label: "Program Memory", value: "1 MB" },
      { label: "Communication", value: "CC-Link IE, Ethernet" },
      { label: "Power Supply", value: "24V DC" },
      { label: "Dimensions", value: "220 x 130 x 110 mm" },
    ],
  },
  {
    id: "hybrid-inverter-5kw",
    name: "5kW Hybrid Solar Inverter",
    brand: "Growatt",
    sku: "GRW-SPF5000-ES",
    category: "Renewable Energy",
    price: 42000,
    stock: "In Stock",
    badge: "Popular",
    badgeColor: "#F5A800",
    img: solarInverter,
    description:
      "The Growatt SPF 5000 ES hybrid inverter combines solar charging, battery storage, and grid backup for reliable off-grid and backup power.",
    specs: [
      { label: "Power Rating", value: "5kW" },
      { label: "Input Voltage", value: "120-450V DC" },
      { label: "Output Voltage", value: "230V AC" },
      { label: "Battery Voltage", value: "48V" },
      { label: "Efficiency", value: "97.6%" },
      { label: "IP Rating", value: "IP20" },
    ],
  },
  {
    id: "schneider-contactor",
    name: "Schneider LC1D80 Contactor",
    brand: "Schneider Electric",
    sku: "SCH-LC1D80M7",
    category: "Electrical Supply",
    price: 4200,
    stock: "In Stock",
    badge: null,
    badgeColor: "",
    img: schneider,
    description:
      "The Schneider LC1D80 contactor is designed for motor control and switching applications up to 80A, with built-in auxiliary contacts.",
    specs: [
      { label: "Rated Current", value: "80A" },
      { label: "Coil Voltage", value: "220-240V AC" },
      { label: "Number of Poles", value: "3" },
      { label: "Auxiliary Contacts", value: "1 NO + 1 NC" },
      { label: "Mounting", value: "DIN rail / screw" },
      { label: "Protection", value: "IP20" },
    ],
  },
  {
    id: "abb-mccb-xt4",
    name: "ABB Tmax XT4 160A MCCB",
    brand: "ABB",
    sku: "ABB-XT4-160A-TMD",
    category: "Electrical Supply",
    price: 8900,
    stock: "In Stock",
    badge: null,
    badgeColor: "",
    img: abbTmax,
    description:
      "The ABB Tmax XT4 molded case circuit breaker offers reliable protection for industrial distribution systems, with adjustable trip settings.",
    specs: [
      { label: "Rated Current", value: "160A" },
      { label: "Breaking Capacity", value: "50kA" },
      { label: "Poles", value: "3" },
      { label: "Trip Unit", value: "TMD (thermal-magnetic)" },
      { label: "Mounting", value: "Fixed" },
      { label: "Dimensions", value: "210 x 140 x 100 mm" },
    ],
  },
];

// ─── CATEGORIES ────────────────────────────────────────────────
export const CATEGORIES = [
  "All",
  "Industrial Automation",
  "Renewable Energy",
  "Electrical Supply",
];

export const BRAND_NAMES = [
  "All Brands",
  "Siemens",
  "Mitsubishi Electric",
  "Canadian Solar",
  "Schneider Electric",
  "ABB",
  "Growatt",
];

// ─── SERVICES DATA ──────────────
export const SERVICES = [
  {
    id: "residential-solar",
    title: "Residential Solar Installation",
    icon: "Sun",
    description: "Custom solar PV systems designed for your home — reduce your electricity bills by up to 80%.",
    hero: "Solar Solutions for Your Home",
    tagline: "We design and install solar panel systems for residential homes — from 3kWp starter systems to 20kWp+ full-home setups, helping you achieve energy independence.",
    img: solarPanel,
    features: [
      "Custom solar PV system design for your home",
      "Roof-mounted and ground-mounted options",
      "Net metering assistance (MERALCO, distribution utilities)",
      "Complete installation by certified solar installers",
      "System monitoring and performance tracking",
      "25-year panel warranty, 10-year workmanship warranty",
    ],
    industries: ["Homeowners", "Residential Communities", "Villas & Estates", "Small Businesses"],
    cta: "Get a Free Solar Assessment",
  },
  {
    id: "solar-battery-backup",
    title: "Battery Backup & Energy Storage",
    icon: "Battery",
    description: "Store your solar energy for nighttime use or power outages — keep your home running when the grid goes down.",
    hero: "Energy Storage for Homes",
    tagline: "Pair your solar panels with battery storage to maximize savings and ensure reliable backup power during outages.",
    img: energyStorage,
    features: [
      "Residential battery storage systems (Lithium-ion, LiFePO4)",
      "Backup power for essential loads (lights, fridge, WiFi)",
      "Whole-home backup solutions",
      "Off-grid and hybrid solar systems",
      "Smart energy management and monitoring",
      "10-year battery warranty",
    ],
    industries: ["Homeowners", "Condominiums", "Estates", "Small Businesses"],
    cta: "Explore Battery Options",
  },
  {
    id: "solar-assessment",
    title: "Free Solar Assessment",
    icon: "ClipboardCheck",
    description: "Find out exactly how much you can save with solar — no obligation, no pressure, just honest advice.",
    hero: "Know Your Solar Potential",
    tagline: "Our team will visit your property, assess your roof, and provide a customized solar proposal with estimated savings.",
    img: freeAssessment,
    features: [
      "On-site property assessment",
      "Roof condition and structural analysis",
      "Electricity usage analysis from your latest bill",
      "Custom solar system recommendation",
      "Estimated ROI and payback period calculation",
      "No pressure, no obligation",
    ],
    industries: ["Homeowners", "Property Developers", "Residential Communities"],
    cta: "Book Your Free Assessment",
  },
  {
    id: "solar-maintenance",
    title: "Solar Maintenance & Monitoring",
    icon: "Settings",
    description: "Keep your solar system performing at its best with regular monitoring, cleaning, and maintenance services.",
    hero: "Protect Your Investment",
    tagline: "Regular maintenance ensures your solar system operates at peak efficiency — maximizing your savings and extending system life.",
    img: maintenance,
    features: [
      "Regular system performance monitoring",
      "Panel cleaning and inspection",
      "Inverter health checks",
      "Wire and connection verification",
      "System optimization and firmware updates",
      "Annual maintenance plans available",
    ],
    industries: ["Homeowners", "Commercial Properties", "Schools", "Facilities"],
    cta: "Schedule Maintenance",
  },
  {
    id: "solar-energy-audit",
    title: "Energy Efficiency Audit",
    icon: "Zap",
    description: "Before going solar, find out how to reduce your electricity consumption — smaller system = bigger savings.",
    hero: "Maximize Your Solar Savings",
    tagline: "Identify energy-wasting appliances and habits to reduce your electricity usage — so you can install a smaller, more cost-effective solar system.",
    img: energyAudit,
    features: [
      "Professional energy consumption analysis",
      "Appliance efficiency review",
      "Lighting and HVAC assessment",
      "Insulation and energy loss evaluation",
      "Recommendations for energy reduction",
      "Tailored solar system sizing",
    ],
    industries: ["Homeowners", "Condominiums", "Small Businesses", "Commercial Facilities"],
    cta: "Schedule an Audit",
  },
];

// ─── MOCK NEWS ─────────────────────────────────────────────────
export const NEWS = [
  {
    id: "solar-expansion",
    title: "RKC Expands Solar Panel Inventory with Canadian Solar Partnership",
    excerpt:
      "We are proud to announce an exclusive distribution agreement with Canadian Solar, adding over 200 new SKUs to our renewable energy catalog.",
    body: "RKC Industrial Supply is thrilled to announce a strategic distribution partnership with Canadian Solar, one of the world's largest and most innovative solar technology companies...",
    category: "Company News",
    date: "June 18, 2026",
    author: "RKC Sales Team",
    img: solarPanelCanada,
  },
  {
    id: "doe-renewable-targets",
    title: "Philippines DOE Accelerates Renewable Energy Targets for 2030",
    excerpt:
      "New government mandates set 35% renewable energy share by 2030, opening massive opportunities for solar and wind in industrial sectors.",
    body: "The Department of Energy (DOE) has unveiled an updated National Renewable Energy Program (NREP) that raises the target to 35% by 2030...",
    category: "Industry",
    date: "May 30, 2026",
    author: "RKC Research Team",
    img: solarPanel,
  },
  {
    id: "mitsubishi-plc-new",
    title: "New Mitsubishi iQ-R Series PLCs Now Available at RKC",
    excerpt:
      "The latest generation of Mitsubishi PLCs with expanded I/O and enhanced CC-Link IE connectivity is now in stock for immediate pickup.",
    body: "RKC Industrial Supply is proud to announce the availability of the new Mitsubishi iQ-R Series PLCs...",
    category: "Products",
    date: "May 12, 2026",
    author: "RKC Automation Team",
    img: mitsubishi,
  },
  {
    id: "cebu-solar-project",
    title:
      "RKC Completes 500kWp Solar Installation for Cebu Manufacturing Plant",
    excerpt:
      "Our installation team successfully commissioned a 500kWp grid-tied solar system for a food processing facility in Cebu City.",
    body: "RKC Industrial Supply's engineering team has successfully completed a 500kWp solar PV installation for a major food processing plant in Cebu City...",
    category: "Projects",
    date: "April 24, 2026",
    author: "RKC Projects Team",
    img: seminar,
  },
  {
    id: "abb-mccb-stock",
    title: "ABB Tmax XT Series MCCBs Added to RKC Catalog",
    excerpt:
      "We now carry the complete ABB Tmax XT4 and XT5 molded case circuit breaker range, from 16A to 630A.",
    body: "RKC Industrial Supply has expanded its electrical supply portfolio with the addition of the ABB Tmax XT series MCCBs...",
    category: "Products",
    date: "April 8, 2026",
    author: "RKC Electrical Team",
    img: abbTmax,
  },
  {
    id: "automation-seminar",
    title: "RKC Hosts Free Industrial Automation Seminar for Engineers",
    excerpt:
      "Over 80 engineers and plant managers attended RKC's full-day automation seminar featuring Siemens and Mitsubishi technical experts.",
    body: "RKC Industrial Supply recently hosted a free industrial automation seminar at its Quezon City headquarters...",
    category: "Events",
    date: "March 15, 2026",
    author: "RKC Training Team",
    img: freeAssessment,
  },
];

export const NEWS_CATEGORIES = [
  "All",
  "Company News",
  "Industry",
  "Products",
  "Projects",
  "Events",
];

// ─── ABOUT PAGE DATA ──────────────────────────────────────────────

export const ABOUT_DATA = {
  timeline: [
    {
      year: "2024",
      title: "Company Founded",
      desc: "RKC Industrial Supply established in Quezon City as a specialist distributor of industrial electrical components.",
    },
    {
      year: "2025",
      title: "Siemens Partnership",
      desc: "Became an authorized Siemens distributor for Drives and Automation products — a milestone that defined our automation focus.",
    },
    {
      year: "2026",
      title: "Installation Services",
      desc: "Expanded into full EPC services — engineering, procurement, and construction — with a team of certified engineers.",
    },
  ],
  values: [
    {
      icon: "Shield",
      title: "Integrity",
      desc: "We deal honestly with every client — accurate pricing, genuine products, no shortcuts.",
    },
    {
      icon: "Zap",
      title: "Excellence",
      desc: "We hold our products and services to the highest technical standards in the industry.",
    },
    {
      icon: "Leaf",
      title: "Sustainability",
      desc: "We believe industry and environment can coexist — our renewable energy work proves it.",
    },
    {
      icon: "Users",
      title: "Partnership",
      desc: "We treat clients as long-term partners, not transactions — your success is our success.",
    },
  ],
  team: [
    { name: "Chito Nera", role: "Founder & CEO" },
    { name: "Chito Nera", role: "Head of Sales" },
    { name: "Chito Nera", role: "Chief Engineer" },
    { name: "Chito Nera", role: "Solar Energy Lead" },
  ],
  mission:
    "To empower Philippine industry with reliable automation and renewable energy solutions — delivered with speed, expertise, and integrity.",
  vision:
    "To be the most trusted industrial supply partner in the Philippines, helping businesses compete globally through smarter, greener operations.",
};

// ─── MOCK BRANDS ──────────────────────────────────────────────
export const BRANDS = [
  {
    name: "Siemens",
    category: "Industrial Automation",
    country: "Germany",
    description:
      "Global leader in automation and digitalization, providing PLCs, drives, and industrial software.",
    products: [
      "SINAMICS VFDs",
      "SIMATIC PLCs",
      "HMI Panels",
      "Industrial Communication",
    ],
  },
  {
    name: "Mitsubishi Electric",
    category: "Industrial Automation",
    country: "Japan",
    description:
      "Innovative automation solutions including PLCs, servos, and CNC systems.",
    products: [
      "iQ-R Series PLC",
      "FX Series PLC",
      "Servo Drives",
      "CNC Controllers",
    ],
  },
  {
    name: "Canadian Solar",
    category: "Renewable Energy",
    country: "Canada",
    description:
      "World-class solar panel manufacturer with high-efficiency modules for residential, commercial, and utility-scale projects.",
    products: [
      "HiKu Series",
      "BiHiKu Series",
      "KuPower Series",
      "Solar Inverters",
    ],
  },
  {
    name: "Schneider Electric",
    category: "Electrical Supply",
    country: "France",
    description:
      "Global specialist in energy management and automation, offering a wide range of electrical distribution and control products.",
    products: ["Contactors", "Circuit Breakers", "Relays", "Switchgear"],
  },
  {
    name: "ABB",
    category: "Electrical Supply",
    country: "Switzerland",
    description:
      "Leading technology company in electrification and automation, known for MCCBs, drives, and robotics.",
    products: ["Tmax MCCBs", "ACS Drives", "Robotics", "Control Systems"],
  },
  {
    name: "Growatt",
    category: "Renewable Energy",
    country: "China",
    description:
      "Top-tier manufacturer of solar inverters, hybrid systems, and energy storage solutions.",
    products: [
      "SPF Series Inverters",
      "Hybrid Inverters",
      "Battery Storage",
      "Monitoring Systems",
    ],
  },
];

// ─── CONTACT DATA ──────────────────────────────────────────────
export const CONTACT = {
  phone: "+63 2 8888-1234",
  phoneAlt: "+63 917 888 5678",
  email: "sales@rkcindustrial.ph",
  emailSupport: "support@rkcindustrial.ph",
  address: "B42 L34 Evergreen Country, Brgy. Zapote, 4024 Biñan City, Laguna",
  mapImage: contactMap,
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.365202189654!2d121.0807497!3d14.3089888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d4c0d0d0d0d0%3A0x0!2sB42%20L34%20Evergreen%20Country%2C%20Brgy.%20Zapote%2C%204024%20Bi%C3%B1an%20City%2C%20Laguna!5e0!3m2!1sen!2sph!4v1700000000000",
  hours: {
    weekdays: "8:00 AM – 6:00 PM",
    saturday: "8:00 AM – 12:00 PM",
    sunday: "Closed",
  },
};

// ─── RFQ DATA ────────────────────────────────────────────────────
export const RFQ_DATA = {
  formEndpoint: "https://formspree.io/f/xwvgboqv",
  
  fields: {
    contact: [
      { key: "name", label: "Full Name", placeholder: "Juan dela Cruz", required: true },
      { key: "email", label: "Email Address", placeholder: "juan@email.com", required: true },
      { key: "phone", label: "Phone Number", placeholder: "+63 9XX XXX XXXX", required: true },
      { key: "address", label: "Home Address", placeholder: "123 Street, Barangay, City", required: false },
    ],
    project: [
      { key: "propertyType", label: "Property Type", options: ["Single-family Home", "Duplex", "Townhouse", "Condominium", "Farm / Estate", "Commercial Building", "Industrial Facility"] },
      { key: "roofType", label: "Roof Type", options: ["Concrete / Flat", "Metal / GI Sheet", "Clay Tile", "Concrete Tile", "N/A (Ground Mount)"] },
      { key: "avgBill", label: "Average Monthly Electricity Bill (PHP)", options: ["Below ₱3,000", "₱3,000 – ₱5,000", "₱5,000 – ₱10,000", "₱10,000 – ₱20,000", "₱20,000 – ₱50,000", "Above ₱50,000"] },
      { key: "interest", label: "What are you interested in?", options: ["Solar Panel Installation", "Battery Backup / Storage", "Solar + Battery Combo", "Just Exploring / Free Assessment", "Maintenance / Service", "Energy Efficiency Audit"] },
      { key: "timeline", label: "When are you planning to install?", options: ["Immediately (ASAP)", "Within 1 month", "Within 3 months", "Within 6 months", "Just exploring for now"] },
      { key: "hearAbout", label: "How did you hear about us?", options: ["Social Media (Facebook, TikTok, etc.)", "Google Search", "Family / Friends", "Community / HOA", "Other"] },
    ],
  },
  
  contactInfo: {
    phone: "+63 2 8888-1234",
    email: "solar@rkcindustrial.ph",
    address: "B42 L34 Evergreen Country, Brgy. Zapote, 4024 Biñan City, Laguna",
    hours: {
      weekdays: "8:00 AM – 6:00 PM",
      saturday: "8:00 AM – 12:00 PM",
      sunday: "Closed",
    },
  },
  
  responseMessage: {
    title: "Thank You!",
    subtitle: "Your solar quote request has been received.",
    body: "Our solar specialists will review your information and contact you within 24 hours with a personalized proposal.",
  },
};

// ─── MOCK CONSTANTS FOR WORDPRESS FALLBACK ────────────────────
export const MOCK_PRODUCTS = PRODUCTS;
export const MOCK_NEWS = NEWS;
export const MOCK_BRANDS = BRANDS;