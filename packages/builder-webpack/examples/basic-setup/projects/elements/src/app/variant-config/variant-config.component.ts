import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VariantConfig } from '@angular-element-variants/core';
import { map } from 'rxjs/operators';
import { getVariantConfigDisplay } from './display.formatters';
import { variant as v } from '../../variants/variant';

const variant = v;
console.log('variant');
@Component({
  template: `
    <div
      *ngIf="vCfgVD$ | async as vCfgVD"
      class="consumer corner"
      [ngClass]="vCfgVD.consumer.classes"
    >
      <div class="inner-wrapper">
        <div class="application-type" [ngClass]="vCfgVD.consumer.applicationType"></div>
        <!-- Overlays (Absolute positioned)   formattedVariant  -->
        <consumer-overlays class="overlays" [overlays]="vCfgVD.consumer.overlays">
        </consumer-overlays>
        <!-- Relatively positioned -->
        <div class="provider" [ngClass]="vCfgVD.provider.classes">
          <div class="inner-wrapper">
            <!-- Content (Relative positioned) -->
            <div class="wc-sign">&lt;/&gt;</div>
            <div class="variant-name">
              <b>{{ vCfgVD.name }}</b>
            </div>
            <!-- Overlays (Absolute positioned)   formattedVariant  -->
            <provider-overlays
              class="overlays"
              [overlays]="vCfgVD.provider.overlays"
            ></provider-overlays>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./variant-config.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VariantConfigComponent {
  vCfg$ = new BehaviorSubject<VariantConfig>(variant);

  @Input()
  set vCfg(cfg: VariantConfig) {
    if (cfg) {
      this.vCfg$.next(cfg);
    }
  }

  vCfgVD$ = this.vCfg$.pipe(map(val => getVariantConfigDisplay(val)));

  constructor() {}
}
