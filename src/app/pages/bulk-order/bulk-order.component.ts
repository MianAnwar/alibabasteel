import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { LucideAngularModule, Package, MessageCircle } from 'lucide-angular';

@Component({
  selector: 'app-bulk-order',
  templateUrl: './bulk-order.component.html',
  styleUrl: './bulk-order.component.scss',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkOrderComponent {
  readonly PackageIcon = Package;
  readonly MessageCircleIcon = MessageCircle;

  readonly submitted = signal(false);

  // Form fields
  readonly company = signal('');
  readonly industry = signal('');
  readonly quantity = signal('');
  readonly tableType = signal('');
  readonly timeline = signal('');
  readonly budget = signal('');
  readonly contactName = signal('');
  readonly contactPhone = signal('');
  readonly contactEmail = signal('');
  readonly notes = signal('');

  get isValid(): boolean {
    return !!this.company() && !!this.quantity() && !!this.tableType() && !!this.contactName() && !!this.contactPhone();
  }

  submit(event: SubmitEvent): void {
    event.preventDefault();
    if (!this.isValid) return;
    // Phase 7: wire to backend
    this.submitted.set(true);
  }

  reset(): void {
    this.submitted.set(false);
  }
}

