import { VariantConfig } from '@angular-element-variants/core';

export const variant: VariantConfig = {
  name: 'standAlone',
  // ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
  encapsulation: 3,
  // ChangeDetection: 0 = OnPush | 1 = Default
  changeDetection: 1,
  // ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
  zone: 'Injected',
  // CompilationTypes: 'preCompiled' | 'unCompiled'
  compilation: 'preCompiled',
  // runtimeShipped: true | false
  runtime: false,
  // polyfillsShipped: true | false
  polyfills: true,
  // scriptsShipped: true | false
  scripts: false,
  // EsVersions: 'es5' | 'es2015'
  esVersion: 'es2015',
};
