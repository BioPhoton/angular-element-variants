import * as path from 'path';
// @ts-ignore
import * as fs from 'fs-extra';

import {defaultVariantConfig, EsVersions, runtimeShipped, scriptsShipped, VariantConfig, VariantSet, ZoneHandling} from '../interfaces';

export function getVariantConfig(options: any, variants: VariantSet): VariantConfig {
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

export function setupBundles(cfg: any, variant: VariantConfig) {

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
  return cfg;
}


// ============================

function merge(pathList: string[], destination: string): Promise<void> {
  return Promise.all(pathList.map(file => fs.readFile(file)))
    .then((contents) => fs.writeFile(destination, contents.join('\n')))
    .catch(e => (console.error('ERROR: ', e)));
}

function logEntries(entries: { [key: string]: string[] }): { [key: string]: string[] } {
  return Object.entries(entries)
    .map(([entryName, files]: [string, string[]]) => {
      return [entryName, files.map(p => (p + '').split('\\').pop())];
    })
    .reduce((ob, [entryName, files]: any): any => ({...ob, [entryName]: files}), {});
}

function getSafeConfig<T>(config: T): T {
  return {
    ...defaultVariantConfig,
    ...config
  };
}

function getReplacedFile<T>(cfg: any, mainFile: string, set: { [key: string]: T }): T {
  // i.e. environment.prod.ts
  // [{replace: string, with: string}, ...]
  const fileReplacement = cfg.fileReplacements.find((fileReplacementObject: { replace: string, with: string }) => {
    return fileReplacementObject.replace.indexOf(mainFile) !== -1;
  });

  const file = fileReplacement ? fileReplacement.with
    .split('/').pop()
    // '' => [environment, devControlled, ts]
    .split('.')[1] : false;

  if (file) {
    return set[file];
  }

  return set.defaultOption;
}

