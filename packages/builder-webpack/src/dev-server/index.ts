import {BuilderContext, createBuilder} from '@angular-devkit/architect';
import {DevServerBuilderOptions, DevServerBuilderOutput, executeDevServerBuilder,} from '@angular-devkit/build-angular';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {addFileReplacementsForVariant, getTransforms, mergeOptions} from '../common';
import {ElementVariantsWebpackSchema} from '../element-variants-webpack-schema';

type ExtDevServerBuilderOptions = DevServerBuilderOptions & ElementVariantsWebpackSchema;

export const serveCustomWebpackBrowser = (
    options: ExtDevServerBuilderOptions,
    context: BuilderContext
): Observable<DevServerBuilderOutput> => {

    return mergeOptions(options, context).pipe(
        map(v => addFileReplacementsForVariant(v, context)),
        switchMap(customWebpackOptions =>
            executeDevServerBuilder(options, context, getTransforms(customWebpackOptions, context))
        )
    );
};

export default createBuilder<ExtDevServerBuilderOptions, DevServerBuilderOutput>(
    serveCustomWebpackBrowser
);
