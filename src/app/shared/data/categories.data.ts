import { Category } from '../models/product.model';
import { ALL_PRODUCTS } from './products.data';

export const ALL_CATEGORIES: Category[] = [
  {
    slug: 'simple',
    label: 'Simple Computer Tables',
    description:
      'Fixed-height steel-frame desks for gaming, office, student, and corner setups. Available in a range of widths and finishes — built to last and priced for every budget.',
    coverImage: '/gallery/simple/executive-office-desk-1.jpg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'simple').length,
  },
  {
    slug: 'standing',
    label: 'Standing Adjustable Tables',
    description:
      'Hand-crank height-adjustable desks (700–1180 mm) with a precision dual bevel gear synchronized drive shaft. Available as complete desk or frame-only for custom tabletops.',
    coverImage: '/gallery/standing/standing-single-classic-1.jpg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'standing').length,
  },
  {
    slug: 'accessories',
    label: 'Desk Accessories',
    description:
      'Under-desk cable management trays and heavy-duty lockable casters — made in-house to the same steel standards as our desks and compatible with every frame we produce.',
    coverImage: '/gallery/accessories/cable-tray-1.jpg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'accessories').length,
  },
  {
    slug: 'custom',
    label: 'Custom Computer Tables',
    description:
      'Fully bespoke fabrication — any dimension, any material, any finish. Browse showcase builds for inspiration, then start a custom quotation. Turnaround from 14 working days.',
    coverImage: '/gallery/custom/trading-floor-desk-1.jpg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'custom').length,
  },
];
