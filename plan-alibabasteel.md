# Plan: AliBabaSteel — Computer Tables Web App

## TL;DR

Build a new Angular 21 SSR web app for **AliBabaSteel**, a computer tables manufacturing unit. The app mirrors the architecture of the existing **FurLi / MSF Furniture** codebase (in this repo) but is specialized for four product lines:

- **Simple Computer Tables** — gaming, office, student, L-shaped/corner
- **Standing Adjustable Tables** — hand-crank mechanism (dual bevel gear, synchronized drive shaft, precision lead screws), frame-only and with-top variants
- **Desk Accessories** — cable management trays, lockable casters
- **Custom Computer Tables** — fully bespoke, inquiry-only

Inquiry-only model (no payments). English only. Full admin dashboard. Deployed on Vercel or Firebase Hosting.

> **Competitive benchmarks**: [Jin Office Solutions](https://jin.net.in) (India, 90K+ desks, e-commerce) and [DEXX.pk](https://dexx.pk) (Pakistan, Rs 30K–265K, smart desks). Key features adopted from their playbooks: use-case showcases, accessory upsells, frame-only variants, video embeds, Q&A sections, FAQ pages, bulk inquiry forms, blog/SEO content, and trust-signal sections.

---

## Architecture

| Concern            | Choice                                                                 |
|--------------------|------------------------------------------------------------------------|
| Framework          | Angular 21 + SSR (`@angular/ssr`)                                      |
| Styling            | Tailwind CSS v4 — dark industrial theme (charcoal, steel-blue, amber) |
| i18n               | English only — no `@ngx-translate` (inline strings or TS constants)   |
| Icons              | `lucide-angular`                                                       |
| Backend            | Express.js (Angular SSR server) + in-memory store → Prisma + SQLite   |
| Auth               | JWT HS256, 24 h TTL — protects `/admin/*` routes                      |
| Image uploads      | `multer` — stored in `public/uploads/`, 5 MB max, JPG/PNG/WebP only   |
| SEO                | JSON-LD (`Product`, `LocalBusiness`, `BreadcrumbList`), canonical tag  |
| SSR strategy       | Prerender `/`; SSR all catalog pages; CSR `/admin/*`                   |
| PWA                | `ngsw-config.json` (asset + API caching)                               |
| Hosting            | Vercel (via `@vercel/angular`) or Firebase Hosting                     |
| Analytics          | Google Analytics 4 via `gtag.js`                                       |

---

## Product Categories & Data

### Categories

| Slug          | Label                      | Subtypes                                                                 |
|---------------|----------------------------|--------------------------------------------------------------------------|
| `simple`      | Simple Computer Tables     | gaming, office, student, corner                                          |
| `standing`    | Standing Adjustable Tables | single-station, double-wide, l-shaped-standing                           |
| `accessories` | Desk Accessories           | cable-tray, casters                                                        |
| `custom`      | Custom Computer Tables     | (bespoke — no fixed subtypes)                                            |

### Product Variants (inspired by Jin Office)

Standing desks are sold in two variants:
- **Frame + Tabletop** — complete desk, ready to assemble
- **Frame Only** — for customers who provide their own tabletop (custom wood, imported surface, etc.)

This is modeled via `variant: 'frame-only' | 'with-top' | 'complete'` on each product.

### Standing Desk Mechanism Specs (from product images)

| Spec                     | Value                                            |
|--------------------------|--------------------------------------------------|
| Mechanism type           | Hand crank                                       |
| Gear system              | Dual bevel gear + synchronized drive shaft       |
| Lift columns             | 2 (synchronized)                                 |
| Lead screws              | Precision vertical lead screws (dual)            |
| Height range             | 700 mm – 1180 mm (27.6″ – 46.5″)                |
| Width range (crossbeam)  | 860 mm – 1330 mm (33.9″ – 52.4″)                |
| Base depth               | 600 mm (23.6″)                                   |

### Tabletop Materials (all supported)

- MDF / Particle Board
- Solid Wood
- Glass
- Steel Sheet
- Customer-Provided

### Frame Finishes

Matte Black · Gloss White · Raw Steel · Silver Grey · Custom Color (powder coat)

---

## Data Models

### `Product` (table-specific extensions vs FurLi)

```typescript
interface Product {
  id: string;
  slug: string;
  sku: string;                // e.g. 'ABS-SMP-001', 'ABS-STD-003', 'ABS-ACC-010'
  name: string;
  category: 'simple' | 'standing' | 'accessories' | 'custom';
  subType: string;  // 'gaming' | 'office' | 'student' | 'corner' | 'single-station' | 'double-wide' | 'l-standing' | 'cable-tray' | 'casters'
  variant?: 'frame-only' | 'with-top' | 'complete';  // standing desks sold both ways
  description: string;
  images: ProductImage[];
  videos?: ProductVideo[];     // assembly, demo, review YouTube embeds
  idealFor: string[];          // 'gaming' | 'office' | 'trading' | 'student' | 'streaming' | 'developer' | 'home-office'
  frame: {
    material: string;       // 'mild-steel' | 'stainless-steel'
    finish: string;
    gaugeThickness: string;
  };
  tabletop?: {               // optional for frame-only and accessories
    material: string;
    thickness?: string;
  };
  dimensions: {
    width?: number;
    widthMin?: number;
    widthMax?: number;
    depth: number;
    height?: number;
    minHeight?: number;  // standing desks
    maxHeight?: number;  // standing desks
  };
  standingMechanism?: {
    type: 'hand-crank';
    gearSystem: 'dual-bevel-gear';
    liftColumns: 2;
    loadCapacity: number;  // kg
  };
  features: string[];  // 'cable-management' | 'monitor-mount-holes' | 'adjustable-feet'
  compatibleAccessories?: string[];  // slugs of accessory products that upsell with this item
  weight?: number;
  priceTier: '$' | '$$' | '$$$';
  featured: boolean;
  estimatedProductionTime: string;
}

interface ProductVideo {
  url: string;          // YouTube embed URL
  type: 'demo' | 'assembly' | 'review';
  title: string;
}

interface QAEntry {
  id: string;
  productSlug: string;
  question: string;
  askedBy: string;
  askedAt: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
}
```

### `Accessory`

Accessories use the same `Product` interface with `category: 'accessories'`. They are cross-linked from table products via `compatibleAccessories[]` slugs.

### `Inquiry`

Same structure as FurLi's `Inquiry` model with:
- Reference number format: **`ABS-XXXXXXXXX-XXXX`**
- `category` values: `'simple' | 'standing' | 'custom'`
- Extra field: `standingRequired?: boolean`

---

## Site Map & Routes

```
/                          → Home (hero, use-case showcase, categories, featured, how-it-works, trust signals, CTA)
/catalog                   → Category grid (4 categories)
/catalog/:category         → Product grid + subtype filter tabs
/catalog/:category/:item   → Product detail page (specs, mechanism, videos, Q&A, accessories upsell)
/compare                   → Side-by-side comparison (Simple vs Standing vs Custom)
/configure                 → "Build Your Table" 4-step wizard
/custom-order              → 5-step custom quotation wizard
/bulk-order                → Corporate / bulk inquiry form (5+ units)
/gallery                   → Portfolio gallery (filter by category)
/faq                       → FAQ page (accordion, 20+ questions)
/blog                      → Blog listing (ergonomics, guides, comparisons)
/blog/:slug                → Blog article detail
/about                     → About AliBabaSteel
/contact                   → Contact info, WhatsApp, map, social
/admin/login               → Admin login (unguarded)
/admin                     → Dashboard (authGuard)
/admin/inquiries           → Inquiry management (authGuard)
/admin/qa                  → Q&A moderation (authGuard)
```

> Note: FurLi uses `/:locale/...` prefix for bilingual support. AliBabaSteel is English-only so routes are flat (no locale prefix), simplifying routing significantly.

---

## APP_LINKS (to fill in)

```typescript
// src/app/core/config/app-links.ts
export const APP_LINKS = {
  phonePrimary:       'TODO',          // AliBabaSteel primary phone
  phoneSecondary:     'TODO',          // optional
  emails: {
    info:    'alibabasteel212@gmail.com',  // from existing FurLi config
    orders:  'TODO',
  },
  whatsappNumber:    'TODO',           // international format, no +
  whatsappMessage:   'Hi AliBabaSteel! I have a question about your computer tables.',
  instagram:         'TODO',
  facebook:          'TODO',
  tiktok:            'TODO',
  youtube:           'TODO',
  mapEmbedUrl:       'TODO',
  siteUrl:           'TODO',
  siteName:          'AliBabaSteel',
  addressLine1:      'TODO',
  addressLine2:      'TODO',
};
```

---

## Implementation Phases

### Phase 1 — Project Bootstrap

1. `ng new alibabasteel --ssr --routing --style=scss` (Angular 21)
2. Install dependencies:
   ```
   tailwindcss@^4  lucide-angular  express@^5
   jsonwebtoken @types/jsonwebtoken
   multer @types/multer
   better-sqlite3  @prisma/client  prisma (dev)
   vitest (dev)
   ```
3. Configure `angular.json` (SSR, assets, budgets), `tsconfig`, Tailwind v4 with custom CSS variables for brand palette
4. Configure SSR render modes: prerender `/`, SSR catalog, CSR `/admin/*`

### Phase 2 — Core Infrastructure

**Shell components** (replicate from [src/app/components/](src/app/components/)):

| Component | Notes |
|---|---|
| `LayoutComponent` | Header + `<router-outlet>` + Footer |
| `HeaderComponent` | Nav, dark mode toggle, search icon, hamburger (no language switcher) |
| `FooterComponent` | Links, contact, social icons |
| `WhatsappButtonComponent` | Fixed floating CTA |

**Services** (replicate from [src/app/core/services/](src/app/core/services/)):

| Service | Notes |
|---|---|
| `ThemeService` | Dark/light signal, localStorage + prefers-color-scheme |
| `SeoService` | Title/meta, canonical, JSON-LD schemas |
| `AuthService` | `POST /api/auth/login`, JWT signal |
| `InquiryService` | CRUD on `/api/inquiries` |
| `ConfigService` | `APP_LINKS`, `getWhatsAppLink()` builder |

**Guards & Interceptors**:
- `AuthGuard` — protects `/admin` routes
- `AuthInterceptor` — attaches `Authorization: Bearer <token>` to `/api/` requests

**Shared components**:
- `ProductCardComponent`, `ProductCardSkeletonComponent`
- `SkeletonComponent` (text/image/card/circle variants)
- `ImageGalleryComponent` (lightbox, thumbnails, keyboard nav)
- `ProductSearchComponent` (search modal, fuzzy match on name/category/subType/features)

### Phase 3 — Product Data

5. `src/app/shared/data/products.data.ts` — ~25 sample products:
   - 5 simple tables (gaming × 2, office, student, corner)
   - 6 standing adjustable with-top (single × 2, double wide × 2, L-shaped × 2)
   - 3 standing frame-only variants (single, double, L-shaped)
   - 2 accessories (cable tray, casters)
   - 4 custom/showcase entries
6. `src/app/shared/data/categories.data.ts` — 4 category definitions with cover images, descriptions, item counts
7. `src/app/shared/data/faq.data.ts` — 20+ FAQ entries organized by topic (standing desks, materials, ordering, delivery, assembly)
8. `src/app/shared/data/blog-posts.data.ts` — 5 initial blog articles (static markdown content):
   - "Benefits of Standing Desks for Pakistani Professionals"
   - "Hand Crank vs Electric: Which Standing Desk Mechanism?"
   - "How to Choose the Right Computer Table Size for Your Setup"
   - "Complete Guide: Cable Management for Your Desk Setup"
   - "Gaming Desk vs Office Desk: What's the Real Difference?"
9. Add product photos to `public/gallery/simple/`, `public/gallery/standing/`, `public/gallery/accessories/`, `public/gallery/custom/`

### Phase 4 — Public Pages

8. **Home page**:
   - Hero (title, subtitle, "Explore Catalog" + "Get a Quote" CTAs)
   - Product search bar
   - **Use-Case Showcase** — infinite-scroll marquee of context photos: Gaming Setup, Office Workstation, Trading Desk, Student Study Corner, Streaming Setup, Home Office, Developer Station (inspired by Jin's "Empowering" section)
   - Category showcase (4 cards — simple, standing, accessories, custom)
   - Featured Work carousel
   - How It Works (Browse → Configure → Order)
   - **Comparison snapshot** — visual Simple vs Standing vs Custom quick-compare cards with key specs
   - Testimonials (customer setup photos + star ratings + text)
   - **Trust Signals** — "X+ Tables Delivered", "Y Years of Experience", corporate client logos marquee (if available)
   - CTA banner

9. **Catalog index** (`/catalog`): 4 category cards with cover image, item count, and short description

10. **Category page** (`/catalog/:category`):
    - Masonry/grid layout with subtype filter tabs
    - For `standing` category: additional "Frame Only" / "With Top" toggle filter
    - Inline product search/filter

11. **Product detail** (`/catalog/:category/:item`):
    - Multi-image lightbox
    - Full spec table (SKU, materials, dimensions, weight, gauge, finish, load capacity)
    - **"Ideal For" tags** — visual badges showing Gaming, Office, Trading, Student, etc.
    - **Standing desk exclusive section** — "Mechanism" panel showing:
      - Height adjustment range (700–1180 mm) visualized with interactive slider graphic
      - Bevel gear system specs, synchronized drive shaft, lead screw specs
      - Load capacity, lift column count
      - Reference to attached product diagram images
    - **Videos section** — tabbed: Demo Video / Assembly Video / Review Video (YouTube embeds)
    - **Q&A section** — customer questions + admin answers (stored in DB, managed from `/admin/qa`)
    - **"Complete Your Setup" accessories upsell** — carousel of compatible accessories linked via `compatibleAccessories[]`
    - CTAs: "Build Your Table" (→ `/configure?type=standing`) / "Custom Order" (→ `/custom-order?ref=<slug>`) / "Chat on WhatsApp"
    - SEO: breadcrumb + Product JSON-LD + canonical

12. **Gallery page** — masonry grid, filter by `simple | standing | accessories | custom`, plus "Customer Setups" tab showing real client workspace photos

13. **About page** — Company story, manufacturing process (5 steps), materials section, stats counter (animated numbers on scroll)

14. **Contact page** — Contact card (phone, email, address, hours), WhatsApp button, Google Maps embed, contact form → `POST /api/contact`

15. **FAQ page** (`/faq`) — accordion grouped by topic:
    - Standing Desks (height range, load capacity, hand crank usage, assembly time)
    - Materials & Finishes (tabletop options, powder coating durability, custom colours)
    - Ordering & Pricing (how inquiry works, quote turnaround, bulk pricing)
    - Delivery & Assembly (shipping areas, assembly required?, DIY tips)
    - Warranty & Support (warranty terms, spare parts, after-sales)

16. **Blog** (`/blog`) — card grid listing; `/blog/:slug` renders markdown article with SEO meta, related products sidebar, CTA to custom order

17. **Comparison page** (`/compare`) — interactive side-by-side table:
    - Rows: price tier, height adjustable?, mechanism, tabletop options, dimensions, features, production time
    - Columns: Simple | Standing | Custom
    - CTAs per column linking to configure wizard pre-filled

18. **Bulk Order page** (`/bulk-order`) — specialized form:
    - Company name, industry, quantity range (5–10, 10–50, 50+), table type preference
    - Timeline, budget range
    - Contact details → `POST /api/inquiries` with `source: 'bulk'`

### Phase 5 — "Build Your Table" Configure Wizard (`/configure`)

4-step wizard (reference: [src/app/pages/configure/](src/app/pages/configure/)):

| Step | Content |
|---|---|
| 1 — Table Type | Simple / Standing Adjustable / Custom |
| 2 — Size | Width, depth; for standing: height range selector (700–1180 mm slider) |
| 3 — Materials | Tabletop material + frame finish picker |
| 4 — Add-ons | Cable management tray, monitor mount holes, adjustable feet |

→ Summary card + "You Might Like" matched products + WhatsApp message pre-fill + "Start Custom Order" button

### Phase 6 — Custom Order Wizard (`/custom-order`)

5-step wizard (reference: [src/app/pages/custom-order/](src/app/pages/custom-order/)):

| Step | Content |
|---|---|
| 1 — Type & Reference | Table type + optional reference product (auto-prefill from `?ref=<slug>`) |
| 2 — Requirements | Description (min 10 chars), dimensions, standing required toggle, material, finish, quantity |
| 3 — Upload Images | Drag & drop, max 3 images, 5 MB each, JPG/PNG/WebP |
| 4 — Contact Details | Name, phone (+92 format), email, city, preferred contact method (WhatsApp/email/phone) |
| 5 — Review & Submit | `POST /api/inquiries` → success page with ref `ABS-XXXXXXXXX-XXXX` + WhatsApp button |

### Phase 7 — Express Backend

Reference: [src/server.ts](src/server.ts)

```
POST /api/auth/login         Public — JWT HS256, 24 h TTL
POST /api/inquiries          Public — returns { referenceNumber: 'ABS-...' }
GET  /api/inquiries          Bearer JWT — paginated, filterable
GET  /api/inquiries/:id      Bearer JWT
PATCH /api/inquiries/:id     Bearer JWT — status, notes
POST /api/contact            Public — contact form (email/WhatsApp routing)
POST /api/bulk-inquiry       Public — bulk/corporate inquiry (company, qty range, timeline)
POST /api/upload             Public (rate-limited) — multer, validated type + size
GET  /api/qa/:productSlug    Public — approved Q&A for a product
POST /api/qa                 Public — submit a question (requires name + product slug)
PATCH /api/qa/:id            Bearer JWT — admin answers / approves a Q&A entry
GET  /api/qa                 Bearer JWT — all Q&A entries (pending + answered)
GET  /sitemap.xml            All public pages + 4 categories + blog posts
GET  /robots.txt             Disallows /admin/
```

**Prisma schema** (`prisma/schema.prisma`):
```prisma
model Inquiry {
  id                    String   @id @default(cuid())
  referenceNumber       String   @unique  // ABS-XXXXXXXXX-XXXX
  source                String   @default("standard")  // 'standard' | 'bulk' | 'configure'
  category              String
  referenceProductSlug  String?
  requirements          String
  dimensions            String?
  standingRequired      Boolean  @default(false)
  materialPreference    String?
  finish                String?
  quantity              Int      @default(1)
  uploadedImages        String   // JSON array of paths
  contactName           String
  contactPhone          String
  contactEmail          String?
  contactCity           String?
  companyName           String?  // for bulk orders
  preferredContactMethod String
  status                String   @default("new")
  internalNotes         String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}

model QAEntry {
  id           String   @id @default(cuid())
  productSlug  String
  question     String
  askedBy      String
  answer       String?
  answeredBy   String?
  approved     Boolean  @default(false)
  createdAt    DateTime @default(now())
  answeredAt   DateTime?
}
```

### Phase 8 — Admin Dashboard

Reference: [src/app/admin/](src/app/admin/)

- **Login** ([admin/login/](src/app/admin/login/)): JWT flow, `POST /api/auth/login`
- **Dashboard** ([admin/dashboard/](src/app/admin/dashboard/)): 6 stat cards (total, new, contacted, quoted, won, lost + this-week), recent 8 inquiries table, bulk vs standard inquiry breakdown
- **Inquiries** ([admin/inquiries/](src/app/admin/inquiries/)): Search by ref/name/email/city, filter by status + category + source (standard/bulk), expandable rows, status dropdown, notes editor, direct WhatsApp link to customer
- **Q&A Moderation** (`/admin/qa`): List of pending questions, answer text field, approve/reject toggle, filter by product slug

### Phase 9 — SEO & PWA

- `SeoService.setPage()` called on every route change (title, description, canonical)
- JSON-LD `Product` schema on item pages; `LocalBusiness` schema on home + contact; `FAQPage` schema on `/faq`; `Article` schema on `/blog/:slug`
- `NgOptimizedImage` on all product images (lazy loading, `srcset`, `sizes`)
- `ngsw-config.json` for precaching assets + `/api/` network-first strategy
- `sitemap.xml` lists all public pages + 4 categories + blog posts
- OG / Twitter card meta tags on all pages
- Blog posts provide long-tail SEO keyword coverage (ergonomics, desk comparisons, setup guides)

### Phase 10 — Polish & Deployment

- Form validation: phone regex (`/^\+?92[0-9]{10}$/`), image size/type validators
- Skeleton loading states on all async data surfaces
- Dark/light theme (matches FurLi's `ThemeService` pattern)
- Lighthouse audit target: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90
- Production build validation: `ng build --configuration=production`, bundle < 500 KB initial
- Deploy: Vercel `@vercel/angular` adapter or Firebase Hosting + Cloud Functions

---

## Verification Checklist

- [ ] `ng build --configuration=production` — no errors
- [ ] Initial JS bundle < 500 KB (Lighthouse / source maps)
- [ ] `POST /api/inquiries` returns `{ referenceNumber: 'ABS-...' }`, record persists in SQLite
- [ ] Standing desk product page renders "Mechanism" specs panel with bevel gear / height range data
- [ ] Standing desk product page shows "Frame Only" variant option
- [ ] Product detail page renders Videos tab, Q&A section, and "Complete Your Setup" accessories carousel
- [ ] Configure wizard: summary card accurately reflects all 4 steps; WhatsApp message pre-filled
- [ ] Custom order wizard: `?ref=<slug>` auto-prefills category + reference product on step 1
- [ ] Bulk order form submits with `source: 'bulk'` and persists in DB
- [ ] Admin login → dashboard loads → can search/filter/update inquiry status
- [ ] Admin Q&A moderation: can answer and approve customer questions
- [ ] WhatsApp CTA links resolve to `wa.me/92XXXXXXXXXX?text=...`
- [ ] FAQ page renders 20+ questions in collapsible accordion by topic
- [ ] Blog listing loads; individual blog post renders markdown with SEO meta
- [ ] Comparison page renders interactive side-by-side table for 3 table types
- [ ] Use-case showcase carousel renders on home page
- [ ] All routes SSR-render without hydration errors
- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90

---

## Reference Files in FurLi (this repo)

| File | Usage |
|---|---|
| [src/app/app.routes.ts](src/app/app.routes.ts) | Route structure to replicate |
| [src/app/app.routes.server.ts](src/app/app.routes.server.ts) | SSR render mode config |
| [src/app/core/config/app-links.ts](src/app/core/config/app-links.ts) | `APP_LINKS` constant to clone |
| [src/app/shared/models/](src/app/shared/models/) | Interface patterns to extend |
| [src/app/core/services/](src/app/core/services/) | All 5 services to replicate |
| [src/app/pages/configure/](src/app/pages/configure/) | 4-step configure wizard reference |
| [src/app/pages/custom-order/](src/app/pages/custom-order/) | 5-step custom order wizard reference |
| [src/app/admin/](src/app/admin/) | Full admin section to replicate |
| [src/app/components/](src/app/components/) | All shared components to replicate |
| [src/server.ts](src/server.ts) | Express.js SSR + API endpoints |
| [src/assets/i18n/en.json](src/assets/i18n/en.json) | String key structure reference |
| [ngsw-config.json](ngsw-config.json) | PWA config to replicate |

---

## Key Decisions

| Decision | Choice |
|---|---|
| New project vs modifying FurLi | Greenfield Angular project — FurLi is the code template only |
| Language support | English only — no `@ngx-translate`, no RTL, no locale prefix in routes |
| Standing desk mechanism | Hand crank only (`standingMechanism.type = 'hand-crank'`), frame-only + with-top variants |
| Tabletop materials | All 5: MDF, Solid Wood, Glass, Steel Sheet, Customer-Provided |
| Admin dashboard | Full dashboard (same as FurLi) |
| Payment | None — inquiry-only model |
| Reference number prefix | `ABS-` (AliBabaSteel) |
| Data storage | In-memory initially → Prisma + SQLite (same phased approach as FurLi) |
| CSS framework | Tailwind v4 (same as FurLi, brand colours to be customized) |
| SKU system | `ABS-{CAT}-{NNN}` (e.g. `ABS-SMP-001`, `ABS-STD-003`, `ABS-ACC-010`) |
| Accessories | 4th product category cross-sold from product detail pages |
| Q&A | Customer questions on product pages, admin-moderated answers |
| Blog | Static markdown blog for SEO long-tail content |
| Bulk orders | Dedicated `/bulk-order` form for corporate clients (5+ units) |

---

## Open Items (to confirm before building)

1. **Contact details** — AliBabaSteel's WhatsApp number, phone(s), address, social handles
2. **Standing desk images** — use attached product diagrams directly in the product page mechanism section, or create custom SVG infographics?
3. **Admin credentials** — default admin password (FurLi uses `admin / msf2025`)
4. **Brand color palette** — any specific hex values, or shall defaults (charcoal + steel-blue + amber) be used?
5. **Hosting target** — Vercel or Firebase?
6. **Domain** — custom domain for `siteUrl` in `APP_LINKS`?
7. **Corporate clients** — any existing B2B customers whose logos can go in the trust signals marquee?
8. **YouTube channel** — do you have existing product demo/assembly videos to embed?
9. **Customer testimonials** — any existing customer setup photos or written reviews to seed the testimonials section?

---

## Appendix A: Competitive Analysis

### Jin Office Solutions (jin.net.in) — India

**Overview**: India's leading standing desk brand. 90K+ desks sold. E-commerce model (WooCommerce). Price range ₹14,990–₹32,990.

**Features adopted for AliBabaSteel**:

| Feature | Jin Implementation | AliBabaSteel Adaptation |
|---|---|---|
| Use-case showcase | "Empowering" carousel — Gaming, Coding, Trading, Streaming, Home Office | Home page use-case marquee with same categories |
| Frame-only variant | Same desk sold as "Frame Only" and "With Top" | `variant` field on Product model; filter toggle on category page |
| Accessory upsell | "Accessorize Your Desk" section — cable trays, CPU mounts, keyboard trays, casters (₹600–₹3,290) | `accessories` category (cable tray, casters) + "Complete Your Setup" carousel on product detail |
| YouTube video tabs | Demo / Assembly / Brand video on product page | `videos: ProductVideo[]` field; tabbed video player |
| Q&A section | Customer questions + store manager answers per product | `QAEntry` model + `/admin/qa` moderation panel |
| Photo reviews | Customer setup photos with star ratings | Testimonial section with real client workspace photos |
| SKU system | `JHT8-ED3-BTP` style codes | `ABS-{CAT}-{NNN}` pattern |
| Trust signals | CE/ISO/ROHS badges + corporate logos (Microsoft, Google, TCS) | Corporate client logo marquee + stats counter |
| FAQ page (19+ questions) | Accordion on category + product pages | Dedicated `/faq` route, 20+ questions grouped by topic |
| Blog/SEO content | 5+ ergonomics articles driving organic traffic | `/blog` with 5 initial articles targeting Pakistan keywords |
| Bulk enquiry | Separate form for corporate orders | `/bulk-order` route with company + quantity fields |
| Certifications | CE, ROHS, FCC, BIS, UKCA, ISO badges | Not applicable (handcrafted, not imported) — skip |

**Features NOT adopted** (not applicable to AliBabaSteel's inquiry model):
- Shopping cart / checkout / payment gateway
- Amazon integration / tracking
- Refurbished products section
- Electric motor products (AliBabaSteel = hand crank only)

### DEXX.pk (dexx.pk) — Pakistan

**Overview**: Pakistan's premium standing desk brand. Shopify-based. Price range Rs 30K–265K. "Smart" app-connected desks. Clients: World Bank, UN Women, Aga Khan University.

**Features adopted for AliBabaSteel**:

| Feature | DEXX Implementation | AliBabaSteel Adaptation |
|---|---|---|
| Pakistan market positioning | Direct Pakistani pricing, local delivery | Same market, local currency references in price tier |
| Corporate client logos | World Bank, UN Women, Aga Khan marquee | Trust signals section on home (once AliBabaSteel has clients) |
| Google Maps reviews link | CTA to Google Maps reviews page | Can link to Google Business reviews once established |
| WhatsApp as primary CTA | Floating WhatsApp button + inline CTAs | Same pattern (already in plan from FurLi) |
| Solid wood premium option | Rs 265K tier with premium wood top | "Solid Wood" tabletop material in configure wizard |

**Features NOT adopted**:
- "Smart" app-connected desks (AliBabaSteel = manual hand crank)
- E-commerce / "Add to bag" flow (AliBabaSteel = inquiry-only)
- Electric/motorized options

### AliBabaSteel Competitive Advantages

1. **Manufacturing control** — in-house production vs imported frames (Jin/DEXX resell Chinese frames)
2. **Full customization** — any dimension, any finish, any tabletop (competitors offer fixed SKUs)
3. **Price-competitive** — hand crank mechanism is inherently cheaper than electric; local manufacturing eliminates import duties
4. **Configure wizard** — interactive step-by-step builder (neither Jin nor DEXX offers this)
5. **Accessory manufacturing** — can produce accessories in-house vs reselling
6. **4 tabletop material options** + customer-provided — more flexibility than competitors' engineered wood only
