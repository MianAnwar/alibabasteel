import { Injectable } from '@angular/core';
import { APP_LINKS, AppLinks } from '../config/app-links';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  get links(): AppLinks {
    return APP_LINKS;
  }

  getWhatsAppLink(message?: string): string {
    const phone = this.links.whatsappNumber.replace(/^\+/, '');
    const msg = encodeURIComponent(message ?? this.links.whatsappMessage);
    return `https://wa.me/${phone}?text=${msg}`;
  }
}
