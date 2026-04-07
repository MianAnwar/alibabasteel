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
import {
  LucideAngularModule,
  Check,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Upload,
  X,
  Send,
  User,
  Phone,
  Mail,
  MapPin,
  Image,
  FileText,
  Layers,
} from 'lucide-angular';
import { ALL_PRODUCTS } from '../../shared/data/products.data';
import { ConfigService } from '../../core/services/config.service';
import { Product, ProductCategory } from '../../shared/models/product.model';

// ─── Reference data ───────────────────────────────────────────────────────────

const TABLE_TYPES: { value: ProductCategory; label: string; emoji: string; subtitle: string }[] = [
  { value: 'simple',   label: 'Simple Desk',   emoji: '🖥️', subtitle: 'Fixed-height, solid steel frame' },
  { value: 'standing', label: 'Standing Desk',  emoji: '⬆️', subtitle: 'Hand-crank height-adjustable (700–1180 mm)' },
  { value: 'custom',   label: 'Custom / Other', emoji: '✏️', subtitle: 'Fully bespoke — any spec, any size' },
];

const TABLETOP_MATERIALS: { value: string; label: string }[] = [
  { value: '',                  label: 'No preference' },
  { value: 'MDF',               label: 'MDF' },
  { value: 'Particle Board',    label: 'Particle Board' },
  { value: 'Solid Wood',        label: 'Solid Wood' },
  { value: 'Glass',             label: 'Tempered Glass' },
  { value: 'Steel Sheet',       label: 'Steel Sheet' },
  { value: 'Customer-Provided', label: "I'll provide my own top" },
];

const FRAME_FINISHES: { value: string; label: string }[] = [
  { value: '',            label: 'No preference' },
  { value: 'Matte Black', label: 'Matte Black' },
  { value: 'Gloss White', label: 'Gloss White' },
  { value: 'Silver Grey', label: 'Silver Grey' },
  { value: 'Raw Steel',   label: 'Raw Steel' },
  { value: 'Custom',      label: 'Custom Color (powder coat)' },
];

const QUANTITY_PRESETS = [1, 2, 5, 10, 25, 50];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UploadedFileEntry {
  file: File;
  previewUrl: string;
  name: string;
  sizeKB: number;
}

export interface CustomOrderState {
  // Step 1
  tableType: ProductCategory | null;
  referenceProduct: Product | null;
  // Step 2
  description: string;
  widthMm: string;
  depthMm: string;
  standingRequired: boolean;
  tabletopMaterial: string;
  frameFinish: string;
  quantity: number;
  // Step 4
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactCity: string;
  preferredContact: 'whatsapp' | 'email' | 'phone';
}

const INITIAL_STATE: CustomOrderState = {
  tableType: null,
  referenceProduct: null,
  description: '',
  widthMm: '',
  depthMm: '',
  standingRequired: false,
  tabletopMaterial: '',
  frameFinish: '',
  quantity: 1,
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  contactCity: '',
  preferredContact: 'whatsapp',
};

