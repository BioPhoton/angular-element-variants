import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ProviderOverlays } from '../display.formatters';

@Component({
  selector: 'provider-overlays',
  template: `
    <ng-container *ngIf="overlays$ | async as overlays">
      <div *ngFor="let overlay of overlays | keyvalue" [ngClass]="overlay.value.classes">
        <!-- Content (Relative positioned) -->
        <div class="inner-wrapper">
          <span class="content">{{ overlay.value.content }}</span>
        </div>
      </div>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ProviderOverlaysComponent {
  overlays$ = new ReplaySubject<ProviderOverlays>(1);

  @Input()
  set overlays(cfg: ProviderOverlays) {
    if (cfg) {
      this.overlays$.next(cfg);
    }
  }

  constructor() {}
}
