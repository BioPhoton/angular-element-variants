import { VariantConfig, CompilationTypes, ZoneHandling } from '@angular-element-variants/core';
import { ElementSet } from '@angular-element-variants/core';

export function getCompilerOptions(variant: VariantConfig): { [key: string]: any } {
  const compilerOptions: any = {};

  // Shipped => skip completely
  if (variant.zone !== ZoneHandling.Shipped) {
    // If None => noop; If Injected => search in window
    const ngZone =
      variant.zone === ZoneHandling.None ? 'noop' : (window as any).globalCompilerOptions.ngZone;
    if (ngZone) {
      compilerOptions.ngZone = ngZone;
    }
  }
  console.log('Provider compilerOptions: ', compilerOptions);
  return compilerOptions;
}

export function createCustomElements<T>(
  variantConfig: VariantConfig,
  elements: ElementSet<T>,
  createFn: (componentClass: any) => any
): void {
  if (variantConfig.compilation === CompilationTypes.preCompiled) {
    Object.entries(elements).forEach(([selector, componentClass]) => {
      const element = createFn(componentClass);
      customElements.define(selector, element);
    });
  }
}
