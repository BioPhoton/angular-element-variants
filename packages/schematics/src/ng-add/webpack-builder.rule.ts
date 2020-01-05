import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';

import { NgAddOptions } from './interfaces';
import { getWorkspace } from './utils';

export function webpackBuilder(options: NgAddOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Verifying Angular.json
    const { path: workspacePath, workspace } = getWorkspace(tree);

    // getting project name
    if (!options.project) {
      if (workspace.defaultProject) {
        options.project = workspace.defaultProject;
      } else {
        throw new SchematicsException(
          'No Angular project selected and no default project in the workspace'
        );
      }
    }

    // Validating project name
    const project = workspace.projects[options.project];
    if (!project) {
      throw new SchematicsException(
        'The specified Angular project is not defined in this workspace'
      );
    }

    // Checking if it is application
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

    tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));

    return tree;
  };
}
