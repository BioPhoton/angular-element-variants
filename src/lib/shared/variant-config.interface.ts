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
