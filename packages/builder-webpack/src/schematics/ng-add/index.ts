import { chain, Rule } from '@angular-devkit/schematics';
import { Schema as NgAddOptions } from './schema';
import { addPackageJsonDependencies } from '../rules/add-package-json.rule';
import { addWebpackBuilder } from '../rules/add-webpack-builder.rule';
import { NodeDependency, NodeDependencyType } from 'schematics-utilities';

const builderDependencies: NodeDependency[] = [
  {
    type: NodeDependencyType.Default,
    version: '~0.0.0',
    name: '@angular-element-variants/core',
  },
  {
    type: NodeDependencyType.Default,
    version: '~0.0.0',
    name: '@angular-element-variants/builder-webpack',
  },
];

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(optionsSchema: NgAddOptions): Rule {
  return chain([addWebpackBuilder(optionsSchema), addPackageJsonDependencies(optionsSchema, builderDependencies)]);
}
