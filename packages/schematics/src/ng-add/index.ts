import { chain, Rule } from '@angular-devkit/schematics';
import { NgAddOptions } from './interfaces';
import { addPackageJsonDependencies } from './add-package-json.rule';
import { webpackBuilder } from './webpack-builder.rule';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(optionsSchema: NgAddOptions): Rule {
  return chain([webpackBuilder(optionsSchema), addPackageJsonDependencies()]);
}
