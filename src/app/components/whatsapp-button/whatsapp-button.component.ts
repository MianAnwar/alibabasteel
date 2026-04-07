import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { LucideAngularModule, MessageCircle } from 'lucide-angular';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-whatsapp-button',
  imports: [LucideAngularModule],
  template: `
    <a
      class="whatsapp-fab"
      [href]="config.getWhatsAppLink()"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp">
      <lucide-icon [img]="MessageCircleIcon" [size]="28" [strokeWidth]="1.5" />
    </a>
  `,
  styles: [
    `
      .whatsapp-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 40;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 56px;
        background: var(--whatsapp);
        color: #fff;
        border-radius: 9999px;
        box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);
        text-decoration: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease;

        &:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 24px rgba(37, 211, 102, 0.45);
        }

        &:active {
          transform: scale(0.98);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappButtonComponent {
  readonly MessageCircleIcon = MessageCircle;
  readonly config = inject(ConfigService);
}
