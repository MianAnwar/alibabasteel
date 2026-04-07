import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: `
    <div class="skeleton" [class]="variant()" [style.width]="width()" [style.height]="height()">
      <div class="skeleton-pulse"></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .skeleton {
        background: var(--surface);
        border-radius: var(--radius-default);
        overflow: hidden;
        position: relative;
      }
      .skeleton.text {
        height: 1em;
        border-radius: 4px;
      }
      .skeleton.title {
        height: 1.5em;
        width: 60%;
        border-radius: 4px;
      }
      .skeleton.image {
        aspect-ratio: 4/3;
        width: 100%;
        border-radius: var(--radius-lg);
      }
      .skeleton.card {
        height: 280px;
        border-radius: var(--radius-lg);
      }
      .skeleton.circle {
        border-radius: 50%;
      }
      .skeleton-pulse {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          var(--surface-hover) 50%,
          transparent 100%
        );
        animation: shimmer 1.5s infinite;
      }
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .skeleton-pulse {
          animation: none;
          opacity: 0.5;
        }
      }
    `,
  ],
})
export class SkeletonComponent {
  readonly variant = input<'text' | 'title' | 'image' | 'card' | 'circle'>('text');
  readonly width = input<string>('100%');
  readonly height = input<string>('');
}
