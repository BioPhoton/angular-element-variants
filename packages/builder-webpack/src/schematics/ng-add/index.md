import { chain, Rule } from '@angular-devkit/schematics';
import { Schema as NgAddOptions } from './schema';
import { addPackageJsonDependencies } from './add-package-json.rule';
import { addWebpackBuilder } from './add-webpack-builder.rule';
import { addElementVariant } from './generate-variant.rule';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(optionsSchema: NgAddOptions): Rule {
  return chain([addWebpackBuilder(optionsSchema), addPackageJsonDependencies()]);
}
export function addVariant(optionsSchema: NgAddOptions): Rule {
  return chain([addElementVariant(optionsSchema)]);
}
