import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { strings } from '@angular-devkit/core';
import { buildDefaultPath, parseName, WorkspaceProject, ProjectType } from 'schematics-utilities';
import { getProject, getProjectName, getWorkspace } from '../ng-add/utils';

export function addElementVariant(optionsSchema: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const path = 'angular.json';
    const workspace = getWorkspace(tree, path);
    const projectName = getProjectName(workspace, optionsSchema);
    const project = getProject(workspace, {project: undefined});

    if(project.projectType === "application") {
      return project as WorkspaceProject<ProjectType.Application>;
    }

    const projectPath = buildDefaultPath(project);
    const parsedName = parseName(projectPath, projectName);
    const templates = url('./files');

    console.log('parsedName.path', projectPath, projectName, parsedName.path);

    const enrichedTemplates = apply(templates, [
      template({
        ...optionsSchema,
        ...strings,
      }),
      move(parsedName.path),
    ]);

    return mergeWith(enrichedTemplates)(tree, context);
  };
}
