import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ArrowRight,
  ChevronRight,
  Layers,
  Sliders,
  ClipboardList,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Truck,
  Award,
} from 'lucide-angular';
import { ConfigService } from '../../core/services/config.service';
import { FEATURED_PRODUCTS } from '../../shared/data/products.data';
import { ALL_CATEGORIES } from '../../shared/data/categories.data';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

const USE_CASES = [
  { label: 'Gaming Setup', emoji: '🎮', bg: '#1a2035' },
  { label: 'Office Workstation', emoji: '💼', bg: '#1a2d2a' },
  { label: 'Trading Desk', emoji: '📈', bg: '#2d1a1a' },
  { label: 'Student Corner', emoji: '📚', bg: '#1a1f2d' },
  { label: 'Streaming Studio', emoji: '🎙️', bg: '#2d1a2d' },
  { label: 'Home Office', emoji: '🏠', bg: '#1f2d1a' },
  { label: 'Developer Station', emoji: '💻', bg: '#1a2535' },
];

const COMPARE_ROWS = [
  { label: 'Height Adjustable', simple: '✗', standing: '✓', custom: 'Optional' },
  { label: 'Price Range', simple: 'Budget–Mid', standing: 'Mid–Premium', custom: 'Premium' },
  { label: 'Production Time', simple: '3–7 days', standing: '5–10 days', custom: '14–21 days' },
  { label: 'Tabletop Materials', simple: 'MDF / PB', standing: 'MDF / Solid Wood', custom: 'Any' },
  { label: 'Customization', simple: 'Limited', standing: 'Moderate', custom: 'Full' },
];

const TESTIMONIALS = [
  {
    name: 'Sarmad K.',
    city: 'Lahore',
    rating: 5,
    text: 'Ordered a standing desk frame and they delivered exactly what the diagram showed. Solid engineering — been using it for 6 months and zero wobble.',
    setup: 'Developer Workstation',
  },
  {
    name: 'Nadia R.',
    city: 'Lahore',
    rating: 5,
    text: 'Custom L-shaped desk for my home office. Perfect dimensions, great powder coat finish. WhatsApp updates throughout production. Highly recommended.',
    setup: 'Home Office',
  },
  {
    name: 'Bilal A.',
    city: 'Islamabad',
    rating: 5,
    text: 'Bought the gaming desk for my setup. Wide enough for dual monitors and the cable management tray keeps everything tidy. Build quality is excellent.',
    setup: 'Gaming Setup',
  },
];

@Component({
  selector: 'app-home',
  imports: [RouterLink, LucideAngularModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly config = inject(ConfigService);

  readonly ArrowRightIcon = ArrowRight;
  readonly ChevronRightIcon = ChevronRight;
  readonly LayersIcon = Layers;
  readonly SlidersIcon = Sliders;
  readonly ClipboardListIcon = ClipboardList;
  readonly CheckCircleIcon = CheckCircle;
  readonly StarIcon = Star;
  readonly ZapIcon = Zap;
  readonly ShieldIcon = Shield;
  readonly TruckIcon = Truck;
  readonly AwardIcon = Award;

  readonly categories = ALL_CATEGORIES;
  readonly featuredProducts = FEATURED_PRODUCTS;
  readonly useCases = USE_CASES;
  readonly compareRows = COMPARE_ROWS;
  readonly testimonials = TESTIMONIALS;

  readonly whatsappLink = this.config.getWhatsAppLink(
    'Hi AliBabaSteel! I\'d like to enquire about a computer table.'
  );
}
