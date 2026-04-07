import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, Search, X } from 'lucide-angular';
import { ALL_PRODUCTS } from '../../shared/data/products.data';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-search',
  imports: [LucideAngularModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchComponent {
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  @Input() variant: 'hero' | 'modal' = 'hero';
  @Output() closed = new EventEmitter<void>();

  readonly query = signal('');
  readonly isOpen = signal(false);
  readonly selectedIndex = signal(-1);

  readonly SearchIcon = Search;
  readonly XIcon = X;

  readonly results = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (q.length < 1) return [];
    return ALL_PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subType.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
    ).slice(0, 8);
  });

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.isOpen.set(value.trim().length >= 1);
    this.selectedIndex.set(-1);
  }

  onKeydown(event: KeyboardEvent): void {
    const results = this.results();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.update(i => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.update(i => Math.max(i - 1, -1));
        break;
      case 'Enter': {
        const idx = this.selectedIndex();
        if (idx >= 0 && results[idx]) {
          this.navigate(results[idx]);
        }
        break;
      }
      case 'Escape':
        this.clearSearch();
        this.closed.emit();
        break;
    }
  }

  navigate(product: Product): void {
    this.clearSearch();
    this.router.navigate(['/catalog', product.category, product.slug]);
    this.closed.emit();
  }

  clearSearch(): void {
    this.query.set('');
    this.isOpen.set(false);
    this.selectedIndex.set(-1);
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: EventTarget | null): void {
    if (isPlatformBrowser(this.platformId)) {
      if (target && !this.elementRef.nativeElement.contains(target)) {
        this.isOpen.set(false);
        this.selectedIndex.set(-1);
      }
    }
  }
}
