import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, X, ZoomIn } from 'lucide-angular';
import { ALL_PRODUCTS } from '../../shared/data/products.data';
import { Product, ProductCategory } from '../../shared/models/product.model';

type GalleryFilter = ProductCategory | 'all';

interface GalleryItem { src: string; alt: string; product: Product; }

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  imports: [RouterLink, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPageComponent {
  readonly XIcon = X;
  readonly ZoomInIcon = ZoomIn;

  readonly activeFilter = signal<GalleryFilter>('all');
  readonly lightboxItem = signal<GalleryItem | null>(null);

  readonly filters: { label: string; value: GalleryFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Simple Desks', value: 'simple' },
    { label: 'Standing Desks', value: 'standing' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Custom Projects', value: 'custom' },
  ];

  readonly allItems = computed<GalleryItem[]>(() =>
    ALL_PRODUCTS.flatMap(p =>
      p.images.map(img => ({ src: img.src, alt: img.alt, product: p }))
    )
  );

  readonly filteredItems = computed<GalleryItem[]>(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.allItems() : this.allItems().filter(i => i.product.category === f);
  });

  openLightbox(item: GalleryItem): void { this.lightboxItem.set(item); }
  closeLightbox(): void { this.lightboxItem.set(null); }
  onKeydown(event: KeyboardEvent): void { if (event.key === 'Escape') this.closeLightbox(); }

  getCount(filter: GalleryFilter): number {
    return filter === 'all'
      ? this.allItems().length
      : this.allItems().filter(i => i.product.category === filter).length;
  }
}

