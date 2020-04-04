import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { JsonParseMode, parseJson, experimental } from '@angular-devkit/core';

import { camelize } from 'tslint/lib/utils';

export function getWorkspace(
  host: Tree,
  path = 'angular.json',
): experimental.workspace.WorkspaceSchema {
  if (!host.exists(path)) {
    throw new SchematicsException(`Could not find angular.json`);
  }

  const workspaceConfigBuffer = host.read(path);
  if (workspaceConfigBuffer === null) {
    throw new SchematicsException(`Could not read angular.json`);
  }

  let workspace: any;
  try {
    workspace = parseJson(workspaceConfigBuffer.toString(), JsonParseMode.Loose);
  } catch (e) {
    throw new SchematicsException(`Could not parse angular.json: ` + e.message);
  }

  return workspace;
}

export function getProject(workspace: experimental.workspace.WorkspaceSchema, options: { project: string }): experimental.workspace.WorkspaceProject {
  const project: experimental.workspace.WorkspaceProject = workspace.projects[getProjectName(workspace, options)];

  if (!project) {
    throw new SchematicsException(
      'The specified Angular project is not defined in this workspace',
    );
  }

  return project;
}

export function getProjectName(workspace: experimental.workspace.WorkspaceSchema, options: { project: string }): string {
  const projectName: string = options.project || workspace.defaultProject;

  if (projectName === undefined) {
    throw new SchematicsException(
      'No Angular project selected and no default project in the workspace',
    );
  }

  return projectName;
}


export function parseApplicationProject(project: experimental.workspace.WorkspaceProject): experimental.workspace.WorkspaceProject {
  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `An Angular project type of "application" is required.`,
    );
  } else {
    return project;
  }
}


export function parseLibraryProject(project: experimental.workspace.WorkspaceProject): experimental.workspace.WorkspaceProject {
  if (project.projectType !== 'library') {
    throw new SchematicsException(
      `An Angular project type of "library" is required.`,
    );
  } else {
    return project;
  }
}

export function parseVariant(variant: string): string {
  return camelize(variant);
}
