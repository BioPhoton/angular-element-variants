import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getProject, getProjectName, getWorkspace, parseApplicationProject } from '../utils';
import { camelize } from 'tslint/lib/utils';

export function addFileReplacements(options: { project: string, variant: string }): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularPath = 'angular.json';
    const workspace = getWorkspace(tree, angularPath);
    const projectName = getProjectName(workspace, options);
    const unsafeProject = getProject(workspace, options);
    const project = parseApplicationProject(unsafeProject);

    const variant = camelize(options.variant);
    if (project.architect.build.configurations[variant]) {
      throw new SchematicsException(`Configuration for ${variant} already exists!`);
    }

    // adding builder for serve and build target
    project.architect.build.configurations = {
      ...project.architect.build.configurations,
      [variant]: getBuildVariantConfiguration(projectName, variant),
    };
    project.architect.serve.configurations = {
      ...project.architect.serve.configurations,
      [variant]: getServeVariantConfiguration(projectName, variant),
    };

    tree.overwrite(angularPath, JSON.stringify(workspace, null, 2));

    return tree;
  };
}

function getBuildVariantConfiguration(projectName: string, variant: string): any {
  return {
    variant,
    outputPath: `dist/${projectName}-${variant}`,
    fileReplacements: [
      {
        replace: `projects/${projectName}/src/variants/variant.ts`,
        with: `projects/${projectName}/src/variants/variant.${variant}.ts`,
      },
    ],
  };
}

function getServeVariantConfiguration(projectName: string, variant: string): any {
  return {
    browserTarget: `${projectName}:build`,
  };
}

