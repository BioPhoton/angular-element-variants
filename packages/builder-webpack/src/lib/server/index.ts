/**
 * Created by Evgeny Barabanov on 28/06/2018.
 */

import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { executeServerBuilder, ServerBuilderOptions } from '@angular-devkit/build-angular';
import { json } from '@angular-devkit/core';
import { Observable } from 'rxjs';
import {
  addFileReplacementsForVariant,
  customWebpackConfigTransformFactory,
  mergeOptions,
} from '../common';
import { ElementVariantsWebpackSchema } from '../element-variants-webpack-schema';
import { map, switchMap } from 'rxjs/operators';

export type CustomWebpackServerSchema = ServerBuilderOptions & ElementVariantsWebpackSchema;

export function buildCustomWebpackServer(
  options: CustomWebpackServerSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
  return mergeOptions(options, context).pipe(
    map(op => addFileReplacementsForVariant(op, context)),
    switchMap(customWebpackOptions =>
      executeServerBuilder(customWebpackOptions, context, {
        webpackConfiguration: customWebpackConfigTransformFactory(customWebpackOptions, context),
      })
    )
  );
}

export default createBuilder<json.JsonObject & CustomWebpackServerSchema>(buildCustomWebpackServer);
