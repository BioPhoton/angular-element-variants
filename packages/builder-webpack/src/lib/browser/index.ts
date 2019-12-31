import { BuilderContext, BuilderOutputLike, createBuilder } from '@angular-devkit/architect';
import { BrowserBuilderOptions, executeBrowserBuilder } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import { addFileReplacementsForVariant, getTransforms, mergeOptions } from '../common';
import { ElementVariantsWebpackSchema } from '../element-variants-webpack-schema';
import { map, switchMap } from 'rxjs/operators';

export type CustomWebpackBrowserSchema = BrowserBuilderOptions & ElementVariantsWebpackSchema;

export function buildCustomWebpackBrowser(
  options: CustomWebpackBrowserSchema,
  context: BuilderContext
): Observable<BuilderOutputLike> {
  return mergeOptions(options, context).pipe(
    map(op => addFileReplacementsForVariant(op, context)),
    switchMap(customWebpackOptions =>
      executeBrowserBuilder(
        customWebpackOptions,
        context,
        getTransforms(customWebpackOptions, context)
      )
    )
  );
}

export default createBuilder<json.JsonObject & CustomWebpackBrowserSchema>(
  buildCustomWebpackBrowser
);
