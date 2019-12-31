import { Injector, NgModule, NgZone, Type } from '@angular/core';
import { MAT_WEB_COMPONENT_MODULES } from './mat-web-component/mat-web-component-modules';
import { createCustomElement } from '@angular/elements';
import { WebComponent } from './web-component/web.component';
import { MatWebComponent } from './mat-web-component/mat-web.component';
import { DynamicFormWebComponent } from './dynamic-form-component/dynamic-form.component';
import { DYNAMIC_FORM_COMPONENT_MODULES } from './dynamic-form-component/dynamic-form-component-modules';
import { variant } from '../variants/variant';
import { VariantConfigComponent } from './variant-config/variant-config.component';
import { ElementSet } from '@angular-element-variants/core';
import { createCustomElements } from '@angular-element-variants/integration-helper';
import { ConsumerOverlaysComponent } from './variant-config/consumer-overlays/comsumer-overlays.component';
import { ProviderOverlaysComponent } from './variant-config/provider-overlays/provider-overlays.component';

export const angularElements: ElementSet<Type<any>> = {
  'variant-config': VariantConfigComponent,
  'web-component': WebComponent,
  'mat-web-component': MatWebComponent,
  'dynamic-form-component': DynamicFormWebComponent,
};
export const DECLARATIONS = [
  WebComponent,
  MatWebComponent,
  DynamicFormWebComponent,
  VariantConfigComponent,
  ConsumerOverlaysComponent,
  ProviderOverlaysComponent,
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [MAT_WEB_COMPONENT_MODULES, DYNAMIC_FORM_COMPONENT_MODULES],
  entryComponents: [DECLARATIONS],
})
export class ProviderAppModule {
  customElementComponent = angularElements;

  constructor(private injector: Injector, private ngZone: NgZone) {
    console.log('Provider ngZone over constructor:', this.ngZone);
  }

  ngDoBootstrap(): void {
    console.log('PROV variant', variant);
    createCustomElements(variant, angularElements, (componentClass: Type<any>) =>
      createCustomElement<Type<any>>(componentClass, { injector: this.injector })
    );
  }
}
