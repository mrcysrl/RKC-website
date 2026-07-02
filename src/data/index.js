// src/data/index.js

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
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop&auto=format",
    description: "The Siemens SINAMICS G120 Variable Frequency Drive delivers precise motor control for pumps, fans, compressors, and conveyors.",
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
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&auto=format",
    description: "High-efficiency 410W monocrystalline solar panel with PERC technology, ideal for industrial rooftop and ground-mount installations.",
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
    img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop&auto=format",
    description: "The Mitsubishi iQ-R Series PLC offers high-speed processing, expanded I/O, and enhanced CC-Link IE connectivity for complex automation systems.",
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
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop&auto=format",
    description: "The Growatt SPF 5000 ES hybrid inverter combines solar charging, battery storage, and grid backup for reliable off-grid and backup power.",
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
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop&auto=format",
    description: "The Schneider LC1D80 contactor is designed for motor control and switching applications up to 80A, with built-in auxiliary contacts.",
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
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop&auto=format",
    description: "The ABB Tmax XT4 molded case circuit breaker offers reliable protection for industrial distribution systems, with adjustable trip settings.",
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
export const CATEGORIES = ["All", "Industrial Automation", "Renewable Energy", "Electrical Supply"];

export const BRAND_NAMES = ["All Brands", "Siemens", "Mitsubishi Electric", "Canadian Solar", "Schneider Electric", "ABB", "Growatt"];

// ─── MOCK NEWS ─────────────────────────────────────────────────
export const NEWS = [
  {
    id: "solar-expansion",
    title: "RKC Expands Solar Panel Inventory with Canadian Solar Partnership",
    excerpt: "We are proud to announce an exclusive distribution agreement with Canadian Solar, adding over 200 new SKUs to our renewable energy catalog.",
    body: "RKC Industrial Supply is thrilled to announce a strategic distribution partnership with Canadian Solar, one of the world's largest and most innovative solar technology companies...",
    category: "Company News",
    date: "June 18, 2026",
    author: "RKC Sales Team",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "doe-renewable-targets",
    title: "Philippines DOE Accelerates Renewable Energy Targets for 2030",
    excerpt: "New government mandates set 35% renewable energy share by 2030, opening massive opportunities for solar and wind in industrial sectors.",
    body: "The Department of Energy (DOE) has unveiled an updated National Renewable Energy Program (NREP) that raises the target to 35% by 2030...",
    category: "Industry",
    date: "May 30, 2026",
    author: "RKC Research Team",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "mitsubishi-plc-new",
    title: "New Mitsubishi iQ-R Series PLCs Now Available at RKC",
    excerpt: "The latest generation of Mitsubishi PLCs with expanded I/O and enhanced CC-Link IE connectivity is now in stock for immediate pickup.",
    body: "RKC Industrial Supply is proud to announce the availability of the new Mitsubishi iQ-R Series PLCs...",
    category: "Products",
    date: "May 12, 2026",
    author: "RKC Automation Team",
    img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "cebu-solar-project",
    title: "RKC Completes 500kWp Solar Installation for Cebu Manufacturing Plant",
    excerpt: "Our installation team successfully commissioned a 500kWp grid-tied solar system for a food processing facility in Cebu City.",
    body: "RKC Industrial Supply's engineering team has successfully completed a 500kWp solar PV installation for a major food processing plant in Cebu City...",
    category: "Projects",
    date: "April 24, 2026",
    author: "RKC Projects Team",
    img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "abb-mccb-stock",
    title: "ABB Tmax XT Series MCCBs Added to RKC Catalog",
    excerpt: "We now carry the complete ABB Tmax XT4 and XT5 molded case circuit breaker range, from 16A to 630A.",
    body: "RKC Industrial Supply has expanded its electrical supply portfolio with the addition of the ABB Tmax XT series MCCBs...",
    category: "Products",
    date: "April 8, 2026",
    author: "RKC Electrical Team",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=400&fit=crop&auto=format",
  },
  {
    id: "automation-seminar",
    title: "RKC Hosts Free Industrial Automation Seminar for Engineers",
    excerpt: "Over 80 engineers and plant managers attended RKC's full-day automation seminar featuring Siemens and Mitsubishi technical experts.",
    body: "RKC Industrial Supply recently hosted a free industrial automation seminar at its Quezon City headquarters...",
    category: "Events",
    date: "March 15, 2026",
    author: "RKC Training Team",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=400&fit=crop&auto=format",
  },
];

export const NEWS_CATEGORIES = ["All", "Company News", "Industry", "Products", "Projects", "Events"];

// ─── MOCK BRANDS ──────────────────────────────────────────────
export const BRANDS = [
  {
    name: "Siemens",
    category: "Industrial Automation",
    country: "Germany",
    description: "Global leader in automation and digitalization, providing PLCs, drives, and industrial software.",
    products: ["SINAMICS VFDs", "SIMATIC PLCs", "HMI Panels", "Industrial Communication"],
  },
  {
    name: "Mitsubishi Electric",
    category: "Industrial Automation",
    country: "Japan",
    description: "Innovative automation solutions including PLCs, servos, and CNC systems.",
    products: ["iQ-R Series PLC", "FX Series PLC", "Servo Drives", "CNC Controllers"],
  },
  {
    name: "Canadian Solar",
    category: "Renewable Energy",
    country: "Canada",
    description: "World-class solar panel manufacturer with high-efficiency modules for residential, commercial, and utility-scale projects.",
    products: ["HiKu Series", "BiHiKu Series", "KuPower Series", "Solar Inverters"],
  },
  {
    name: "Schneider Electric",
    category: "Electrical Supply",
    country: "France",
    description: "Global specialist in energy management and automation, offering a wide range of electrical distribution and control products.",
    products: ["Contactors", "Circuit Breakers", "Relays", "Switchgear"],
  },
  {
    name: "ABB",
    category: "Electrical Supply",
    country: "Switzerland",
    description: "Leading technology company in electrification and automation, known for MCCBs, drives, and robotics.",
    products: ["Tmax MCCBs", "ACS Drives", "Robotics", "Control Systems"],
  },
  {
    name: "Growatt",
    category: "Renewable Energy",
    country: "China",
    description: "Top-tier manufacturer of solar inverters, hybrid systems, and energy storage solutions.",
    products: ["SPF Series Inverters", "Hybrid Inverters", "Battery Storage", "Monitoring Systems"],
  },
];

// ─── MOCK CONSTANTS FOR WORDPRESS FALLBACK ────────────────────
// These are aliases for the mock data, used when WordPress is unavailable
export const MOCK_PRODUCTS = PRODUCTS;
export const MOCK_NEWS = NEWS;
export const MOCK_BRANDS = BRANDS;

// ─── REMOVED: Duplicate export object ─────────────────────────
// ❌ REMOVED: export { PRODUCTS, NEWS, CATEGORIES, BRAND_NAMES, NEWS_CATEGORIES, BRANDS };