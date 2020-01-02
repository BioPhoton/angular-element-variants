export const variant = {
  name: 'angularStandAlone',
  // ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
  encapsulation: 3,
  // ChangeDetection: 0 = OnPush | 1 = Default
  changeDetection: 1,
  // ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
  zone: 'None',
  // CompilationTypes: 'preCompiled' | 'unCompiled'
  compilation: 'preCompiled',
  // runtimeShipped: true | false
  runtime: true,
  // polyfillsShipped: true | false
  polyfills: false,
  // scriptsShipped: true | false
  scripts: false,
  // EsVersions: 'es5' | 'es2015'
  esVersion: 'es2015',
};
