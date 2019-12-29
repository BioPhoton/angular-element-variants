import {
  ChangeDetection,
  CompilationTypes,
  EsVersions,
  ViewEncapsulation,
  ZoneHandling
} from "./variant-config.constants";

export interface ElementSet<T> { [key: string]: T }

export interface VariantConfig {
  // general variants config
  name?: string;
  zone?: ZoneHandling;
  encapsulation?: ViewEncapsulation;
  changeDetection?: ChangeDetection;
  // bundling config
  outputPath?: string;
  bundleName?: string;
  polyfills?: boolean;
  runtime?: boolean;
  compilation: CompilationTypes;
  esVersion?: EsVersions;
  scripts?: boolean;
}

export interface VariantSet {
  defaultOption: VariantConfig;
  [key: string]: VariantConfig;
}
