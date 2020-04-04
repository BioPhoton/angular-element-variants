import {
  ElementSet,
  VariantConfig
} from '@angular-element-variants/core';

export function getCompilerOptions(variant: VariantConfig): { [key: string]: any } {
  const compilerOptions: any = {};

  // Shipped => skip completely
  if (variant.zone !== 'Shipped') {
    // If None => noop; If Injected => search in window
    const ngZone =
      variant.zone === 'None' ? 'noop' : (window as any).globalCompilerOptions.ngZone;
    if (ngZone) {
      compilerOptions.ngZone = ngZone;
    }
  }
  return compilerOptions;
}

export function createCustomElements<T>(
  variantConfig: VariantConfig,
  elements: ElementSet<T>,
  createFn: (componentClass: any) => any
): void {
  if (variantConfig.compilation === 'preCompiled') {
    Object.entries(elements).forEach(([selector, componentClass]) => {
      const element = createFn(componentClass);
      customElements.define(selector, element);
    });
  }
}
