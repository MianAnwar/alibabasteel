import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-angular';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly config = inject(ConfigService);
  readonly links = this.config.links;
  readonly currentYear = new Date().getFullYear();

  readonly PhoneIcon = Phone;
  readonly MailIcon = Mail;
  readonly MapPinIcon = MapPin;
  readonly MessageCircleIcon = MessageCircle;
  readonly InstagramIcon = Instagram;
  readonly FacebookIcon = Facebook;
  readonly YoutubeIcon = Youtube;
}
