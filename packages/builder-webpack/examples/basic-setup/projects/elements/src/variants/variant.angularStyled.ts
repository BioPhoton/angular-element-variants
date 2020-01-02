import {
  ChangeDetection,
  CompilationTypes,
  EsVersions,
  ViewEncapsulation,
  ZoneHandling,
} from '@angular-element-variants/core';

export const variant = {
  name: 'angularStyled',
  applicationType: 'angular',
  // ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
  encapsulation: ViewEncapsulation.ShadowDom,
  // ChangeDetection: 0 = OnPush | 1 = Default
  changeDetection: ChangeDetection.Default,
  // ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
  zone: ZoneHandling.Injected,
  // CompilationTypes: 'preCompiled' | 'unCompiled'
  compilation: CompilationTypes.preCompiled,
  // runtimeShipped: true | false
  runtime: false,
  // polyfillsShipped: true | false
  polyfills: false,
  // scriptsShipped: true | false
  scripts: false,
  // EsVersions: 'es5' | 'es2015'
  esVersion: EsVersions.es2015,
};
