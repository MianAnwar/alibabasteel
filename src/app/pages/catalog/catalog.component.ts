import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { ALL_CATEGORIES } from '../../shared/data/categories.data';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  readonly ArrowRightIcon = ArrowRight;
  readonly categories = ALL_CATEGORIES;
}
