import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { buildDefaultPath, parseName } from 'schematics-utilities';
import { getProject, getProjectName, getWorkspace, parseApplicationProject } from '../utils';


export function addElementVariantFile(optionsSchema: { variant: string, project: string }): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularJsonPath = 'angular.json';
    const workspace = getWorkspace(tree, angularJsonPath);
    const projectName = getProjectName(workspace, optionsSchema);
    const unsafeProject = getProject(workspace, optionsSchema);
    const project = parseApplicationProject(unsafeProject);
    const projectPath = buildDefaultPath(project);
    const parsedName = parseName(projectPath, projectName);

    const templatesPath = optionsSchema.variant === 'default' ? './files/variant-default' : './files/variant-custom';
    const templates = url(templatesPath);
    const destinationPath = parsedName.path + '/../variants';
    const enrichedTemplates = apply(templates, [
      template({
        ...optionsSchema,
        ...strings,
      }),
      move(destinationPath),
    ]);

    return mergeWith(enrichedTemplates)(tree, context);
  };
}
