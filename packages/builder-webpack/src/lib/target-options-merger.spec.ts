import { mergeTargetOptions } from './target-options-merger';

describe('Target options merger test', () => {
  it('Should replace all', () => {
    const baseOptions = {
      outputPath: 'dist/elements',
      index: 'projects/elements/src/index.html',
      main: 'projects/elements/src/main.ts',
      polyfills: 'projects/elements/src/polyfills.ts',
      tsConfig: 'projects/elements/tsconfig.app.json',
      aot: false,
      assets: [] as string[],
      styles: ['projects/elements/src/styles.scss'],
      scripts: [] as string[],
    };
    const applyOptions = {
      variant: '',
      styles: [] as string[],
    };

    const output = mergeTargetOptions(baseOptions, applyOptions);

    const expected = {
      outputPath: 'dist/elements',
      index: 'projects/elements/src/index.html',
      main: 'projects/elements/src/main.ts',
      polyfills: 'projects/elements/src/polyfills.ts',
      tsConfig: 'projects/elements/tsconfig.app.json',
      aot: false,
      assets: [] as string[],
      styles: [] as string[],
      scripts: [] as string[],
    };

    expect(output).toEqual(expected);
  });
});
