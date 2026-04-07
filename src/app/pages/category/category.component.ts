import { Component, ChangeDetectionStrategy, input, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowLeft, SlidersHorizontal } from 'lucide-angular';
import { ALL_PRODUCTS } from '../../shared/data/products.data';
import { ALL_CATEGORIES } from '../../shared/data/categories.data';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductCategory } from '../../shared/models/product.model';

const SUBTYPE_LABELS: Record<string, string> = {
  gaming: 'Gaming',
  office: 'Office',
  student: 'Student',
  corner: 'Corner',
  'single-station': 'Single Station',
  'double-wide': 'Double Wide',
  'l-standing': 'L-Shaped',
  'cable-tray': 'Cable Tray',
  casters: 'Casters',
};

@Component({
  selector: 'app-category',
  imports: [RouterLink, LucideAngularModule, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  readonly category = input<string>('');

  readonly ArrowLeftIcon = ArrowLeft;
  readonly SlidersIcon = SlidersHorizontal;

  readonly activeSubtype = signal<string>('all');
  readonly variantFilter = signal<string>('all');

  readonly categoryData = computed(() => {
    return ALL_CATEGORIES.find(c => c.slug === this.category()) ?? null;
  });

  readonly subtypes = computed(() => {
    const slug = this.category() as ProductCategory;
    const raw = [...new Set(ALL_PRODUCTS.filter(p => p.category === slug).map(p => p.subType))];
    return raw.map(st => ({ value: st, label: SUBTYPE_LABELS[st] ?? st }));
  });

  readonly isStanding = computed(() => this.category() === 'standing');

  readonly filteredProducts = computed(() => {
    const slug = this.category() as ProductCategory;
    let products = ALL_PRODUCTS.filter(p => p.category === slug);
    const sub = this.activeSubtype();
    if (sub !== 'all') products = products.filter(p => p.subType === sub);
    const variant = this.variantFilter();
    if (variant !== 'all') products = products.filter(p => p.variant === variant);
    return products;
  });
}
