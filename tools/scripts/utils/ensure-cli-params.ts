import { isArray } from "util";
import * as yargs from 'yargs';

const wd = process.cwd();

export function ensureCliParams<T extends object>(expectedParams: string[]): T {
  const wd = process.cwd();
// @TODO check why it is not working with params
  const passedParams = (yargs.argv._ as unknown) as T;
  let parsedParams: T = {} as T;

  if(isArray(passedParams)) {
    expectedParams.forEach((key) => {
      parsedParams[key] = passedParams.shift();
    })
  } else {
    parsedParams = Object.entries(passedParams)
      .filter(([key,_]) => expectedParams.includes(key))
      .reduce((params, [key, value]) => ({[key]: value}), {} as any)
  }

  if(expectedParams.length !== Object.keys(parsedParams).length) {
    throw new Error(`Params ${expectedParams} required. use --paramName my-project or ' ' my-project`)
  }

  return parsedParams;
}
