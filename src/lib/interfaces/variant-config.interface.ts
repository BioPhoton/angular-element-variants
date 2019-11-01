// ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
export const ZoneHandling = {
  None : 'None',
  Injected : 'Injected',
  Shipped : 'Shipped',
  Scoped : 'Scoped'
};
// ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
export const ViewEncapsulation = {
  Emulated : 0,
  Native : 1,
  None : 2,
  ShadowDom : 3
};
// ChangeDetection: 0 = OnPush | 1 = Default
export const ChangeDetection = {
  OnPush : 0,
  Default : 1
};
// EsVersions: 'es5' | 'es2015'
export const EsVersions = {
  es5 : 'es5',
  es2015 : 'es2015'
};
// CompilationTypes: 'preCompiled' | 'unCompiled'
export const CompilationTypes = {
  preCompiled : 'preCompiled',
  unCompiled : 'unCompiled'
};
// scriptsShipped: true | false
export const scriptsShipped = true;
// polyfillsShipped: true | false
export const polyfillsShipped = true;
// runtimeShipped: true | false
export const runtimeShipped = true;

export interface VariantConfig {
  // general variants config
  name?: string;
  zone?: string;
  encapsulation?: number;
  changeDetection?: number;
  // bundling config
  outputPath?: string;
  bundleName?: string;
  polyfills?: boolean;
  runtime?: boolean;
  compilation: string;
  esVersion?: string;
  scripts?: boolean;
}

export interface VariantSet {
  defaultOption: VariantConfig;
  [key: string]: VariantConfig;
}

export const defaultVariantConfig = {
  // general variants config
  name: 'defaultVariantConfig',
  zone: ZoneHandling.Shipped,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetection.Default,
  // bundling config
  outputPath: '',
  bundleName: '',
  polyfills: polyfillsShipped,
  runtime: runtimeShipped,
  compilation: CompilationTypes.preCompiled,
  esVersion: EsVersions.es2015,
  scripts: !scriptsShipped
};
