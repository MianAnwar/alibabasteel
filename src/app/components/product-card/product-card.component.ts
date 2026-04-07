import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, Layers } from 'lucide-angular';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly ArrowRightIcon = ArrowRight;
  readonly LayersIcon = Layers;

  readonly productLink = computed(() => {
    const p = this.product();
    return `/catalog/${p.category}/${p.slug}`;
  });

  readonly materialSummary = computed(() => {
    const p = this.product();
    const parts: string[] = [];
    if (p.frame?.material) parts.push(p.frame.material.replace('-', ' '));
    if (p.tabletop?.material) parts.push(p.tabletop.material);
    return parts.join(' · ');
  });

  readonly variantLabel = computed(() => {
    const v = this.product().variant;
    if (!v) return null;
    const map: Record<string, string> = {
      'frame-only': 'Frame Only',
      'with-top': 'With Tabletop',
      complete: 'Complete',
    };
    return map[v] ?? v;
  });
}
