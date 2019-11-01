import {VariantConfig, ZoneHandling} from '../shared';

export function getCompilerOptions(variant: VariantConfig): {[key: string]: any} {
  const compilerOptions: any = {};

  // Shipped => skip completely
  if (variant.zone !== ZoneHandling.Shipped) {
    // If None => noop; If Injected => search in window
    const ngZone = variant.zone === ZoneHandling.None ? 'noop' : (window as any).globalCompilerOptions;
    if (ngZone) {
      compilerOptions.ngZone = ngZone;
    }
  }
  console.log('Provider compilerOptions:', compilerOptions);
  return compilerOptions;
}
