import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'abs-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly theme = signal<Theme>('dark'); // default dark — industrial theme

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        this.theme.set(saved);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.theme.set('dark');
      } else {
        this.theme.set('light');
      }
    }

    effect(() => {
      const current = this.theme();
      const html = this.document.documentElement;
      html.classList.toggle('dark', current === 'dark');
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(STORAGE_KEY, current);
      }
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }
}
