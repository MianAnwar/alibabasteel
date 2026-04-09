import { Category } from '../models/product.model';
import { ALL_PRODUCTS } from './products.data';

export const ALL_CATEGORIES: Category[] = [
  {
    slug: 'simple',
    label: 'Simple Computer Tables',
    description:
      'Fixed-height steel-frame desks for gaming, office, student, and corner setups. Available in a range of widths and finishes — built to last and priced for every budget.',
    coverImage: '/alibaba-catalog/computer-tables/table-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'simple').length,
  },
  {
    slug: 'standing',
    label: 'Standing Adjustable Tables',
    description:
      'Hand-crank height-adjustable desks (700–1180 mm) with a precision dual bevel gear synchronized drive shaft. Available as complete desk or frame-only for custom tabletops.',
    coverImage: '/gallery/standing/height-adjustable-desk-bevel-gear-synchronized-lifting.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'standing').length,
  },
  {
    slug: 'accessories',
    label: 'Desk Accessories',
    description:
      'Under-desk cable management trays and heavy-duty lockable casters — made in-house to the same steel standards as our desks and compatible with every frame we produce.',
    coverImage: '/alibaba-catalog/trolly-table/trolly-table-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'accessories').length,
  },
  {
    slug: 'custom',
    label: 'Custom Computer Tables',
    description:
      'Fully bespoke fabrication — any dimension, any material, any finish. Browse showcase builds for inspiration, then start a custom quotation. Turnaround from 14 working days.',
    coverImage: '/alibaba-catalog/computer-tables/table-05.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'custom').length,
  },
  {
    slug: 'center-table',
    label: 'Center Tables',
    description:
      'Elegant steel-framed center tables for living rooms and lounges. Available in glass-top, marble-finish, and powder-coated designs — crafted for style and durability.',
    coverImage: '/alibaba-catalog/center-table/center-table-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'center-table').length,
  },
  {
    slug: 'dining-table',
    label: 'Dining Tables',
    description:
      'Sturdy steel-leg dining tables in a variety of sizes and finishes. From compact 4-seater sets to grand 8-seater arrangements — built for family gatherings.',
    coverImage: '/alibaba-catalog/dining-table/dining-table-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'dining-table').length,
  },
  {
    slug: 'home-decor',
    label: 'Home Décor',
    description:
      'Decorative steel accents, shelving units, and artistic home-décor pieces. Each piece balances industrial character with refined finishing.',
    coverImage: '/alibaba-catalog/home-decor/home-decor-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'home-decor').length,
  },
  {
    slug: 'lawn-sofa-chairs',
    label: 'Lawn Sofa & Chairs',
    description:
      'Weather-resistant steel-frame outdoor sofas and chairs with comfortable cushion sets. Perfect for gardens, terraces, and farmhouse lawns.',
    coverImage: '/alibaba-catalog/lawn-sofa-chairs/lawn-sofa-chairs-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'lawn-sofa-chairs').length,
  },
  {
    slug: 'lawn-table-chairs',
    label: 'Lawn Table & Chair Sets',
    description:
      'Complete outdoor dining and leisure sets combining steel-frame tables with matching chairs. Designed for year-round outdoor use in Pakistan\'s climate.',
    coverImage: '/alibaba-catalog/lawn-table-chairs/lawn-table-chairs-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'lawn-table-chairs').length,
  },
  {
    slug: 'mirror-console',
    label: 'Mirror & Console Tables',
    description:
      'Decorative console tables paired with elegant mirrors — ideal for entranceways, dressing areas, and living rooms. Steel frames with varied top finishes.',
    coverImage: '/alibaba-catalog/mirror-console/mirror-console-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'mirror-console').length,
  },
  {
    slug: 'simple-center-tables',
    label: 'Simple Center Tables',
    description:
      'Minimalist steel center and side tables for everyday living spaces. Clean lines and solid construction at an accessible price point.',
    coverImage: '/alibaba-catalog/simple-center-tables/simple-center-table-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'simple-center-tables').length,
  },
  {
    slug: 'computer-tables',
    label: 'Steel Tables',
    description:
      'A versatile range of steel tables for indoor and outdoor use — from utility side tables to multi-purpose work surfaces. Built to last.',
    coverImage: '/alibaba-catalog/computer-tables/table-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'computer-tables').length,
  },
  {
    slug: 'trolly-table',
    label: 'Trolley Tables',
    description:
      'Mobile steel trolley tables on lockable casters — ideal for kitchens, hospitals, offices, and workshops. Easy to move, easy to store.',
    coverImage: '/alibaba-catalog/trolly-table/trolly-table-01.jpeg',
    itemCount: ALL_PRODUCTS.filter(p => p.category === 'trolly-table').length,
  },
];
