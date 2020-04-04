import { setupGlobalCompilerOptions } from './consumer.utils';

const baseWebpackConfig = {
  entry: './main.ts'
};

const customWebpackConfig = {
  module: {
    rules: [
      {
        test: '.node',
        use: 'node-loader'
      }
    ]
  }
};

function createConfigFile<T>(fileName: string, content: T) {
  jest.mock(`${__dirname}/${fileName}`, () => content, { virtual: true });
}

describe('setupGlobalCompilerOptions', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return original config if no variant object has been provided', async () => {
    (global as any).globalCompilerOptions = {};
    const mergedConfig = setupGlobalCompilerOptions(
      {}
    );

    expect((global as any).globalCompilerOptions).toEqual({});
  });

});
