import {
  Component,
  inject,
  signal,
  PLATFORM_ID,
  computed,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
} from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import {
  LucideAngularModule,
  Menu,
  X,
  Sun,
  Moon,
  MessageCircle,
  Search,
  ChevronDown,
  ClipboardList,
  Wand2,
  Package,
} from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { ConfigService } from '../../core/services/config.service';
import { ProductSearchComponent } from '../product-search/product-search.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, ProductSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly elRef = inject(ElementRef);
  readonly themeService = inject(ThemeService);
  readonly config = inject(ConfigService);
  readonly links = this.config.links;

  readonly mobileMenuOpen = signal(false);
  readonly searchOpen = signal(false);
  readonly orderMenuOpen = signal(false);

  // Lucide icons
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly MessageCircleIcon = MessageCircle;
  readonly SearchIcon = Search;
  readonly ChevronDownIcon = ChevronDown;
  readonly ClipboardListIcon = ClipboardList;
  readonly Wand2Icon = Wand2;
  readonly PackageIcon = Package;

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  readonly isOrderActive = computed(() => {
    const url = this.currentUrl() ?? '';
    return url.includes('/custom-order') || url.includes('/configure');
  });

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleOrderMenu(): void {
    this.orderMenuOpen.update(v => !v);
  }

  closeOrderMenu(): void {
    this.orderMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: EventTarget | null): void {
    if (target && !this.elRef.nativeElement.contains(target)) {
      this.orderMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.orderMenuOpen.set(false);
    this.searchOpen.set(false);
    this.mobileMenuOpen.set(false);
  }

  toggleSearch(): void {
    this.searchOpen.update(v => !v);
  }

  closeSearch(): void {
    this.searchOpen.set(false);
  }
}
