import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ConsumerOverlays } from '../display.formatters';

@Component({
  selector: 'consumer-overlays',
  template: `
    <!-- Overlays (Absolute positioned)   formattedVariant  -->
    <ng-container *ngIf="overlays$ | async as overlays">
      <div *ngFor="let overlay of overlays | keyvalue" [ngClass]="overlay.value.classes">
        <!-- Content (Relative positioned) -->
        <div class="inner-wrapper">
          <span class="content">{{ overlay.value.content }}</span>
          <!-- Overlays (Absolute positioned)-->
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker
                class="arrow-end"
                [id]="'arrow-' + overlay.key"
                markerWidth="10"
                markerHeight="10"
                refX="0"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L9,3 z" />
              </marker>
            </defs>
            <path class="arrow-line" fill="transparent" />
          </svg>
        </div>
      </div>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ConsumerOverlaysComponent {
  overlays$ = new ReplaySubject<ConsumerOverlays>(1);

  @Input()
  set overlays(cfg: ConsumerOverlays) {
    if (cfg) {
      this.overlays$.next(cfg);
    }
  }

  constructor() {}
}
