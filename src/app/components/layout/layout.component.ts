import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { WhatsappButtonComponent } from '../whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsappButtonComponent],
  template: `
    <app-header />
    <main id="main-content" class="main-content">
      <router-outlet />
    </main>
    <app-footer />
    <app-whatsapp-button />
  `,
  styles: [
    `
      .main-content {
        min-height: calc(100vh - 64px);
        outline: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
