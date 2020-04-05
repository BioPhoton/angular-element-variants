import { mergeTargetOptions } from '../../src/lib/target-options-merger';

describe('Target options merger override test', () => {
  it('Should replace all', () => {
    const baseOptions = {
      outputPath: 'dist/elements',
      styles: ['projects/elements/src/styles.scss']
    };
    const applyOptions = {
      outputPath: 'override',
      styles: [] as string[],
    };

    const output = mergeTargetOptions(baseOptions, applyOptions);

    const expected = {
      outputPath: 'override',
      styles: [] as string[]
    };

    expect(output.outputPath).toBe(expected.outputPath);
  });
});

describe('Target options merger skip empty test', () => {
  it('Should replace all', () => {
    const baseOptions = {
      outputPath: 'dist/elements',
      styles: ['projects/elements/src/styles.scss']
    };
    const applyOptions = {
      outputPath: undefined as any,
      styles: undefined as any,
    };

    const output = mergeTargetOptions(baseOptions, applyOptions);

    const expected = {
      outputPath: 'dist/elements',
      styles: ['projects/elements/src/styles.scss']
    };

    expect(output.outputPath).toBe(expected.outputPath);
  });
});
