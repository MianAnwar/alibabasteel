import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-item',
  template: '<p class="p-8 text-center text-muted">ItemComponent — coming soon</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {}
