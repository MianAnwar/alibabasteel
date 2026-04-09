// AliBabaSteel — Product data models

export type ProductCategory =
  | 'simple' | 'standing' | 'accessories' | 'custom'
  | 'center-table' | 'dining-table' | 'home-decor'
  | 'lawn-sofa-chairs' | 'lawn-table-chairs'
  | 'mirror-console' | 'simple-center-tables'
  | 'tables' | 'trolly-table';

export type ProductSubType =
  | 'gaming'
  | 'office'
  | 'student'
  | 'corner'
  | 'single-station'
  | 'double-wide'
  | 'l-standing'
  | 'cable-tray'
  | 'casters'
  | 'center-table'
  | 'dining-table'
  | 'home-decor'
  | 'lawn-sofa'
  | 'lawn-table'
  | 'mirror-console'
  | 'simple-center-table'
  | 'general-table'
  | 'trolly-table';
export type ProductVariant = 'frame-only' | 'with-top' | 'complete';
export type PriceTier = '$' | '$$' | '$$$';
export type IdealUseCase =
  | 'gaming'
  | 'office'
  | 'trading'
  | 'student'
  | 'streaming'
  | 'developer'
  | 'home-office'
  | 'living-room'
  | 'dining'
  | 'outdoor'
  | 'home-decor';

export interface ProductImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductVideo {
  url: string; // YouTube embed URL
  type: 'demo' | 'assembly' | 'review';
  title: string;
}

export interface StandingMechanismSpec {
  type: 'hand-crank';
  gearSystem: 'dual-bevel-gear';
  liftColumns: 2;
  loadCapacity: number; // kg
  heightMin: number; // mm
  heightMax: number; // mm
}

export interface Product {
  id: string;
  slug: string;
  sku: string; // ABS-SMP-001, ABS-STD-001, ABS-ACC-001
  name: string;
  category: ProductCategory;
  subType: ProductSubType;
  variant?: ProductVariant; // standing desks only
  description: string;
  images: ProductImage[];
  videos?: ProductVideo[];
  idealFor: IdealUseCase[];
  frame?: {
    material: 'mild-steel' | 'stainless-steel';
    finish: string; // 'Matte Black' | 'Gloss White' | 'Raw Steel' | 'Silver Grey' | 'Custom'
    gaugeThickness: string; // e.g. '16 gauge'
  };
  tabletop?: {
    material: string; // 'MDF' | 'Particle Board' | 'Solid Wood' | 'Glass' | 'Steel Sheet' | 'Customer-Provided'
    thickness?: string; // e.g. '25mm'
  };
  dimensions: {
    width?: number; // mm — fixed width
    widthMin?: number; // mm — for adjustable crossbeam
    widthMax?: number; // mm
    depth: number; // mm
    height?: number; // mm — fixed height
    minHeight?: number; // mm — standing desks
    maxHeight?: number; // mm — standing desks
  };
  standingMechanism?: StandingMechanismSpec;
  features: string[];
  compatibleAccessories?: string[]; // product slugs
  weight?: number; // kg
  priceTier: PriceTier;
  featured: boolean;
  estimatedProductionTime: string; // e.g. '5–7 working days'
}

export interface Category {
  slug: ProductCategory;
  label: string;
  description: string;
  coverImage: string;
  itemCount: number;
}

export interface QAEntry {
  id: string;
  productSlug: string;
  question: string;
  askedBy: string;
  askedAt: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
}

export interface Inquiry {
  id: string;
  referenceNumber: string; // ABS-XXXXXXXXX-XXXX
  source: 'standard' | 'bulk' | 'configure';
  category: ProductCategory;
  referenceProductSlug?: string;
  requirements: string;
  dimensions?: string;
  standingRequired: boolean;
  materialPreference?: string;
  finish?: string;
  quantity: number;
  uploadedImages: string[]; // file paths
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  contactCity?: string;
  companyName?: string;
  industry?: string;
  budgetRange?: string;
  timeline?: string;
  preferredContactMethod: 'whatsapp' | 'email' | 'phone';
  status: 'new' | 'contacted' | 'quoted' | 'won' | 'lost';
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown
  coverImage: string;
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
  relatedProductSlugs?: string[];
}

export interface FaqEntry {
  id: string;
  topic: FaqTopic;
  question: string;
  answer: string;
}

export type FaqTopic =
  | 'standing-desks'
  | 'materials-finishes'
  | 'ordering-pricing'
  | 'delivery-assembly'
  | 'warranty-support';
