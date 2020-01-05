import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';

import { Schema as NgAddOptions } from './schema';
import { getProject, getWorkspace } from './utils';

export function addWebpackBuilder(options: NgAddOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const path = 'angular.json';
    // Verifying Angular.json
    const workspace = getWorkspace(tree, path);
    // Verifying project
    const project = getProject(workspace, options);

    // Verifying project type application
    if (project.projectType !== 'application') {
      throw new SchematicsException(
        `@angular-element-variants/builder-webpack requires an Angular project type of "application" in angular.json`
      );
    }

    // adding builder for serve and build target
    project.architect['build'] = {
      ...project.architect['build'],
      builder: '@angular-element-variants/builder-webpack:browser',
    };
    project.architect['serve'] = {
      ...project.architect['serve'],
      builder: '@angular-element-variants/builder-webpack:dev-server',
    };

    tree.overwrite(path, JSON.stringify(workspace, null, 2));

    return tree;
  };
}
