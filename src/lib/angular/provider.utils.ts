import {VariantConfig, ZoneHandling} from '../interfaces';

export function logProvider(variant: VariantConfig) {
  console.log('Provider environment name:', variant.name);
  console.log('Provider encapsulation: ', getEncapsulation(variant.encapsulation));
  console.log('Provider changeDetection: ', variant.changeDetection === 0 ? 'Default' : 'OnPush');
  console.log('Provider compilation for:', variant.compilation);
}

export function getCompilerOptions(variant: VariantConfig): {[key: string]: any} {
  const compilerOptions: any = {};

  // Shipped => skip completely
  if (variant.zone !== ZoneHandling.Shipped) {
    // If None => noop; If Injected => search in window
    const ngZone = variant.zone === ZoneHandling.None ? 'noop' : (window as any).globalCompilerOptions.ngZone;
    if (ngZone) {
      compilerOptions.ngZone = ngZone;
    }
  }
  console.log('Provider compilerOptions:', compilerOptions);
  return compilerOptions;
}

export function  getEncapsulation(encapsulation: number | undefined): string {
  if (encapsulation === 0) {
    return 'Emulated';
  }
  if (encapsulation === 1) {
    return 'Native';
  }
  if (encapsulation === 2) {
    return 'None';
  }
  if (encapsulation === 3) {
    return 'ShadowDom';
  }
  return 'WRONG ENCAPSULATION!!';
}

export function getChangeDetection(changeDetection: number): string {
  if (changeDetection === 0) {
    return 'Default';
  }
  if (changeDetection === 1) {
    return 'OnPush';
  }
  return 'WRONG ChangeDetection!!';
}

