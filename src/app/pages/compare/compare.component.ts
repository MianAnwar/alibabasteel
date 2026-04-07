import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Check, X, ArrowRight } from 'lucide-angular';

interface CompareRow {
  feature: string;
  simple: string | boolean;
  standing: string | boolean;
  custom: string | boolean;
}

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss',
  imports: [RouterLink, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareComponent {
  readonly CheckIcon = Check;
  readonly XIcon = X;
  readonly ArrowRightIcon = ArrowRight;

  readonly rows: CompareRow[] = [
    { feature: 'Height Adjustable', simple: false, standing: true, custom: 'Optional' },
    { feature: 'Height Range', simple: 'Fixed', standing: '700–1180 mm', custom: 'Customer-spec' },
    { feature: 'Mechanism', simple: '—', standing: 'Hand Crank (Dual Gear)', custom: 'Hand Crank or Fixed' },
    { feature: 'Frame Material', simple: 'Mild Steel', standing: 'Mild Steel', custom: 'Mild or Stainless' },
    { feature: 'Width Range', simple: '900–1500 mm', standing: '860–1330 mm', custom: 'Any' },
    { feature: 'Depth Range', simple: '500–750 mm', standing: '550–700 mm', custom: 'Any' },
    { feature: 'Tabletop Included', simple: 'Yes (MDF/Wood)', standing: 'Optional', custom: 'Optional' },
    { feature: 'Multi-Monitor Ready', simple: 'Optional', standing: true, custom: true },
    { feature: 'Cable Management', simple: 'Optional tray', standing: 'Optional tray', custom: 'Built-in options' },
    { feature: 'Load Capacity', simple: '60–80 kg', standing: '80–120 kg', custom: 'Customer-spec' },
    { feature: 'Lead Time', simple: '5–7 days', standing: '7–10 days', custom: '10–20 days' },
    { feature: 'Price Range', simple: 'Rs 15k–35k', standing: 'Rs 35k–65k', custom: 'Quote required' },
    { feature: 'Custom Dimensions', simple: false, standing: 'Width only', custom: true },
    { feature: 'Custom Finish', simple: false, standing: false, custom: true },
  ];

  isBoolean(val: unknown): val is boolean { return typeof val === 'boolean'; }
}

