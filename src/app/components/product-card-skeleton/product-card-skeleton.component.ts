import { Component } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-product-card-skeleton',
  imports: [SkeletonComponent],
  template: `
    <div class="skeleton-card">
      <app-skeleton variant="image" />
      <div class="skeleton-body">
        <app-skeleton variant="text" width="40%" />
        <app-skeleton variant="title" />
        <app-skeleton variant="text" width="70%" />
        <app-skeleton variant="text" width="30%" height="12px" />
      </div>
    </div>
  `,
  styles: [
    `
      .skeleton-card {
        background: var(--surface);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .skeleton-body {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
    `,
  ],
})
export class ProductCardSkeletonComponent {}
