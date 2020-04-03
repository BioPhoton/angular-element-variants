import { Path } from '@angular-devkit/core';

import { ElementVariantsWebpackBuilder } from './element-variants-webpack-builder';
import {
  ChangeDetection,
  CompilationTypes,
  EsVersions,
  VariantConfig, ViewEncapsulation,
  ZoneHandling,
} from '@angular-element-variants/core';

const baseWebpackConfig = {
  entry: './main.ts',
};

const buildOptions = {
  env: 'prod',
};

const variant: VariantConfig = {
  // ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
  encapsulation: ViewEncapsulation.ShadowDom,
  // ChangeDetection: 0 = OnPush | 1 = Default
  changeDetection: ChangeDetection.OnPush,
  // ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
  zone: ZoneHandling.Shipped,
  // CompilationTypes: 'preCompiled' | 'unCompiled'
  compilation: CompilationTypes.preCompiled,
  // runtimeShipped: true | false
  runtime: true,
  // polyfillsShipped: true | false
  polyfills: false,
  // scriptsShipped: true | false
  scripts: false,
  // EsVersions: 'es5' | 'es2015'
  esVersion: EsVersions.es2015,
};


describe('ElementVariantsWebpackBuilder', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return original config if no variant object has been provided', async () => {
    const mergedConfig = ElementVariantsWebpackBuilder.buildWebpackConfig(
      __dirname as Path,
      null,
      baseWebpackConfig,
      {},
    );

    expect(mergedConfig).toEqual(baseWebpackConfig);
  });

  it('should return original config if no name is specified', async () => {

    const mergedConfig = ElementVariantsWebpackBuilder.buildWebpackConfig(
        __dirname as Path,
        variant,
        baseWebpackConfig,
        {},
      );

    expect(mergedConfig).toEqual(baseWebpackConfig);

  });

});
