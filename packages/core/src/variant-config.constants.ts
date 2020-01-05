// ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
import { VariantConfig } from './variant-config.interface';

export type ZoneHandling = 'None' | 'Injected' | 'Shipped' | 'Scoped';

// ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
export type ViewEncapsulation = 0 | 1 | 2 | 3;

// ChangeDetection: 0 = OnPush | 1 = Default
export type ChangeDetection = 0 | 1;

// EsVersions: 'es5' | 'es2015'
export type EsVersions = 'es5' | 'es2015';

// CompilationTypes: 'preCompiled' | 'unCompiled'
export type CompilationTypes = 'preCompiled' | 'unCompiled';


export const defaultVariantConfig: VariantConfig = {
  // general variants config
  name: 'defaultVariantConfig',
  zone: 'Shipped',
  outputPath: '',
  bundleName: '',
  encapsulation: 3,
  changeDetection: 1,
  // bundling config
  polyfills: true,
  runtime: false,
  compilation: 'preCompiled',
  esVersion: 'es2015',
  scripts: false,
};
