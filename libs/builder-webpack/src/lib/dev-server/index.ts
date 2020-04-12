import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
  executeDevServerBuilder,
} from '@angular-devkit/build-angular';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { addFileReplacementsForVariant, getTransforms, mergeOptions } from '../common';
import { ElementVariantsWebpackSchema } from '../element-variants-webpack-schema';

type ExtDevServerBuilderOptions = DevServerBuilderOptions & ElementVariantsWebpackSchema;

export const serveCustomWebpackBrowser = (
  options: ExtDevServerBuilderOptions,
  context: any
): Observable<DevServerBuilderOutput> => {
  return mergeOptions(options, context).pipe(
    map(op => addFileReplacementsForVariant(op, context)),
    switchMap(customWebpackOptions =>
      executeDevServerBuilder(
        customWebpackOptions,
        context,
        getTransforms(customWebpackOptions, context)
      )
    )
  );
};

export default createBuilder<ExtDevServerBuilderOptions, DevServerBuilderOutput>(
  serveCustomWebpackBrowser
);
