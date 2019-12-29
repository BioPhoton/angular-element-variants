/**
 * Created by Evgeny Barabanov on 05/10/2018.
 */

import {BuilderContext, BuilderOutput, createBuilder} from '@angular-devkit/architect';
import {executeKarmaBuilder, KarmaBuilderOptions} from '@angular-devkit/build-angular';
import {json} from '@angular-devkit/core';
import {Observable} from 'rxjs';
import {addFileReplacementsForVariant, customWebpackConfigTransformFactory, mergeOptions} from '../common';
import {ElementVariantsWebpackSchema} from '../element-variants-webpack-schema';
import {map, switchMap} from "rxjs/operators";

export type CustomWebpackKarmaBuildSchema = KarmaBuilderOptions & ElementVariantsWebpackSchema;

export function buildCustomWebpackKarma(
  options: CustomWebpackKarmaBuildSchema,
  context: BuilderContext
): Observable<BuilderOutput> {
    return mergeOptions(options, context).pipe(
        map(options => addFileReplacementsForVariant(options, context)),
        switchMap(customWebpackOptions =>
            executeKarmaBuilder(options, context, {
                webpackConfiguration: customWebpackConfigTransformFactory(options, context),
            })
        )
    );
}

export default createBuilder<json.JsonObject & CustomWebpackKarmaBuildSchema>(
  buildCustomWebpackKarma
);