// ─── Component ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-custom-order',
  templateUrl: './custom-order.component.html',
  styleUrl: './custom-order.component.scss',
  imports: [RouterLink, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomOrderComponent {
  private readonly config = inject(ConfigService);

  // Route inputs: ?ref=<slug> prefills reference product; ?type=<category> prefills type
  readonly ref  = input<string>('');
  readonly type = input<string>('');

  // ─── Icons ─────────────────────────────────────────────────────────────────
  readonly CheckIcon         = Check;
  readonly ChevronRightIcon  = ChevronRight;
  readonly MessageCircleIcon = MessageCircle;
  readonly ArrowRightIcon    = ArrowRight;
  readonly ArrowLeftIcon     = ArrowLeft;
  readonly RotateCcwIcon     = RotateCcw;
  readonly UploadIcon        = Upload;
  readonly XIcon             = X;
  readonly SendIcon          = Send;
  readonly UserIcon          = User;
  readonly PhoneIcon         = Phone;
  readonly MailIcon          = Mail;
  readonly MapPinIcon        = MapPin;
  readonly ImageIcon         = Image;
  readonly FileTextIcon      = FileText;
  readonly LayersIcon        = Layers;

  // ─── Static data ───────────────────────────────────────────────────────────
  readonly tableTypes        = TABLE_TYPES;
  readonly tabletopMaterials = TABLETOP_MATERIALS;
  readonly frameFinishes     = FRAME_FINISHES;
  readonly quantityPresets   = QUANTITY_PRESETS;

  // ─── Wizard state ──────────────────────────────────────────────────────────
  readonly currentStep   = signal<1 | 2 | 3 | 4 | 5>(1);
  readonly state         = signal<CustomOrderState>({ ...INITIAL_STATE });
  readonly uploadedFiles = signal<UploadedFileEntry[]>([]);
  readonly isDragging    = signal(false);
  readonly submitting    = signal(false);
  readonly submittedRef  = signal<string | null>(null);
  readonly fileError     = signal<string | null>(null);

  // ─── Pre-fill from query params ────────────────────────────────────────────
  constructor() {
    effect(() => {
      const slug = this.ref();
      if (slug) {
        const product = ALL_PRODUCTS.find(p => p.slug === slug) ?? null;
        if (product) {
          this.state.update(s => ({
            ...s,
            referenceProduct: product,
            tableType: s.tableType ?? product.category,
          }));
        }
      }
    });

    effect(() => {
      const t = this.type();
      if (t && ['simple', 'standing', 'custom'].includes(t)) {
        this.state.update(s => ({
          ...s,
          tableType: s.tableType ?? (t as ProductCategory),
        }));
      }
    });
  }

  // ─── Computed validation ───────────────────────────────────────────────────
  readonly step1Valid = computed(() => !!this.state().tableType);
  readonly step2Valid = computed(() => this.state().description.trim().length >= 10);
  readonly phoneValid = computed(() =>
    /^\+?92[0-9]{10}$/.test(this.state().contactPhone.trim()),
  );
  readonly step4Valid = computed(() =>
    !!this.state().contactName.trim() && this.phoneValid(),
  );

  // ─── WhatsApp link (success page) ─────────────────────────────────────────
  readonly successWhatsappLink = computed(() => {
    const ref = this.submittedRef();
    const msg = `Hi AliBabaSteel! I just submitted a custom order (ref: ${ref ?? ''}). Looking forward to your response!`;
    return this.config.getWhatsAppLink(msg);
  });

  // ─── Helpers ───────────────────────────────────────────────────────────────
  getTypeLabel(value: ProductCategory | null): string {
    return this.tableTypes.find(t => t.value === value)?.label ?? '';
  }

  getPreferredContactLabel(): string {
    const map: Record<string, string> = {
      whatsapp: 'WhatsApp',
      email: 'Email',
      phone: 'Phone call',
    };
    return map[this.state().preferredContact] ?? '';
  }

  getMaterialLabel(value: string): string {
    return (this.tabletopMaterials.find(m => m.value === value)?.label ?? value) || 'No preference';
  }

  getFinishLabel(value: string): string {
    return (this.frameFinishes.find(f => f.value === value)?.label ?? value) || 'No preference';
  }

  formatFileSize(kb: number): string {
    return kb < 1024 ? `${kb} KB` : `${(kb / 1024).toFixed(1)} MB`;
  }

  // ─── Navigation ────────────────────────────────────────────────────────────
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
    this.state.set({ ...INITIAL_STATE });
    this.uploadedFiles.set([]);
    this.isDragging.set(false);
    this.submitting.set(false);
    this.submittedRef.set(null);
    this.fileError.set(null);
    this.goToStep(1);
  }

  // ─── State mutations ───────────────────────────────────────────────────────
  selectType(value: ProductCategory): void {
    this.state.update(s => ({ ...s, tableType: value }));
  }

  clearRef(): void {
    this.state.update(s => ({ ...s, referenceProduct: null }));
  }

  updateDescription(event: Event): void {
    this.state.update(s => ({
      ...s,
      description: (event.target as HTMLTextAreaElement).value,
    }));
  }

  updateWidth(event: Event): void {
    this.state.update(s => ({
      ...s,
      widthMm: (event.target as HTMLInputElement).value,
    }));
  }

  updateDepth(event: Event): void {
    this.state.update(s => ({
      ...s,
      depthMm: (event.target as HTMLInputElement).value,
    }));
  }

  toggleStanding(): void {
    this.state.update(s => ({ ...s, standingRequired: !s.standingRequired }));
  }

  updateMaterial(event: Event): void {
    this.state.update(s => ({
      ...s,
      tabletopMaterial: (event.target as HTMLSelectElement).value,
    }));
  }

  updateFinish(event: Event): void {
    this.state.update(s => ({
      ...s,
      frameFinish: (event.target as HTMLSelectElement).value,
    }));
  }

  setQuantity(q: number): void {
    this.state.update(s => ({ ...s, quantity: q }));
  }

  updateQuantityInput(event: Event): void {
    const val = parseInt((event.target as HTMLInputElement).value, 10);
    if (!isNaN(val) && val >= 1) {
      this.state.update(s => ({ ...s, quantity: val }));
    }
  }

  updateContactName(event: Event): void {
    this.state.update(s => ({
      ...s,
      contactName: (event.target as HTMLInputElement).value,
    }));
  }

  updateContactPhone(event: Event): void {
    this.state.update(s => ({
      ...s,
      contactPhone: (event.target as HTMLInputElement).value,
    }));
  }

  updateContactEmail(event: Event): void {
    this.state.update(s => ({
      ...s,
      contactEmail: (event.target as HTMLInputElement).value,
    }));
  }

  updateContactCity(event: Event): void {
    this.state.update(s => ({
      ...s,
      contactCity: (event.target as HTMLInputElement).value,
    }));
  }

  setPreferredContact(method: 'whatsapp' | 'email' | 'phone'): void {
    this.state.update(s => ({ ...s, preferredContact: method }));
  }

  // ─── File upload ───────────────────────────────────────────────────────────
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  private readonly MAX_FILES = 3;
  private readonly MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  onFileInput(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) this.processFiles(files);
    (event.target as HTMLInputElement).value = '';
  }

  private processFiles(fileList: FileList): void {
    this.fileError.set(null);
    const current = this.uploadedFiles();
    const remaining = this.MAX_FILES - current.length;
    if (remaining <= 0) {
      this.fileError.set(`Maximum ${this.MAX_FILES} images allowed.`);
      return;
    }
    const toProcess = Array.from(fileList).slice(0, remaining);
    for (const file of toProcess) {
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        this.fileError.set(`"${file.name}" is not supported (JPG, PNG, WebP only).`);
        return;
      }
      if (file.size > this.MAX_SIZE_BYTES) {
        this.fileError.set(`"${file.name}" exceeds the 5 MB limit.`);
        return;
      }
    }
    for (const file of toProcess) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedFiles.update(list => [
          ...list,
          {
            file,
            previewUrl: e.target!.result as string,
            name: file.name,
            sizeKB: Math.round(file.size / 1024),
          },
        ]);
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.update(list => list.filter((_, i) => i !== index));
    this.fileError.set(null);
  }

  // ─── Submit ─────────────────────────────────────────────────────────────────
  submit(): void {
    if (!this.step4Valid() || this.submitting()) return;
    this.submitting.set(true);
    // Phase 7: replace with InquiryService.submit() call
    setTimeout(() => {
      this.submittedRef.set(this.generateRef());
      this.submitting.set(false);
    }, 800);
  }

  private generateRef(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let id = '';
    for (let i = 0; i < 9; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    const num = Math.floor(1000 + Math.random() * 9000);
    return `ABS-${id}-${num}`;
  }
}
