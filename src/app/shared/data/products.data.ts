// Placeholder — will be populated in Phase 3 with ~25 sample products
import { Product } from '../models/product.model';

// ─────────────────────────────────────────────────────────────────────────────
// Shared mechanism spec (all standing desks use the same hand-crank system)
// ─────────────────────────────────────────────────────────────────────────────
const HAND_CRANK_MECHANISM = {
  type: 'hand-crank' as const,
  gearSystem: 'dual-bevel-gear' as const,
  liftColumns: 2 as const,
  loadCapacity: 80,
  heightMin: 700,
  heightMax: 1180,
};

// ─────────────────────────────────────────────────────────────────────────────
// Simple Computer Tables  (5 products)
// ─────────────────────────────────────────────────────────────────────────────
const SIMPLE_TABLES: Product[] = [
  {
    id: 'smp-001',
    slug: 'gaming-desk-pro-x',
    sku: 'ABS-SMP-001',
    name: 'Gaming Desk Pro X',
    category: 'simple',
    subType: 'gaming',
    description:
      'Built for marathon gaming sessions. Extra-wide surface fits dual 27″ monitors with room for a full-size keyboard, mouse mat, and headset stand. Steel frame with cable-management cutouts keeps the battle station clean.',
    images: [
      { src: '/gallery/simple/gaming-desk-pro-x-1.jpg', alt: 'Gaming Desk Pro X – front view', width: 1200, height: 800 },
      { src: '/gallery/simple/gaming-desk-pro-x-2.jpg', alt: 'Gaming Desk Pro X – cable cutout detail', width: 1200, height: 800 },
    ],
    idealFor: ['gaming', 'streaming', 'developer'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '16 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { width: 1500, depth: 700, height: 750 },
    features: ['cable-management', 'monitor-mount-holes', 'adjustable-feet'],
    compatibleAccessories: ['cable-management-tray', 'heavy-duty-casters'],
    weight: 32,
    priceTier: '$$',
    featured: true,
    estimatedProductionTime: '5–7 working days',
  },
  {
    id: 'smp-002',
    slug: 'gaming-desk-battlestation-xl',
    sku: 'ABS-SMP-002',
    name: 'Battlestation XL Gaming Desk',
    category: 'simple',
    subType: 'gaming',
    description:
      'Maximum real-estate for the serious PC gamer. Accommodates triple-monitor arrays, VR-ready setups, and streaming gear. RGB-friendly cable conduit built into the rear steel spine.',
    images: [
      { src: '/gallery/simple/battlestation-xl-1.jpg', alt: 'Battlestation XL Gaming Desk – front view', width: 1200, height: 800 },
      { src: '/gallery/simple/battlestation-xl-2.jpg', alt: 'Battlestation XL – triple-monitor setup', width: 1200, height: 800 },
    ],
    idealFor: ['gaming', 'streaming'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '14 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { width: 1800, depth: 750, height: 750 },
    features: ['cable-management', 'monitor-mount-holes', 'adjustable-feet'],
    compatibleAccessories: ['cable-management-tray', 'heavy-duty-casters'],
    weight: 40,
    priceTier: '$$',
    featured: false,
    estimatedProductionTime: '7–10 working days',
  },
  {
    id: 'smp-003',
    slug: 'executive-office-desk',
    sku: 'ABS-SMP-003',
    name: 'Executive Office Desk',
    category: 'simple',
    subType: 'office',
    description:
      'Clean professional lines for a focused work environment. Gloss white frame with a premium MDF top creates a light, modern aesthetic. Central cable grommet keeps the desk wire-free.',
    images: [
      { src: '/gallery/simple/executive-office-desk-1.jpg', alt: 'Executive Office Desk – front view', width: 1200, height: 800 },
      { src: '/gallery/simple/executive-office-desk-2.jpg', alt: 'Executive Office Desk – side profile', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'home-office', 'developer'],
    frame: { material: 'mild-steel', finish: 'Gloss White', gaugeThickness: '16 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { width: 1400, depth: 700, height: 750 },
    features: ['cable-management', 'adjustable-feet'],
    compatibleAccessories: ['cable-management-tray'],
    weight: 30,
    priceTier: '$$',
    featured: true,
    estimatedProductionTime: '5–7 working days',
  },
  {
    id: 'smp-004',
    slug: 'student-compact-desk',
    sku: 'ABS-SMP-004',
    name: 'Student Compact Desk',
    category: 'simple',
    subType: 'student',
    description:
      'Space-saving design ideal for hostel rooms and small bedrooms. Fits a 24″ monitor, laptop stand, and study books without cluttering. Powder-coated silver grey finish pairs with any room décor.',
    images: [
      { src: '/gallery/simple/student-compact-desk-1.jpg', alt: 'Student Compact Desk – front view', width: 1200, height: 800 },
    ],
    idealFor: ['student', 'home-office'],
    frame: { material: 'mild-steel', finish: 'Silver Grey', gaugeThickness: '18 gauge' },
    tabletop: { material: 'Particle Board', thickness: '18mm' },
    dimensions: { width: 1000, depth: 550, height: 750 },
    features: ['adjustable-feet'],
    weight: 18,
    priceTier: '$',
    featured: false,
    estimatedProductionTime: '3–5 working days',
  },
  {
    id: 'smp-005',
    slug: 'l-shaped-corner-desk',
    sku: 'ABS-SMP-005',
    name: 'L-Shaped Corner Workstation',
    category: 'simple',
    subType: 'corner',
    description:
      'Maximise corner space with a dual-wing workstation. Primary 1400 mm wing for the main monitor array; secondary 800 mm return for reference materials or a secondary monitor.',
    images: [
      { src: '/gallery/simple/l-shaped-corner-desk-1.jpg', alt: 'L-Shaped Corner Workstation – overhead view', width: 1200, height: 800 },
      { src: '/gallery/simple/l-shaped-corner-desk-2.jpg', alt: 'L-Shaped Corner Workstation – workspace detail', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'developer', 'home-office', 'trading'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '16 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { width: 1400, depth: 1200, height: 750 },
    features: ['cable-management', 'monitor-mount-holes', 'adjustable-feet'],
    compatibleAccessories: ['cable-management-tray', 'heavy-duty-casters'],
    weight: 48,
    priceTier: '$$$',
    featured: true,
    estimatedProductionTime: '7–10 working days',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Standing Adjustable Tables — With Top  (6 products)
// ─────────────────────────────────────────────────────────────────────────────
const STANDING_WITH_TOP: Product[] = [
  {
    id: 'std-001',
    slug: 'standing-desk-single-classic',
    sku: 'ABS-STD-001',
    name: 'Standing Desk — Single Station Classic',
    category: 'standing',
    subType: 'single-station',
    variant: 'with-top',
    description:
      'Our best-selling single-station height-adjustable desk. MDF tabletop on a precision hand-crank dual bevel gear frame. Smoothly cranks from seated (700 mm) to standing (1180 mm) in under 30 seconds.',
    images: [
      { src: '/gallery/standing/standing-single-classic-1.jpg', alt: 'Standing Desk Single Classic – full view', width: 1200, height: 800 },
      { src: '/gallery/standing/standing-single-classic-2.jpg', alt: 'Standing Desk Single Classic – mechanism close-up', width: 1200, height: 800 },
      { src: '/gallery/standing/standing-single-classic-3.jpg', alt: 'Standing Desk Single Classic – height range diagram', width: 1200, height: 800 },
    ],
    videos: [
      { url: 'https://www.youtube.com/embed/placeholder-demo', type: 'demo', title: 'Single Station Stand Desk — Height Adjustment Demo' },
      { url: 'https://www.youtube.com/embed/placeholder-assembly', type: 'assembly', title: 'Single Station Stand Desk — Assembly Guide' },
    ],
    idealFor: ['office', 'developer', 'home-office'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '14 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { widthMin: 860, widthMax: 1330, depth: 600, minHeight: 700, maxHeight: 1180 },
    standingMechanism: HAND_CRANK_MECHANISM,
    features: ['cable-management', 'adjustable-feet', 'monitor-mount-holes'],
    compatibleAccessories: ['cable-management-tray', 'heavy-duty-casters'],
    weight: 28,
    priceTier: '$$',
    featured: true,
    estimatedProductionTime: '5–7 working days',
  },
  {
    id: 'std-002',
    slug: 'standing-desk-single-pro',
    sku: 'ABS-STD-002',
    name: 'Standing Desk — Single Station Pro',
    category: 'standing',
    subType: 'single-station',
    variant: 'with-top',
    description:
      'Premium single-station model with a solid wood top option and reinforced 14-gauge steel frame. Ideal for professionals who spend 8+ hours at the desk daily. Same precision hand-crank mechanism with higher weight capacity.',
    images: [
      { src: '/gallery/standing/standing-single-pro-1.jpg', alt: 'Standing Desk Single Pro – front view', width: 1200, height: 800 },
      { src: '/gallery/standing/standing-single-pro-2.jpg', alt: 'Standing Desk Single Pro – solid wood top detail', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'developer', 'home-office', 'trading'],
    frame: { material: 'mild-steel', finish: 'Silver Grey', gaugeThickness: '14 gauge' },
    tabletop: { material: 'Solid Wood', thickness: '30mm' },
    dimensions: { widthMin: 860, widthMax: 1330, depth: 600, minHeight: 700, maxHeight: 1180 },
    standingMechanism: { ...HAND_CRANK_MECHANISM, loadCapacity: 100 },
    features: ['cable-management', 'adjustable-feet', 'monitor-mount-holes'],
    compatibleAccessories: ['cable-management-tray'],
    weight: 34,
    priceTier: '$$$',
    featured: false,
    estimatedProductionTime: '7–10 working days',
  },
  {
    id: 'std-003',
    slug: 'standing-desk-double-wide-mdf',
    sku: 'ABS-STD-003',
    name: 'Double-Wide Standing Desk — MDF',
    category: 'standing',
    subType: 'double-wide',
    variant: 'with-top',
    description:
      'Two-person collaborative standing desk with an extra-wide MDF surface. Perfect for dual workstations, open-plan offices, or trading floors where two traders share a single height-adjustable frame.',
    images: [
      { src: '/gallery/standing/double-wide-mdf-1.jpg', alt: 'Double-Wide Standing Desk MDF – front view', width: 1200, height: 800 },
      { src: '/gallery/standing/double-wide-mdf-2.jpg', alt: 'Double-Wide Standing Desk MDF – overhead view', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'trading', 'developer'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '14 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { widthMin: 1400, widthMax: 1800, depth: 700, minHeight: 700, maxHeight: 1180 },
    standingMechanism: { ...HAND_CRANK_MECHANISM, loadCapacity: 120 },
    features: ['cable-management', 'adjustable-feet', 'monitor-mount-holes'],
    compatibleAccessories: ['cable-management-tray', 'heavy-duty-casters'],
    weight: 45,
    priceTier: '$$$',
    featured: true,
    estimatedProductionTime: '7–10 working days',
  },
  {
    id: 'std-004',
    slug: 'standing-desk-double-wide-solid-wood',
    sku: 'ABS-STD-004',
    name: 'Double-Wide Standing Desk — Solid Wood',
    category: 'standing',
    subType: 'double-wide',
    variant: 'with-top',
    description:
      'The flagship dual-station model. Premium solid wood surface on a heavy-duty synchronized hand-crank frame rated to 120 kg. Chosen by corporate clients who want both ergonomics and impressive aesthetics.',
    images: [
      { src: '/gallery/standing/double-wide-solid-wood-1.jpg', alt: 'Double-Wide Standing Desk Solid Wood – front view', width: 1200, height: 800 },
      { src: '/gallery/standing/double-wide-solid-wood-2.jpg', alt: 'Double-Wide Standing Desk Solid Wood – side view', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'trading'],
    frame: { material: 'mild-steel', finish: 'Raw Steel', gaugeThickness: '14 gauge' },
    tabletop: { material: 'Solid Wood', thickness: '35mm' },
    dimensions: { widthMin: 1400, widthMax: 1800, depth: 700, minHeight: 700, maxHeight: 1180 },
    standingMechanism: { ...HAND_CRANK_MECHANISM, loadCapacity: 120 },
    features: ['cable-management', 'adjustable-feet', 'monitor-mount-holes'],
    compatibleAccessories: ['cable-management-tray', 'heavy-duty-casters'],
    weight: 58,
    priceTier: '$$$',
    featured: false,
    estimatedProductionTime: '10–14 working days',
  },
  {
    id: 'std-005',
    slug: 'standing-desk-l-shaped-mdf',
    sku: 'ABS-STD-005',
    name: 'L-Shaped Standing Desk — MDF',
    category: 'standing',
    subType: 'l-standing',
    variant: 'with-top',
    description:
      'Corner-configured height-adjustable desk. Primary wing adjusts 700–1180 mm; secondary wing is fixed-height storage/reference surface. Ideal for full trading setups with multi-monitor arrays and reference screens.',
    images: [
      { src: '/gallery/standing/l-shaped-standing-mdf-1.jpg', alt: 'L-Shaped Standing Desk MDF – overhead view', width: 1200, height: 800 },
      { src: '/gallery/standing/l-shaped-standing-mdf-2.jpg', alt: 'L-Shaped Standing Desk MDF – corner detail', width: 1200, height: 800 },
    ],
    idealFor: ['trading', 'developer', 'streaming'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '14 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { widthMin: 860, widthMax: 1330, depth: 1200, minHeight: 700, maxHeight: 1180 },
    standingMechanism: HAND_CRANK_MECHANISM,
    features: ['cable-management', 'adjustable-feet', 'monitor-mount-holes'],
    compatibleAccessories: ['cable-management-tray', 'heavy-duty-casters'],
    weight: 52,
    priceTier: '$$$',
    featured: true,
    estimatedProductionTime: '10–14 working days',
  },
  {
    id: 'std-006',
    slug: 'standing-desk-l-shaped-solid-wood',
    sku: 'ABS-STD-006',
    name: 'L-Shaped Standing Desk — Solid Wood',
    category: 'standing',
    subType: 'l-standing',
    variant: 'with-top',
    description:
      'Our most premium configuration: L-shaped standing desk with a solid wood surface throughout. The hand-crank synchronized mechanism lifts both wings simultaneously for a perfectly level standing experience at any height.',
    images: [
      { src: '/gallery/standing/l-shaped-standing-solid-wood-1.jpg', alt: 'L-Shaped Standing Desk Solid Wood – front view', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'trading', 'developer'],
    frame: { material: 'mild-steel', finish: 'Gloss White', gaugeThickness: '14 gauge' },
    tabletop: { material: 'Solid Wood', thickness: '35mm' },
    dimensions: { widthMin: 860, widthMax: 1330, depth: 1200, minHeight: 700, maxHeight: 1180 },
    standingMechanism: { ...HAND_CRANK_MECHANISM, loadCapacity: 100 },
    features: ['cable-management', 'adjustable-feet', 'monitor-mount-holes'],
    compatibleAccessories: ['cable-management-tray'],
    weight: 68,
    priceTier: '$$$',
    featured: false,
    estimatedProductionTime: '10–14 working days',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Standing Adjustable Tables — Frame Only  (3 products)
// ─────────────────────────────────────────────────────────────────────────────
const STANDING_FRAME_ONLY: Product[] = [
  {
    id: 'std-007',
    slug: 'standing-frame-single-station',
    sku: 'ABS-STD-007',
    name: 'Standing Desk Frame — Single Station',
    category: 'standing',
    subType: 'single-station',
    variant: 'frame-only',
    description:
      'The complete hand-crank frame without the tabletop. Perfect for customers already owning a custom wood slab, imported surface, or glass top they want to mount. Adjustable crossbeam width accommodates tops from 860 mm to 1330 mm wide.',
    images: [
      { src: '/gallery/standing/frame-single-station-1.jpg', alt: 'Single Station Standing Frame – isolated view', width: 1200, height: 800 },
      { src: '/gallery/standing/frame-single-station-2.jpg', alt: 'Single Station Standing Frame – mechanism diagram', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'home-office', 'developer'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '14 gauge' },
    dimensions: { widthMin: 860, widthMax: 1330, depth: 600, minHeight: 700, maxHeight: 1180 },
    standingMechanism: HAND_CRANK_MECHANISM,
    features: ['adjustable-feet'],
    weight: 18,
    priceTier: '$',
    featured: false,
    estimatedProductionTime: '3–5 working days',
  },
  {
    id: 'std-008',
    slug: 'standing-frame-double-wide',
    sku: 'ABS-STD-008',
    name: 'Standing Desk Frame — Double Wide',
    category: 'standing',
    subType: 'double-wide',
    variant: 'frame-only',
    description:
      'Dual-station standing frame rated to 120 kg. Bring your own tabletop and save on total cost while still getting the same precision dual bevel gear mechanism used in our complete desks.',
    images: [
      { src: '/gallery/standing/frame-double-wide-1.jpg', alt: 'Double Wide Standing Frame – front view', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'trading'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '14 gauge' },
    dimensions: { widthMin: 1400, widthMax: 1800, depth: 700, minHeight: 700, maxHeight: 1180 },
    standingMechanism: { ...HAND_CRANK_MECHANISM, loadCapacity: 120 },
    features: ['adjustable-feet'],
    weight: 28,
    priceTier: '$$',
    featured: false,
    estimatedProductionTime: '3–5 working days',
  },
  {
    id: 'std-009',
    slug: 'standing-frame-l-shaped',
    sku: 'ABS-STD-009',
    name: 'Standing Desk Frame — L-Shaped',
    category: 'standing',
    subType: 'l-standing',
    variant: 'frame-only',
    description:
      'L-shaped height-adjustable frame without tabletop. Ideal for woodworking enthusiasts or those with an existing premium wood top. Both wings lift simultaneously via a single synchronized crank.',
    images: [
      { src: '/gallery/standing/frame-l-shaped-1.jpg', alt: 'L-Shaped Standing Frame – overhead view', width: 1200, height: 800 },
    ],
    idealFor: ['developer', 'trading'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '14 gauge' },
    dimensions: { widthMin: 860, widthMax: 1330, depth: 1200, minHeight: 700, maxHeight: 1180 },
    standingMechanism: HAND_CRANK_MECHANISM,
    features: ['adjustable-feet'],
    weight: 36,
    priceTier: '$$',
    featured: false,
    estimatedProductionTime: '5–7 working days',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Desk Accessories  (2 products)
// ─────────────────────────────────────────────────────────────────────────────
const ACCESSORIES: Product[] = [
  {
    id: 'acc-001',
    slug: 'cable-management-tray',
    sku: 'ABS-ACC-001',
    name: 'Under-Desk Cable Management Tray',
    category: 'accessories',
    subType: 'cable-tray',
    description:
      'Bolt-on steel cable management tray that mounts below the desk surface. Routes power strips, USB hubs, and cable bundles out of sight. Compatible with all AliBabaSteel desktop and standing desk frames.',
    images: [
      { src: '/gallery/accessories/cable-tray-1.jpg', alt: 'Cable Management Tray – installed view', width: 1200, height: 800 },
      { src: '/gallery/accessories/cable-tray-2.jpg', alt: 'Cable Management Tray – under-desk view', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'gaming', 'developer', 'home-office'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '18 gauge' },
    dimensions: { width: 800, depth: 150, height: 100 },
    features: ['cable-management'],
    weight: 1.5,
    priceTier: '$',
    featured: false,
    estimatedProductionTime: '2–3 working days',
  },
  {
    id: 'acc-002',
    slug: 'heavy-duty-casters',
    sku: 'ABS-ACC-002',
    name: 'Heavy-Duty Lockable Casters (Set of 4)',
    category: 'accessories',
    subType: 'casters',
    description:
      'Set of 4 heavy-duty steel casters with dual-lock brakes. Replaces standard adjustable feet on any AliBabaSteel frame. Allows the entire desk to roll freely for reconfiguration, then locks solid at the push of a heel.',
    images: [
      { src: '/gallery/accessories/heavy-duty-casters-1.jpg', alt: 'Lockable Casters Set – product view', width: 1200, height: 800 },
      { src: '/gallery/accessories/heavy-duty-casters-2.jpg', alt: 'Lockable Casters – installed on frame leg', width: 1200, height: 800 },
    ],
    idealFor: ['office', 'gaming'],
    frame: { material: 'mild-steel', finish: 'Silver Grey', gaugeThickness: '16 gauge' },
    dimensions: { width: 60, depth: 60, height: 75 },
    features: [],
    weight: 2,
    priceTier: '$',
    featured: false,
    estimatedProductionTime: '1–2 working days',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Custom / Showcase Entries  (4 products)
// ─────────────────────────────────────────────────────────────────────────────
const CUSTOM_TABLES: Product[] = [
  {
    id: 'cst-001',
    slug: 'custom-trading-floor-desk',
    sku: 'ABS-CST-001',
    name: 'Custom Trading Floor Desk',
    category: 'custom',
    subType: 'corner',
    description:
      'Showcase build: a 6-monitor trading desk fabricated for a Karachi-based trading firm. 2400 mm wide steel-sheet tabletop, dual monitor mount holes, integrated cable spine, and lockable casters for easy desk rotation during market hours.',
    images: [
      { src: '/gallery/custom/trading-floor-desk-1.jpg', alt: 'Custom Trading Floor Desk – full setup', width: 1200, height: 800 },
      { src: '/gallery/custom/trading-floor-desk-2.jpg', alt: 'Custom Trading Floor Desk – monitor array', width: 1200, height: 800 },
    ],
    idealFor: ['trading'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '14 gauge' },
    tabletop: { material: 'Steel Sheet', thickness: '2mm' },
    dimensions: { width: 2400, depth: 800, height: 750 },
    features: ['cable-management', 'monitor-mount-holes', 'adjustable-feet'],
    compatibleAccessories: ['heavy-duty-casters'],
    weight: 85,
    priceTier: '$$$',
    featured: true,
    estimatedProductionTime: '14–21 working days',
  },
  {
    id: 'cst-002',
    slug: 'custom-streaming-studio-desk',
    sku: 'ABS-CST-002',
    name: 'Custom Streaming Studio Desk',
    category: 'custom',
    subType: 'gaming',
    description:
      'Showcase build for a local content creator. Curved front edge, integrated microphone boom arm mount, rear camera riser shelf, and an RGB LED strip channel routed along the frame. MDF top with custom black matte wrap.',
    images: [
      { src: '/gallery/custom/streaming-studio-desk-1.jpg', alt: 'Custom Streaming Studio Desk – full view', width: 1200, height: 800 },
      { src: '/gallery/custom/streaming-studio-desk-2.jpg', alt: 'Custom Streaming Studio Desk – mic arm mount detail', width: 1200, height: 800 },
    ],
    idealFor: ['streaming', 'gaming'],
    frame: { material: 'mild-steel', finish: 'Matte Black', gaugeThickness: '16 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { width: 1600, depth: 800, height: 750 },
    features: ['cable-management', 'monitor-mount-holes'],
    compatibleAccessories: ['cable-management-tray'],
    weight: 45,
    priceTier: '$$$',
    featured: false,
    estimatedProductionTime: '14–21 working days',
  },
  {
    id: 'cst-003',
    slug: 'custom-glass-executive-desk',
    sku: 'ABS-CST-003',
    name: 'Custom Glass-Top Executive Desk',
    category: 'custom',
    subType: 'office',
    description:
      'Showcase build: 10 mm tempered glass top on a powder-coated gloss white frame for a C-suite executive. Minimalist profile with concealed cable channels. The glass top is sourced and cut to order; the frame is manufactured in-house.',
    images: [
      { src: '/gallery/custom/glass-executive-desk-1.jpg', alt: 'Custom Glass Executive Desk – front view', width: 1200, height: 800 },
    ],
    idealFor: ['office'],
    frame: { material: 'mild-steel', finish: 'Gloss White', gaugeThickness: '16 gauge' },
    tabletop: { material: 'Glass', thickness: '10mm' },
    dimensions: { width: 1600, depth: 800, height: 750 },
    features: ['cable-management', 'adjustable-feet'],
    weight: 52,
    priceTier: '$$$',
    featured: true,
    estimatedProductionTime: '14–21 working days',
  },
  {
    id: 'cst-004',
    slug: 'custom-home-office-bundle',
    sku: 'ABS-CST-004',
    name: 'Custom Home Office Bundle',
    category: 'custom',
    subType: 'office',
    description:
      'Showcase build: a matched home office set — height-adjustable standing desk (MDF top), a fixed side table, and a wall-mounted monitor shelf — all in powder-coated silver grey. Designed for a home office renovation project.',
    images: [
      { src: '/gallery/custom/home-office-bundle-1.jpg', alt: 'Custom Home Office Bundle – full room view', width: 1200, height: 800 },
      { src: '/gallery/custom/home-office-bundle-2.jpg', alt: 'Custom Home Office Bundle – desk detail', width: 1200, height: 800 },
    ],
    idealFor: ['home-office'],
    frame: { material: 'mild-steel', finish: 'Silver Grey', gaugeThickness: '16 gauge' },
    tabletop: { material: 'MDF', thickness: '25mm' },
    dimensions: { width: 1400, depth: 700, height: 750 },
    features: ['cable-management', 'adjustable-feet'],
    compatibleAccessories: ['cable-management-tray'],
    weight: 35,
    priceTier: '$$$',
    featured: false,
    estimatedProductionTime: '14–21 working days',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Master export  (20 products total — 5 simple, 9 standing, 2 accessories, 4 custom)
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_PRODUCTS: Product[] = [
  ...SIMPLE_TABLES,
  ...STANDING_WITH_TOP,
  ...STANDING_FRAME_ONLY,
  ...ACCESSORIES,
  ...CUSTOM_TABLES,
];

export const FEATURED_PRODUCTS = ALL_PRODUCTS.filter(p => p.featured);

