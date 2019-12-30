import { BuilderContext, Target, targetFromTargetString } from '@angular-devkit/architect';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { getSystemPath, normalize } from '@angular-devkit/core';
import { Configuration, default as webpack } from 'webpack';
import { ElementVariantsWebpackBuilder } from './element-variants-webpack-builder';
import { ElementVariantsWebpackSchema } from './element-variants-webpack-schema';
import { IndexHtmlTransform } from '@angular-devkit/build-angular/src/angular-cli-files/utilities/index-file/write-index-html';
import { WebpackLoggingCallback } from '@angular-devkit/build-webpack';
import { from, Observable, of, zip } from 'rxjs';
import { VariantConfig } from '@angular-element-variants/core';
import { map, switchMap } from 'rxjs/operators';

export const customWebpackConfigTransformFactory: (
  options: ElementVariantsWebpackSchema,
  context: BuilderContext
) => ExecutionTransformer<Configuration> = (options, context) => browserWebpackConfig => {
  const variantName = ((options as unknown) as ElementVariantsWebpackSchema).variant || false;
  const variantFileName = variantName ? `variant.${variantName}` : 'variant';
  const variantPath = `${getSystemPath(normalize(context.workspaceRoot))}/projects/${
    context.target.project
  }/src/variants/${variantFileName}.ts`;
  const variant = resolveVariantConfig(variantPath);

  return ElementVariantsWebpackBuilder.buildWebpackConfig(
    normalize(context.workspaceRoot),
    variant,
    browserWebpackConfig,
    options //TODO: pass Target options as well (configuration option in particular)
  );
};

export const indexHtmlTransformFactory: (
  options: ElementVariantsWebpackSchema,
  context: BuilderContext
) => IndexHtmlTransform = ({ indexTransform }, { workspaceRoot, target }) => {
  if (!indexTransform) return null;
  const transform = require(`${getSystemPath(normalize(workspaceRoot))}/${indexTransform}`);
  return async (indexHtml: string) => transform(target, indexHtml);
};

export const getTransforms = (
  options: ElementVariantsWebpackSchema,
  context: BuilderContext
): {
  webpackConfiguration?: ExecutionTransformer<webpack.Configuration>;
  logging?: WebpackLoggingCallback;
  indexHtml?: IndexHtmlTransform;
} => {
  return {
    webpackConfiguration: customWebpackConfigTransformFactory(options, context),
    indexHtml: indexHtmlTransformFactory(options, context),
  };
};

export function fromTargetOptions<T>(
  context: BuilderContext,
  browserTarget: string
): Observable<T> {
  const target: Target = targetFromTargetString(browserTarget);
  return from((context.getTargetOptions(target) as unknown) as Observable<T>);
}

export function mergeOptions<T>(options: T, context: BuilderContext): Observable<T> {
  /*
    The way the options are resolved when executing a target is
    - by taking the default options object
    -
    - then overwriting values from the configuration used (if any)
    - browserTarget: options
    - then overwriting values from the Angular CLI overrides object built from command line arguments

    This is then validated against the schema of the builder, and only then, if valid, the context will be created and the builder itself will execute.
    */
  const optionsSourceOverriddenByConsole$ = of(options);
  const optionsRemote$ = optionsSourceOverriddenByConsole$.pipe(
    switchMap(options => {
      return 'browserTarget' in options
        ? fromTargetOptions<T>(context, options['browserTarget'])
        : of({} as ElementVariantsWebpackSchema);
    })
  );
  return zip(optionsRemote$, optionsSourceOverriddenByConsole$).pipe(
    map(([remoteOptions, sourceOptions]) => {
      return {
        ...remoteOptions,
        ...sourceOptions,
      };
    })
  );
}

export function addFileReplacementsForVariant<T>(options: T, context: BuilderContext): T {
  const variant = (options as any).variant;
  if (variant) {
    (options as any).fileReplacements = [
      {
        replace: `projects/${context.target.project}/src/variants/variant.ts`,
        with: `projects/${context.target.project}/src/variants/variant.${variant}.ts`,
      },
    ];
  }
  return options;
}

function resolveVariantConfig(path: string): VariantConfig {
  if (path.endsWith('.ts')) {
    // Register TS compiler lazily
    require('ts-node').register({
      compilerOptions: {
        module: 'commonjs',
      },
    });
  }

  const customWebpackConfig = require(path);
  // If the user provides a configuration in TS file
  // then there are 2 cases for exporing an object. The first one is:
  // `module.exports = { ... }`. And the second one is:
  // `export default { ... }`. The ESM format is compiled into:
  // `{ default: { ... } }`
  const variantExport = customWebpackConfig.default || customWebpackConfig;
  // @TODO Hoh to store the config for angular and node?
  return variantExport.variant;
}
