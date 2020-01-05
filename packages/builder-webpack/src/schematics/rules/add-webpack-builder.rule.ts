import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProject, getWorkspace, parseApplicationProject } from '../utils';

export function addWebpackBuilder(options: { project: string }): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const path = 'angular.json';
    // Verifying Angular.json
    const workspace = getWorkspace(tree, path);
    // Verifying project
    const unsafeProject = getProject(workspace, options);
    // Verifying project type application
    const project = parseApplicationProject(unsafeProject);

    // adding builder for serve and build target
    project.architect.build = {
      ...project.architect.build,
      builder: '@angular-element-variants/builder-webpack:browser' as any,
    };
    project.architect.serve = {
      ...project.architect.serve,
      builder: '@angular-element-variants/builder-webpack:dev-server' as any,
    };

    tree.overwrite(path, JSON.stringify(workspace, null, 2));

    return tree;
  };
}
