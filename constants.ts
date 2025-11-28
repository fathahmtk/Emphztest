import { Product, ProductCategory, CaseStudy } from './types';

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Technical Center', path: '/technical' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/rfq' },
];

export const WHATSAPP_LINK = "https://wa.me/919037874080";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'emp-xpod-x7',
    name: 'Xpod X7 Smart Cabin',
    category: ProductCategory.SMART_CABIN,
    shortDescription: 'Futuristic GRP monocoque living pod with integrated voice automation and panoramic smart glass.',
    fullDescription: 'The Xpod X7 redefines modular luxury. Built on a high-strength GRP monocoque chassis, this plug-and-play living unit is designed for rapid deployment in resorts, rooftops, and remote locations. It features floor-to-ceiling smart privacy glass, voice-controlled lighting and curtains, and a complete suite of integrated entertainment systems. The seamless white GRP shell reflects solar heat, keeping the interior cool even in tropical climates.',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczO1hJQxalyxfSiUQD0Co6FyBl4at4jQbtoB5T0iOeOeUi112a4SbR1tk_s2zWjJvOeAIVTf-yU1vM_e-rFFCArb6KZpbArxSR3skWuBDM9tznEyxLQ59jc-h5zaCkL-UVeoUwYtDr7Oo6R8654X6D4Htw=w1563-h879-s-no-gm?authuser=0',
    specs: [
      { label: 'Structure', value: 'Monocoque GRP Shell' },
      { label: 'Dimensions', value: '6.5m x 3.2m x 3.0m' },
      { label: 'Glazing', value: 'Switchable Smart Glass' },
      { label: 'Power', value: 'Hybrid (Grid + Solar)' },
      { label: 'Weight', value: '3200 kg (Crane Liftable)' },
    ],
    features: ['Voice Controlled Automation', 'Projector & Surround Sound', 'Smart Privacy Glass', 'Zero Maintenance Exterior', 'Rot-Proof Construction'],
    downloads: [
      { title: 'Xpod X7 Brochure', type: 'PDF' },
      { title: 'Site Prep Guide', type: 'PDF' },
      { title: 'Electrical Schematics', type: 'CAD' }
    ],
    accessories: ['Solar Roof Package', 'Bio-Digester Tank', 'External Decking Module', 'Star-Gazing Skylight']
  },
  {
    id: 'emp-fire-cab1',
    name: 'RedGuard Fire Hose Cabinet',
    category: ProductCategory.FIRE_SAFETY,
    shortDescription: 'UV-stable, bright red GRP cabinet for fire hose reels and extinguishers.',
    fullDescription: 'Designed for high-visibility and extreme durability, the RedGuard cabinet protects vital fire safety equipment from the elements. Unlike steel cabinets that rust shut in coastal areas, our GRP hinges and locks remain functional for decades. The UV-stabilized red gelcoat ensures the color does not fade even under intense direct sunlight.',
    imageUrl: 'https://picsum.photos/600/600?random=10',
    specs: [
      { label: 'Color', value: 'Signal Red (RAL 3000)' },
      { label: 'Material', value: 'Fire Retardant GRP' },
      { label: 'Window', value: 'Acrylic / Wired Glass' },
      { label: 'Mounting', value: 'Wall / Post / Recessed' },
    ],
    features: ['Corrosion Proof', 'High Visibility', 'Stainless Steel Hardware', 'Weatherproof Seal'],
    downloads: [
      { title: 'Fire Cabinet Specs', type: 'PDF' },
      { title: 'Dimensions Drawing', type: 'CAD' }
    ],
    accessories: ['Break-Glass Key Box', 'Stand Mounting Kit', 'Internal Hose Reel']
  },
  {
    id: 'emp-tank-mod',
    name: 'Modular GRP Panel Tank',
    category: ProductCategory.WATER_STORAGE,
    shortDescription: 'Sectional hot-press molded water tanks for potable water storage.',
    fullDescription: 'Our modular GRP tanks are assembled from hot-pressed SMC panels, allowing for customizable capacities from 1,000 to 1,000,000 liters. Certified for potable water storage, the smooth internal surface prevents algae growth and bacteria buildup. The modular design makes it perfect for installation in basements or rooftops with restricted access.',
    imageUrl: 'https://picsum.photos/600/600?random=11',
    specs: [
      { label: 'Panel Size', value: '1m x 1m / 1m x 0.5m' },
      { label: 'Process', value: 'SMC Hot Press' },
      { label: 'Certification', value: 'WRAS Approved' },
      { label: 'Insulation', value: 'Pre-insulated PU Foam' },
    ],
    features: ['Hygienic Storage', 'Zero Leakage', 'Easy Assembly', 'Thermal Insulation'],
    downloads: [
      { title: 'Tank Capacity Chart', type: 'PDF' },
      { title: 'Assembly Manual', type: 'PDF' }
    ],
    accessories: ['Internal Ladder (GRP)', 'Level Indicator', 'Roof Vent', 'Manhole Cover']
  },
  {
    id: 'emp-shade-s2',
    name: 'Instrument Sunshade S2',
    category: ProductCategory.INDUSTRIAL_PROTECTION,
    shortDescription: 'Protective GRP canopy for field instruments and transmitters.',
    fullDescription: 'Essential for Oil & Gas refineries, this GRP sunshade protects expensive instrumentation (pressure transmitters, gauges, analyzers) from direct solar radiation and heavy rain. The material is anti-static and fire-retardant, making it safe for hazardous zones.',
    imageUrl: 'https://picsum.photos/600/600?random=12',
    specs: [
      { label: 'Material', value: 'Anti-static GRP' },
      { label: 'Thickness', value: '4mm - 6mm' },
      { label: 'Wind Load', value: '160 km/h' },
      { label: 'Mounting', value: '2-inch Pipe Mount' },
    ],
    features: ['UV Blocking', 'Impact Resistant', 'Maintenance Free', 'Chemical Resistant'],
    downloads: [
      { title: 'Sunshade Datasheet', type: 'PDF' },
      { title: 'Mounting Details', type: 'CAD' }
    ],
    accessories: ['SS316 Mounting Bracket', 'Side Walls', 'Rear Mounting Plate']
  },
  {
    id: 'emp-auto-ev1',
    name: 'EV Battery Pack Shield',
    category: ProductCategory.AUTOMOBILE,
    shortDescription: 'Lightweight fire-retardant GRP composite cover for EV battery modules.',
    fullDescription: 'Engineered for the next generation of electric mobility, this GRP battery shield offers a 40% weight reduction compared to steel equivalents while maintaining superior impact resistance. It is rigorously tested for fire retardancy (UL94 V-0) and provides excellent thermal insulation to manage battery temperatures effectively.',
    imageUrl: 'https://picsum.photos/600/600?random=50',
    specs: [
      { label: 'Material', value: 'Fire Retardant GRP' },
      { label: 'Fire Rating', value: 'UL94 V-0' },
      { label: 'Weight', value: '12 kg/sqm' },
      { label: 'Impact Strength', value: 'High Energy Absorption' },
    ],
    features: ['Lightweight Construction', 'Thermal Insulation', 'Corrosion Free', 'Electrically Non-Conductive'],
    downloads: [
      { title: 'Automotive Datasheet', type: 'PDF' },
      { title: 'Crash Test Report', type: 'PDF' }
    ],
    accessories: ['Mounting Brackets', 'Thermal Paste Kit', 'Sealant Gasket']
  },
  {
    id: 'emp-enc-001',
    name: 'E-Series IP66 Coastal Enclosure',
    category: ProductCategory.ENCLOSURE,
    shortDescription: 'Heavy-duty GRP enclosure designed for high-salinity coastal environments.',
    fullDescription: 'The E-Series represents the pinnacle of protection for sensitive electrical equipment in harsh environments. Specifically engineered for the coastal climates of Kerala and Karnataka, this GRP enclosure offers superior corrosion resistance compared to stainless steel. It features a UV-stabilized formulation to prevent chalking and degradation under intense tropical sun.',
    imageUrl: 'https://picsum.photos/600/600?random=1',
    specs: [
      { label: 'Material', value: 'Hot Press Molded GRP' },
      { label: 'IP Rating', value: 'IP66 / IP67' },
      { label: 'IK Rating', value: 'IK10' },
      { label: 'Fire Rating', value: 'UL94 V-0' },
      { label: 'Dimensions', value: '600 x 400 x 250 mm' },
    ],
    features: ['Non-corrosive', 'Maintenance free', 'High impact strength', 'Electrically insulating'],
    downloads: [
      { title: 'Datasheet E-Series', type: 'PDF' },
      { title: 'Installation Guide', type: 'PDF' },
      { title: 'CAD Drawing (DWG)', type: 'CAD' }
    ],
    accessories: ['Pole Mounting Kit (SS304)', 'Wall Brackets', 'Internal Mounting Plate', 'Padlock Hasp']
  },
  {
    id: 'emp-kiosk-101',
    name: 'Modular Utility Kiosk M2',
    category: ProductCategory.KIOSK,
    shortDescription: 'Expandable modular GRP kiosk for substations and metering units.',
    fullDescription: 'Our Modular Utility Kiosk M2 is designed for rapid deployment in infrastructure projects. The modular panel design allows for flat-packing to site and quick assembly. Excellent thermal insulation properties protect internal switchgear from extreme heat typical in Southern India.',
    imageUrl: 'https://picsum.photos/600/600?random=2',
    specs: [
      { label: 'Construction', value: 'Sandwich Panel GRP' },
      { label: 'Thermal Insulation', value: 'PU Foam Core' },
      { label: 'Wind Load', value: '120 km/h' },
      { label: 'Color', value: 'RAL 7035 (Light Grey)' },
    ],
    features: ['Modular assembly', 'High thermal efficiency', 'Customizable cutouts', 'Graffiti resistant'],
    downloads: [
      { title: 'Kiosk Brochure', type: 'PDF' },
      { title: 'Structural Specs', type: 'PDF' }
    ],
    accessories: ['Exhaust Fan Unit', 'LED Lighting Pack', 'Fire Extinguisher Mount', 'Anti-Vandal Lock']
  },
  {
    id: 'emp-tray-hd',
    name: 'Heavy Duty Cable Tray',
    category: ProductCategory.CABLE_MANAGEMENT,
    shortDescription: 'Pultruded GRP cable trays for chemical plants and offshore platforms.',
    fullDescription: 'Manufactured using the pultrusion process, these cable trays offer the longitudinal strength of steel with the corrosion resistance of high-grade vinylester resin. Ideal for supporting heavy power cables in highly corrosive industrial atmospheres like refineries, fertilizer plants, and jetties.',
    imageUrl: 'https://picsum.photos/600/600?random=5',
    specs: [
      { label: 'Process', value: 'Pultrusion' },
      { label: 'Resin', value: 'Isophthalic / Vinylester' },
      { label: 'Load Class', value: 'NEMA 20C' },
      { label: 'Length', value: '3m Standard' },
    ],
    features: ['Zero Maintenance', 'High Load Bearing', 'UV Stabilized', 'Fire Retardant'],
    downloads: [
      { title: 'Load Span Tables', type: 'PDF' },
      { title: 'Chemical Resistance Chart', type: 'PDF' }
    ],
    accessories: ['Coupler Plates', 'SS316 Hardware', 'Cover Clips', 'Divider Strip']
  },
  {
    id: 'emp-grat-m4',
    name: 'Anti-Slip Walkway Grating',
    category: ProductCategory.STRUCTURAL,
    shortDescription: 'Molded GRP grating with concave anti-slip surface for industrial safety.',
    fullDescription: 'Our molded GRP gratings provide the ultimate safety solution for wet and oily environments. The integral concave surface ensures positive traction for footwear, significantly reducing slip-and-fall accidents. Available in various mesh sizes and resin systems (Ortho, Iso, Vinyl) to suit specific chemical exposure requirements.',
    imageUrl: 'https://picsum.photos/600/600?random=6',
    specs: [
      { label: 'Mesh Size', value: '38 x 38 mm' },
      { label: 'Thickness', value: '38 mm' },
      { label: 'Surface', value: 'Concave / Gritted' },
      { label: 'Color', value: 'Yellow / Grey / Green' },
    ],
    features: ['Anti-Slip', 'Bi-directional Strength', 'Easy Cutting on Site', 'Non-Sparking'],
    downloads: [
      { title: 'Grating Selection Guide', type: 'PDF' },
      { title: 'Fixing Clip Detail', type: 'CAD' }
    ],
    accessories: ['M-Clips (SS316)', 'C-Clips', 'Rubber Feet', 'Pedestal Jacks']
  },
  {
    id: 'emp-jb-x5',
    name: 'Ex-Proof Junction Box',
    category: ProductCategory.JUNCTION_BOX,
    shortDescription: 'Explosion-proof GRP junction box for petrochemical and industrial zones.',
    fullDescription: 'Certified for Zone 1 and Zone 2 hazardous areas, this junction box ensures safety in volatile environments. The carbon-loaded GRP material prevents static buildup, making it ideal for refineries and chemical plants.',
    imageUrl: 'https://picsum.photos/600/600?random=3',
    specs: [
      { label: 'Certification', value: 'ATEX / IECEx' },
      { label: 'Material', value: 'Carbon-loaded GRP' },
      { label: 'Temp Range', value: '-50°C to +110°C' },
    ],
    features: ['Anti-static', 'Flameproof', 'Chemical resistant'],
    downloads: [
      { title: 'ATEX Certificate', type: 'PDF' }
    ],
    accessories: ['Cable Glands (Ex-Rated)', 'Din Rail Kit', 'Earth Tag', 'Breather Drain']
  },
  {
    id: 'emp-cab-v1',
    name: 'Security Guard Villa',
    category: ProductCategory.CABIN,
    shortDescription: 'All-weather GRP security cabin with integrated electricals.',
    fullDescription: 'A turnkey solution for industrial gatehouses. The seamless GRP shell ensures zero leakage during monsoons. Comes pre-wired with lighting and ventilation fans.',
    imageUrl: 'https://picsum.photos/600/600?random=4',
    specs: [
      { label: 'Size', value: '4ft x 4ft or 6ft x 6ft' },
      { label: 'Flooring', value: 'Marine Ply with Vinyl' },
      { label: 'Windows', value: 'Sliding Aluminum' },
    ],
    features: ['Plug and play', 'Rot proof', 'Aesthetically pleasing'],
    downloads: [
      { title: 'Cabin Floorplans', type: 'PDF' }
    ],
    accessories: ['Air Conditioning Support', 'Custom Desk Unit', 'External Floodlights', 'Bio-Toilet Add-on']
  }
];

