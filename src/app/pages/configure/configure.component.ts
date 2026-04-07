import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  signal,
  computed,
  effect,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Check, ChevronRight, MessageCircle, ArrowRight, ArrowLeft, RotateCcw, Layers, Sliders, Palette, Plus } from 'lucide-angular';
import { ALL_PRODUCTS } from '../../shared/data/products.data';
import { ConfigService } from '../../core/services/config.service';
import { Product, ProductCategory } from '../../shared/models/product.model';

// ─── Step 1 data ──────────────────────────────────────────────────────────────
export interface TableTypeOption {
  value: ProductCategory;
  label: string;
  subtitle: string;
  icon: string; // emoji
  features: string[];
  priceRange: string;
}

const TABLE_TYPE_OPTIONS: TableTypeOption[] = [
  {
    value: 'simple',
    label: 'Simple Desk',
    subtitle: 'Fixed-height, solid steel frame',
    icon: '🖥️',
    features: ['Fixed height', 'MDF / solid wood top', 'From Rs 15,000'],
    priceRange: 'Rs 15k – 35k',
  },
  {
    value: 'standing',
    label: 'Standing Desk',
    subtitle: 'Hand-crank height-adjustable',
    icon: '⬆️',
    features: ['700–1180 mm range', 'Sit → stand in 30 sec', 'Frame-only or with top'],
    priceRange: 'Rs 35k – 65k',
  },
  {
    value: 'custom',
    label: 'Custom Desk',
    subtitle: 'Fully bespoke specification',
    icon: '✏️',
    features: ['Any dimensions', 'Any material', 'Branding & engraving'],
    priceRange: 'Quote required',
  },
];

// ─── Step 2 dimension presets ─────────────────────────────────────────────────
export interface SizePreset {
  label: string;
  widthMm: number;
  depthMm: number;
  recommended?: boolean;
}

const SIMPLE_PRESETS: SizePreset[] = [
  { label: 'Compact (900 × 500)', widthMm: 900, depthMm: 500 },
  { label: 'Standard (1200 × 600)', widthMm: 1200, depthMm: 600, recommended: true },
  { label: 'Wide (1500 × 700)', widthMm: 1500, depthMm: 700 },
  { label: 'Extra Wide (1800 × 750)', widthMm: 1800, depthMm: 750 },
  { label: 'Custom...', widthMm: 0, depthMm: 0 },
];

const STANDING_PRESETS: SizePreset[] = [
  { label: 'Single (860 × 600)', widthMm: 860, depthMm: 600 },
  { label: 'Standard (1200 × 600)', widthMm: 1200, depthMm: 600, recommended: true },
  { label: 'Wide (1330 × 700)', widthMm: 1330, depthMm: 700 },
  { label: 'Custom...', widthMm: 0, depthMm: 0 },
];

// ─── Step 3 material options ──────────────────────────────────────────────────
export interface MaterialOption {
  value: string;
  label: string;
  desc: string;
  priceImpact: string;
  emoji: string;
}

const TABLETOP_OPTIONS: MaterialOption[] = [
  { value: 'MDF', label: 'MDF', desc: 'Smooth, paintable, budget-friendly', priceImpact: 'No extra cost', emoji: '🪵' },
  { value: 'Particle Board', label: 'Particle Board', desc: 'Lighter weight, lower density', priceImpact: 'No extra cost', emoji: '🗒️' },
  { value: 'Solid Wood', label: 'Solid Wood', desc: 'Premium hardwood surface', priceImpact: '+Rs 5,000–15,000', emoji: '🌳' },
  { value: 'Glass', label: 'Tempered Glass', desc: 'Modern look, easy to clean', priceImpact: '+Rs 8,000–20,000', emoji: '🪞' },
  { value: 'Steel Sheet', label: 'Steel Sheet', desc: 'Industrial finish, maximum durability', priceImpact: '+Rs 3,000–8,000', emoji: '⚙️' },
  { value: 'Customer-Provided', label: 'I\'ll provide my own', desc: 'Frame only — you source the top', priceImpact: 'Frame price only', emoji: '📦' },
];

const FRAME_FINISHES: MaterialOption[] = [
  { value: 'Matte Black', label: 'Matte Black', desc: 'Most popular — sleek, hides fingerprints', priceImpact: 'Standard', emoji: '⬛' },
  { value: 'Gloss White', label: 'Gloss White', desc: 'Bright, modern look', priceImpact: 'Standard', emoji: '⬜' },
  { value: 'Silver Grey', label: 'Silver Grey', desc: 'Subtle, works with any decor', priceImpact: 'Standard', emoji: '🔲' },
  { value: 'Raw Steel', label: 'Raw Steel', desc: 'Uncoated industrial aesthetic', priceImpact: 'Standard', emoji: '🔩' },
  { value: 'Custom', label: 'Custom Color', desc: 'Any RAL / powder coat shade', priceImpact: '+Rs 1,500–3,000', emoji: '🎨' },
];

// ─── Step 4 addons ────────────────────────────────────────────────────────────
export interface Addon {
  id: string;
  label: string;
  desc: string;
  priceLabel: string;
  emoji: string;
}

