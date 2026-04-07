import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  signal,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  LucideAngularModule,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Sliders,
  ClipboardList,
  ChevronUp,
  ChevronDown,
  Package,
  Info,
  PlayCircle,
} from 'lucide-angular';
import { ALL_PRODUCTS } from '../../shared/data/products.data';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ConfigService } from '../../core/services/config.service';
import { Product } from '../../shared/models/product.model';

const IDEAL_LABELS: Record<string, string> = {
  gaming: '🎮 Gaming',
  office: '💼 Office',
  trading: '📈 Trading',
  student: '📚 Student',
  streaming: '🎙️ Streaming',
  developer: '💻 Developer',
  'home-office': '🏠 Home Office',
};

@Component({
  selector: 'app-item',
  imports: [RouterLink, TitleCasePipe, LucideAngularModule, ImageGalleryComponent, ProductCardComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  private readonly config = inject(ConfigService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly category = input<string>('');
  readonly item = input<string>('');

  readonly ArrowLeftIcon = ArrowLeft;
  readonly ArrowRightIcon = ArrowRight;
  readonly MessageCircleIcon = MessageCircle;
  readonly SlidersIcon = Sliders;
  readonly ClipboardListIcon = ClipboardList;
  readonly ChevronUpIcon = ChevronUp;
  readonly ChevronDownIcon = ChevronDown;
  readonly PackageIcon = Package;
  readonly InfoIcon = Info;
  readonly PlayCircleIcon = PlayCircle;

  readonly activeTab = signal<'demo' | 'assembly' | 'review'>('demo');
  readonly mechanismOpen = signal(true);

  readonly product = computed<Product | null>(() => {
    return ALL_PRODUCTS.find(p => p.slug === this.item()) ?? null;
  });

  readonly accessories = computed(() => {
    const p = this.product();
    if (!p?.compatibleAccessories?.length) return [];
    return ALL_PRODUCTS.filter(a => p.compatibleAccessories!.includes(a.slug));
  });

  readonly idealForLabels = computed(() => {
    return (this.product()?.idealFor ?? []).map(i => IDEAL_LABELS[i] ?? i);
  });

  readonly whatsappLink = computed(() => {
    const p = this.product();
    const msg = p
      ? `Hi AliBabaSteel! I'm interested in the "${p.name}" (SKU: ${p.sku}). Can you give me a quote?`
      : '';
    return this.config.getWhatsAppLink(msg);
  });

  readonly relatedProducts = computed(() => {
    const p = this.product();
    if (!p) return [];
    return ALL_PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 3);
  });

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  hasVideoOfType(p: Product, type: 'demo' | 'assembly' | 'review'): boolean {
    return p.videos?.some(v => v.type === type) ?? false;
  }

  getDimensions(p: Product): string {
    const d = p.dimensions;
    const parts: string[] = [];
    if (d.width) parts.push(`W ${d.width} mm`);
    else if (d.widthMin && d.widthMax) parts.push(`W ${d.widthMin}–${d.widthMax} mm (adj.)`);
    parts.push(`D ${d.depth} mm`);
    if (d.height) parts.push(`H ${d.height} mm`);
    else if (d.minHeight && d.maxHeight) parts.push(`H ${d.minHeight}–${d.maxHeight} mm`);
    return parts.join(' · ');
  }
}
