import { getSystemPath, normalize, Path } from '@angular-devkit/core';
import { Configuration } from 'webpack';
import { ElementVariantsWebpackSchema } from './element-variants-webpack-schema';
import { Observable, of } from 'rxjs';
import {VariantConfig } from '@angular-element-variants/core';
import { mergeConfigs } from './webpack-config-merger';

export const defaultWebpackConfigPath = 'webpack.config.js';

type ElementVariantsWebpackConfig =
  | Configuration
  | Promise<Configuration>
  | ((baseWebpackConfig: Configuration, buildOptions: any) => Configuration)
  | ((baseWebpackConfig: Configuration, buildOptions: any) => Promise<Configuration>);

export class ElementVariantsWebpackBuilder {
  static buildWebpackConfig(
    root: Path,
    variant: VariantConfig,
    baseWebpackConfig: Configuration,
    buildOptions: any
  ): Configuration {
    if (!variant) {
      return baseWebpackConfig;
    }

    if (variant.name === undefined) {
      return baseWebpackConfig;
    }

    // control runtime
    if (variant.runtime === false) {
      // do not bundle webpack utilities (expect them to be in consumer)
      delete baseWebpackConfig.optimization.runtimeChunk;
    }

    // control main bundle
    if (baseWebpackConfig.optimization) {
      // merge vendor.ts and main.ts into main
      delete baseWebpackConfig.optimization.splitChunks;
    }

    return mergeConfigs(
      baseWebpackConfig,
      setupBundles(baseWebpackConfig, variant),
      { entry: 'replace' },
      true
    );
  }
}

export function setupBundles(cfg: Configuration, variant: VariantConfig): Configuration {
  const {
    polyfills,
    ['polyfills-es5']: polyfillsEs5,
    scripts,
    styles,
    main,
    runtime,
    vendor,
    ...other
  }: { [key: string]: string[] } = cfg.entry as { [key: string]: string[] };

  if (false) {
    console.log('polyfills: ', polyfills);
    console.log('polyfillsEs5: ', polyfillsEs5);
    console.log('scripts: ', scripts);
    console.log('styles: ', styles);
    console.log('main: ', main);
    console.log('runtime: ', runtime);
    console.log('vendor: ', vendor);
    console.log('other: ', other);
  }

  const zone: string[] = variant.zone === 'Shipped' ? ['zone.js/dist/zone'] : [];

  return {
    ...cfg,
    entry: {
      main: []
        // @ts-ignore
        .concat(zone)
        .concat(variant.polyfills ? polyfills || [] : [])
        .concat(scripts || [])
        // Never include styles
        // .concat(styles ? styles || [] : [])
        .concat(runtime || [])
        .concat(vendor || [])
        .concat(main || []),
    },
  };
}

function ensureVariant(
  options: ElementVariantsWebpackSchema,
  workspaceRoot: string
): Observable<boolean> {
  const variant = false;

  if (!variant) return null;
  const variantFile = require(`${getSystemPath(normalize(workspaceRoot))}/variants/${variant}`);
  return of(true);
}
