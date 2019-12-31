import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NgZone } from '@angular/core';

import { AppComponent } from './app-component/app.component';
import { AngularElementsModule } from './angular-elements/angular-elements.module';
import { setupGlobalCompilerOptions } from '@angular-element-variants/integration-helper';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [BrowserModule, AngularElementsModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private ngZone: NgZone) {
    setupGlobalCompilerOptions({ ngZone: this.ngZone });
  }
}
