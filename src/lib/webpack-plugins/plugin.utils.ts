import * as path from 'path';
// @ts-ignore
import * as fs from 'fs-extra';

import {defaultVariantConfig, EsVersions, runtimeShipped, scriptsShipped, VariantConfig, VariantSet, ZoneHandling} from '../shared';

interface Options {
  outputPath: string;
  fileReplacements: { replace: string, with: string }[];
}

interface WebPackConfig {
  entry: {[key: string]: string[]};
  optimization: any;
}

export function getVariantConfig(options: Options, variants: VariantSet): VariantConfig {
  return {
    // for serving we dont need a outputPath or bundle name
    bundleName: options.outputPath ? path.parse(options.outputPath).dir.split('/')[1] : '',
    outputPath: options.outputPath ? path.join('.', options.outputPath) : '',
    //                                                 fixed file name like with environment.ts
    ...getReplacedFile<VariantConfig>(options, 'variant.ts', variants)
  };
}

export function postCliBuild(variant: VariantConfig): Promise<void> {
  // @ts-ignore
  const finalOutputPath = path.join(__dirname, '..', '..', '..', '..', variant.outputPath);
  const jsVersion = variant.esVersion;
  const outputFile = path.join(finalOutputPath, `${variant.bundleName}${variant.esVersion === 'es5' ? '.' + jsVersion : ''}.js`);
  const inputPathList = (variant.scripts === scriptsShipped ? [`scripts.js`] : [])
    .concat([`main-es2015.js`])
    .concat(variant.esVersion === EsVersions.es5 ? [`main-es5.js`] : [])
    .map(p => path.join(finalOutputPath, p));

  return merge(inputPathList, outputFile)
    .finally(() => console.log('finally'));
}

export function setupBundles(cfg: WebPackConfig, variant: VariantConfig) {

  // control runtime
  if (variant.runtime === !runtimeShipped) {
    // do not bundle webpack utilities (expect them to be in consumer)
    delete cfg.optimization.runtimeChunk;
  }

  // control main bundle
  if (cfg.optimization) {
    // merge vendor.ts and main.ts into main
    delete cfg.optimization.splitChunks;
  }

  const {
    polyfills,
    ['polyfills-es5']: polyfillsEs5,
    scripts,
    styles,
    main,
    runtime,
    vendor,
    ...other
  }: { [key: string]: string[] } = cfg.entry;

  const zone: string[] = variant.zone === ZoneHandling.Shipped ? ['zone.js/dist/zone'] : [];

  cfg.entry = {
    main: []
    // @ts-ignore
      .concat(zone)
      .concat((variant.polyfills ? polyfills || [] : []))
      .concat(scripts || [])
      // Never include styles
      // .concat(styles ? styles || [] : [])
      .concat(runtime || [])
      .concat(vendor || [])
      .concat(main || [])
  };
  logEntries(cfg);
  return cfg;
}

// ============================

function merge(pathList: string[], destination: string): Promise<void> {
  return Promise.all(pathList.map(file => fs.readFile(file)))
    .then((contents) => fs.writeFile(destination, contents.join('\n')))
    .catch(e => (console.error('ERROR: ', e)));
}

function logEntries(cgf: WebPackConfig): void {
  console.log('Raw WebPackConfig.entry', cgf.entry);
  const preparedEntries = Object.entries(cgf.entry)
    .map(([entryName, files]: [string, string[]]) => {
      return [entryName, files.map(p => (p + '').split('\\').pop())];
    })
    .reduce((ob, [entryName, files]: any): any => ({...ob, [entryName]: files}), {});
  console.log('Prepared', preparedEntries);
}

function getSafeConfig<T>(config: any): VariantConfig {
  return {
    ...defaultVariantConfig,
    ...config
  };
}

function getReplacedFile<T>(options: Options, mainFile: string, set: VariantSet): VariantConfig {
  // i.e. environment.prod.ts
  // [{replace: string, with: string}, ...]
  const fileReplacement:any = options.fileReplacements.find((fileReplacementObject) => {
    return fileReplacementObject.replace.indexOf(mainFile) !== -1;
  });


  const file = fileReplacement ? fileReplacement.with
      .split('/').pop()
      // '' => [environment, devControlled, ts]
      .split('.')[1] : '';

  if (file !== '') {
    return set[file];
  }

  return set.defaultOption;
}
