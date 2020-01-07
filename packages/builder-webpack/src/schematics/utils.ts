import { SchematicsException, Tree } from '@angular-devkit/schematics';
import { JsonParseMode, parseJson } from '@angular-devkit/core';
import { ProjectType, WorkspaceProject, WorkspaceSchema } from 'schematics-utilities';
import { camelize } from 'tslint/lib/utils';

export function getWorkspace(
  host: Tree,
  path = 'angular.json',
): WorkspaceSchema {
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

export function getProject(workspace: WorkspaceSchema, options: { project: string }): WorkspaceProject<ProjectType> {
  // Validating project name
  const project: WorkspaceProject<ProjectType> = workspace.projects[getProjectName(workspace, options)];

  if (!project) {
    throw new SchematicsException(
      'The specified Angular project is not defined in this workspace',
    );
  }

  return project;
}

export function getProjectName(workspace: WorkspaceSchema, options: { project: string }): string {
  let projectName = options.project || workspace.defaultProject;

  if (projectName === undefined) {
    throw new SchematicsException(
      'No Angular project selected and no default project in the workspace',
    );
  }

  return projectName;
}


export function parseApplicationProject(project: WorkspaceProject<ProjectType>): WorkspaceProject<ProjectType.Application> {
  // Verifying project type application
  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `An Angular project type of "application" is required.`,
    );
  } else {
    return project as WorkspaceProject<ProjectType.Application>;
  }
}


export function parseLibraryProject(project: WorkspaceProject<ProjectType>): WorkspaceProject<ProjectType.Library> {
  // Verifying project type application
  if (project.projectType !== 'application') {
    throw new SchematicsException(
      `An Angular project type of "application" is required.`,
    );
  } else {
    return project as WorkspaceProject<ProjectType.Library>;
  }
}

export function parseVariant(variant: string): string {
  return camelize(variant);
}