export const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-kerala-resort',
    title: 'Coastal Resort Infrastructure Upgrade',
    location: 'Kovalam, Kerala',
    category: 'Hospitality',
    challenge: 'Traditional steel switchgear boxes were corroding within 18 months due to high salinity spray, causing frequent power outages and safety hazards.',
    solution: 'Replaced all outdoor assets with Emphz E-Series GRP Enclosures (IP66). Installed custom GRP Security Cabins at all entry points.',
    outcome: 'Zero corrosion reported after 3 years. Maintenance costs reduced by 100%. Enhanced aesthetic appeal matched the resort theme.',
    imageUrl: 'https://picsum.photos/800/600?random=20'
  },
  {
    id: 'cs-mysore-utility',
    title: 'Urban Substation Protection',
    location: 'Mysore, Karnataka',
    category: 'Utilities',
    challenge: 'High vandalism rates and extreme heat damaging sensitive metering equipment in urban distribution zones.',
    solution: 'Deployed 50 units of Modular Utility Kiosk M2 with IK10 impact rating and high-grade PU foam insulation.',
    outcome: 'Equipment failure rate dropped by 85% due to thermal management. No break-ins reported in the pilot phase.',
    imageUrl: 'https://picsum.photos/800/600?random=21'
  },
  {
    id: 'cs-kochi-port',
    title: 'Port Trust Junction Boxes',
    location: 'Kochi Port Trust',
    category: 'Industrial',
    challenge: 'Need for chemical-resistant and waterproof junction boxes for fuel handling jetty operations.',
    solution: 'Installed ATEX-certified Ex-Proof Junction Boxes with custom cable gland entries.',
    outcome: 'Full compliance with safety audits. Reliable operation during monsoon flooding events.',
    imageUrl: 'https://picsum.photos/800/600?random=22'
  }
];

export const INDUSTRIES = [
  { title: 'Utilities', icon: 'Zap' },
  { title: 'Rail', icon: 'Train' },
  { title: 'Automotive', icon: 'Car' },
  { title: 'Water', icon: 'Droplet' },
  { title: 'Telecom', icon: 'Wifi' },
  { title: 'Oil & Gas', icon: 'Flame' },
  { title: 'Solar', icon: 'Sun' },
  { title: 'Fire Safety', icon: 'Shield' },
];