const ADDONS: Addon[] = [
  { id: 'cable-tray', label: 'Cable Management Tray', desc: 'Under-desk steel tray keeps cabling hidden', priceLabel: '+Rs 2,500', emoji: '🔌' },
  { id: 'monitor-mount', label: 'Monitor Mount Holes', desc: 'Pre-punched VESA mounting holes in frame', priceLabel: 'Free', emoji: '🖥️' },
  { id: 'adjustable-feet', label: 'Adjustable Levelling Feet', desc: 'Fine-tune height on uneven floors', priceLabel: '+Rs 500', emoji: '⚖️' },
  { id: 'casters', label: 'Lockable Casters', desc: 'Roll and lock — great for flexible setups', priceLabel: '+Rs 3,500', emoji: '🛞' },
];

// ─── Configure state ──────────────────────────────────────────────────────────
export interface ConfigureState {
  // Step 1
  tableType: ProductCategory | null;
  // Step 2
  sizePresetIndex: number | null;  // -1 = custom
  customWidth: number | null;
  customDepth: number | null;
  standingVariant: 'with-top' | 'frame-only' | null; // standing desks only
  // Step 3
  tabletopMaterial: string | null;
  frameFinish: string | null;
  // Step 4
  selectedAddons: Set<string>;
}

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrl: './configure.component.scss',
  imports: [RouterLink, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureComponent {
  private readonly config = inject(ConfigService);

  // Route input: ?type=standing pre-selects Step 1
  readonly type = input<string>('');

  // Icons
  readonly CheckIcon = Check;
  readonly ChevronRightIcon = ChevronRight;
  readonly MessageCircleIcon = MessageCircle;
  readonly ArrowRightIcon = ArrowRight;
  readonly ArrowLeftIcon = ArrowLeft;
  readonly RotateCcwIcon = RotateCcw;
  readonly LayersIcon = Layers;
  readonly SlidersIcon = Sliders;
  readonly PaletteIcon = Palette;
  readonly PlusIcon = Plus;

  // Static reference data
  readonly tableTypes = TABLE_TYPE_OPTIONS;
  readonly simplePresets = SIMPLE_PRESETS;
  readonly standingPresets = STANDING_PRESETS;
  readonly tabletopOptions = TABLETOP_OPTIONS;
  readonly frameFinishes = FRAME_FINISHES;
  readonly addons = ADDONS;

  // Wizard state
  readonly currentStep = signal<1 | 2 | 3 | 4 | 5>(1);

  readonly state = signal<ConfigureState>({
    tableType: null,
    sizePresetIndex: null,
    customWidth: null,
    customDepth: null,
    standingVariant: null,
    tabletopMaterial: null,
    frameFinish: null,
    selectedAddons: new Set(),
  });

  // Pre-select table type from query param
  constructor() {
    effect(() => {
      const t = this.type();
      if (t && ['simple', 'standing', 'custom'].includes(t)) {
        this.state.update(s => ({ ...s, tableType: t as ProductCategory }));
        if (this.currentStep() === 1) this.currentStep.set(2);
      }
    });
  }

  // ─── Derived state ──────────────────────────────────────────
  readonly isStanding = computed(() => this.state().tableType === 'standing');
  readonly isCustom = computed(() => this.state().tableType === 'custom');

  readonly sizePresets = computed(() =>
    this.isStanding() ? STANDING_PRESETS : SIMPLE_PRESETS,
  );

  readonly isCustomSize = computed(() => {
    const idx = this.state().sizePresetIndex;
    return idx === this.sizePresets().length - 1; // last = "Custom..."
  });

  readonly effectiveWidth = computed((): number | null => {
    const s = this.state();
    if (this.isCustomSize()) return s.customWidth;
    if (s.sizePresetIndex === null) return null;
    return this.sizePresets()[s.sizePresetIndex]?.widthMm ?? null;
  });

  readonly effectiveDepth = computed((): number | null => {
    const s = this.state();
    if (this.isCustomSize()) return s.customDepth;
    if (s.sizePresetIndex === null) return null;
    return this.sizePresets()[s.sizePresetIndex]?.depthMm ?? null;
  });

  // Show/hide tabletop selection (hide for frame-only and customer-provided)
  readonly showTabletop = computed(() => {
    const s = this.state();
    return s.standingVariant !== 'frame-only' && s.tableType !== 'accessories';
  });

  // Step validation
  readonly step1Valid = computed(() => !!this.state().tableType);

  readonly step2Valid = computed(() => {
    const s = this.state();
    if (s.sizePresetIndex === null) return false;
    if (this.isCustomSize()) {
      return !!(s.customWidth && s.customWidth >= 600 && s.customDepth && s.customDepth >= 400);
    }
    if (this.isStanding() && !s.standingVariant) return false;
    return true;
  });

  readonly step3Valid = computed(() => {
    const s = this.state();
    if (!s.frameFinish) return false;
    if (this.showTabletop() && !s.tabletopMaterial) return false;
    return true;
  });

  // Matched products for summary
  readonly matchedProducts = computed<Product[]>(() => {
    const s = this.state();
    if (!s.tableType) return [];
    return ALL_PRODUCTS.filter(p => {
      if (p.category !== s.tableType) return false;
      if (s.tableType === 'standing' && s.standingVariant && p.variant !== s.standingVariant) return false;
      return true;
    }).slice(0, 3);
  });

  // WhatsApp summary message
  readonly whatsappLink = computed(() => {
    const s = this.state();
    const type = this.tableTypes.find(t => t.value === s.tableType)?.label ?? 'Desk';
    const w = this.effectiveWidth();
    const d = this.effectiveDepth();
    const dims = w && d ? ` ${w}×${d} mm` : '';
    const variant = s.standingVariant ? ` (${s.standingVariant === 'frame-only' ? 'Frame Only' : 'With Tabletop'})` : '';
    const top = s.tabletopMaterial && s.tabletopMaterial !== 'Customer-Provided' ? ` — ${s.tabletopMaterial} top` : '';
    const finish = s.frameFinish ? `, ${s.frameFinish} frame` : '';
    const addonsText = s.selectedAddons.size
      ? ` + ${[...s.selectedAddons].join(', ')}`
      : '';
    const msg = `Hi AliBabaSteel! I configured a ${type}${variant}${dims}${top}${finish}${addonsText}. Can you give me a quote?`;
    return this.config.getWhatsAppLink(msg);
  });

  // ─── Navigation ────────────────────────────────────────────
  goToStep(step: 1 | 2 | 3 | 4 | 5): void {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextStep(): void {
    const s = this.currentStep();
    if (s < 5) this.goToStep((s + 1) as 1 | 2 | 3 | 4 | 5);
  }

  prevStep(): void {
    const s = this.currentStep();
    if (s > 1) this.goToStep((s - 1) as 1 | 2 | 3 | 4 | 5);
  }

  reset(): void {
    this.state.set({
      tableType: null,
      sizePresetIndex: null,
      customWidth: null,
      customDepth: null,
      standingVariant: null,
      tabletopMaterial: null,
      frameFinish: null,
      selectedAddons: new Set(),
    });
    this.goToStep(1);
  }

  // ─── State mutations ────────────────────────────────────────
  selectType(value: ProductCategory): void {
    this.state.update(s => ({
      ...s,
      tableType: value,
      // Reset downstream on type change
      sizePresetIndex: null,
      customWidth: null,
      customDepth: null,
      standingVariant: null,
      tabletopMaterial: null,
      frameFinish: null,
      selectedAddons: new Set(),
    }));
  }

  selectPreset(index: number): void {
    this.state.update(s => ({ ...s, sizePresetIndex: index, customWidth: null, customDepth: null }));
  }

  selectVariant(variant: 'with-top' | 'frame-only'): void {
    const wasFrameOnly = variant === 'frame-only';
    this.state.update(s => ({
      ...s,
      standingVariant: variant,
      tabletopMaterial: wasFrameOnly ? null : s.tabletopMaterial,
    }));
  }

  setCustomWidth(event: Event): void {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    this.state.update(s => ({ ...s, customWidth: isNaN(val) ? null : val }));
  }

  setCustomDepth(event: Event): void {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    this.state.update(s => ({ ...s, customDepth: isNaN(val) ? null : val }));
  }

  selectTabletop(value: string): void {
    this.state.update(s => ({ ...s, tabletopMaterial: value }));
  }

  selectFinish(value: string): void {
    this.state.update(s => ({ ...s, frameFinish: value }));
  }

  toggleAddon(id: string): void {
    this.state.update(s => {
      const next = new Set(s.selectedAddons);
      if (next.has(id)) next.delete(id); else next.add(id);
      return { ...s, selectedAddons: next };
    });
  }

  isAddonSelected(id: string): boolean {
    return this.state().selectedAddons.has(id);
  }

  // ─── Summary helpers ────────────────────────────────────────
  get summaryLines(): string[] {
    const s = this.state();
    const lines: string[] = [];
    const typeLabel = this.tableTypes.find(t => t.value === s.tableType)?.label;
    if (typeLabel) lines.push(typeLabel);
    if (s.standingVariant) lines.push(s.standingVariant === 'frame-only' ? 'Frame Only' : 'With Tabletop');
    const w = this.effectiveWidth();
    const d = this.effectiveDepth();
    if (w && d) lines.push(`${w} × ${d} mm`);
    if (s.tabletopMaterial && s.tabletopMaterial !== 'Customer-Provided') lines.push(`${s.tabletopMaterial} top`);
    if (s.frameFinish) lines.push(`${s.frameFinish} frame`);
    if (s.selectedAddons.size) lines.push([...s.selectedAddons].join(', '));
    return lines;
  }

  formatMm(mm: number): string {
    return `${mm} mm (${(mm / 25.4).toFixed(1)}″)`;
  }

  getTypeLabel(value: ProductCategory | null): string {
    return this.tableTypes.find(t => t.value === value)?.label ?? '';
  }

  getAddonLabel(id: string): string {
    return this.addons.find(a => a.id === id)?.label ?? id;
  }
}

