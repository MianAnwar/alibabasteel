import {
  Component,
  input,
  signal,
  viewChild,
  ElementRef,
  afterNextRender,
  Injector,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LucideAngularModule, X, ChevronLeft, ChevronRight } from 'lucide-angular';
import { ProductImage } from '../../shared/models/product.model';

@Component({
  selector: 'app-image-gallery',
  imports: [LucideAngularModule],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGalleryComponent {
  private readonly injector = inject(Injector);

  readonly images = input.required<ProductImage[]>();
  readonly productName = input<string>('');

  readonly XIcon = X;
  readonly ChevronLeftIcon = ChevronLeft;
  readonly ChevronRightIcon = ChevronRight;

  readonly activeIndex = signal(0);
  private touchStartX = 0;
  readonly lightboxOpen = signal(false);
  readonly dialogRef = viewChild<ElementRef<HTMLDialogElement>>('lightboxDialog');

  selectImage(index: number): void {
    this.activeIndex.set(index);
  }

  openLightbox(index: number): void {
    this.activeIndex.set(index);
    this.lightboxOpen.set(true);
    afterNextRender(() => this.dialogRef()?.nativeElement.showModal(), {
      injector: this.injector,
    });
  }

  closeLightbox(): void {
    this.dialogRef()?.nativeElement.close();
    this.lightboxOpen.set(false);
  }

  prev(): void {
    const len = this.images().length;
    this.activeIndex.update(i => (i - 1 + len) % len);
  }

  next(): void {
    const len = this.images().length;
    this.activeIndex.update(i => (i + 1) % len);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.prev();
    if (event.key === 'ArrowRight') this.next();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const dx = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? this.next() : this.prev();
    }
  }
}
