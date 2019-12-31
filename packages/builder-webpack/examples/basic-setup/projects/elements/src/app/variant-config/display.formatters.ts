// EsVersions: 'es5' | 'es2015'
// CompilationTypes: 'preCompiled' | 'unCompiled'
// ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
// ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
import { ZoneHandling, ViewEncapsulation, VariantConfig } from '@angular-element-variants/core';

export function toReadableEncapsulation(encapsulation: number = 3): string {
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
// ChangeDetection: 0 = OnPush | 1 = Default
export function toReadableChangeDetection(changeDetection: number = 0): string {
  if (changeDetection === 0) {
    return 'Default';
  }
  if (changeDetection === 1) {
    return 'OnPush';
  }
  return 'WRONG ChangeDetection!!';
}
// scriptsShipped: true | false
// polyfillsShipped: true | false
// runtimeShipped: true | false
export function toReadableBoolean(b: boolean = true): string {
  return b ? 'Yes' : 'No';
}

export function logVariantConfig(variant: VariantConfig) {
  console.log('VariantConfig:', variant.name);
  console.log('Encapsulation: ', toReadableEncapsulation(variant.encapsulation));
  console.log('ChangeDetection: ', toReadableChangeDetection(variant.changeDetection));
  console.log('ZoneHandling:', variant.zone);
  console.log('EsVersion:', variant.esVersion);
  console.log('BundleName:', variant.bundleName);
  console.log('OutputPath:', variant.outputPath);
  console.log('Polyfills Included:', toReadableBoolean(variant.polyfills));
  console.log('Scripts Included:', toReadableBoolean(variant.scripts));
  console.log('Runtime Included:', toReadableBoolean(variant.runtime));
}

export interface ElementDisplay {
  classes: string[];
}

export interface BoxDisplay extends ElementDisplay {
  content: string;
}

export interface Display<T> extends ElementDisplay {
  overlays: T;
}

export interface ConsumerOverlays {
  utils?: BoxDisplay;
  css: BoxDisplay;
  zone?: BoxDisplay;
  libs?: BoxDisplay;
}

export interface ProviderOverlays {
  utils?: BoxDisplay;
  css: BoxDisplay;
  zone?: BoxDisplay;
  libs?: BoxDisplay;
}

export interface ConsumerDisplay extends Display<ConsumerOverlays> {
  applicationType: string;
}

export interface ProviderDisplay extends Display<ProviderOverlays> {}

export interface VariantConfigDisplay {
  name: string;
  consumer: ConsumerDisplay;
  provider: ProviderDisplay;
}

export function getVariantConfigDisplay(vCfg: VariantConfig): VariantConfigDisplay {
  const variantDisplayConfig: VariantConfigDisplay = {
    name: vCfg.name,
    consumer: {
      applicationType: 'angular',
      classes: [],
      overlays: {} as any,
    },
    provider: {
      //
      classes: getProviderClasses(vCfg),
      overlays: {} as any,
    },
  };

  // === Consumer
  // CSS
  if (vCfg.encapsulation === ViewEncapsulation.None) {
    variantDisplayConfig.consumer.overlays.css = getBoxConfig('css', vCfg.encapsulation);
  }
  if (vCfg.encapsulation === ViewEncapsulation.ShadowDom) {
    variantDisplayConfig.provider.overlays.css = getBoxConfig('css', vCfg.encapsulation);
  }

  // Zone
  if (vCfg.zone === ZoneHandling.Injected) {
    variantDisplayConfig.consumer.overlays.zone = getBoxConfig('zone', vCfg.zone);
  }
  if (vCfg.zone === ZoneHandling.Shipped || vCfg.zone === ZoneHandling.Scoped) {
    variantDisplayConfig.provider.overlays.zone = getBoxConfig('zone', vCfg.zone);
  }
  // UTILS
  if (vCfg.zone === ZoneHandling.None) {
    variantDisplayConfig.provider.overlays.utils = getBoxConfig('utils', 'ZoneLess helpers');
  }
  // LIBS
  if (vCfg.scripts) {
    variantDisplayConfig.provider.overlays.libs = getBoxConfig('libs', vCfg.scripts);
  }
  return variantDisplayConfig;
}

/*
variantDisplayConfig.provider.overlays = {
  zone: v.zone,
  scripts: v.scripts,
  runtime: v.runtime,
  polyfill: v.polyfills,
  encapsulation: getEncapsulation(v.encapsulation),
  changeDetection: getChangeDetection(v.changeDetection)
};
*/

export function getProviderClasses(vCfg: VariantConfig): string[] {
  return [
    // css can override element
    vCfg.encapsulation === ViewEncapsulation.None ||
    // consumer injected zone
    vCfg.zone === ZoneHandling.Injected
      ? 'open'
      : 'closed',
  ];
}

export function getBoxConfig(boxType: string, value: any): BoxDisplay {
  const boxConfig = {
    content: value,
    classes: ['box', boxType],
  };
  switch (boxType) {
    case 'utils':
    case 'zone':
      boxConfig.content = value;
      return boxConfig;
    case 'libs':
      boxConfig.content = toReadableBoolean(value);
      return boxConfig;
    case 'css':
      boxConfig.content = toReadableEncapsulation(value);
      return boxConfig;
    default:
      return boxConfig;
  }
}
