import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LucideAngularModule, MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-angular';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly MapPinIcon = MapPin;
  readonly PhoneIcon = Phone;
  readonly MailIcon = Mail;
  readonly MessageCircleIcon = MessageCircle;
  readonly ClockIcon = Clock;

  readonly config = inject(ConfigService);
  readonly links = this.config.links;
  readonly mapUrl: SafeResourceUrl = inject(DomSanitizer)
    .bypassSecurityTrustResourceUrl(this.links.mapEmbedUrl);

  readonly submitted = signal(false);
  readonly name = signal('');
  readonly phone = signal('');
  readonly email = signal('');
  readonly message = signal('');

  submit(event: SubmitEvent): void {
    event.preventDefault();
    // Phase 7: wire to backend
    this.submitted.set(true);
  }

  reset(): void {
    this.name.set('');
    this.phone.set('');
    this.email.set('');
    this.message.set('');
    this.submitted.set(false);
  }
}

