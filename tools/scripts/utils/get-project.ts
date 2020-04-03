import { resolveFile } from './resolve-file';
import * as path from 'path';
import { experimental } from '@angular-devkit/core';

const wd = process.cwd();

export function getProject(projectName: string): experimental.workspace.WorkspaceProject {
  const workspaceConfig: experimental.workspace.WorkspaceSchema = resolveFile(path.join(wd, './angular.json'));

  if (!(projectName in workspaceConfig.projects)) {
    throw new Error(`Project ${projectName} does not exist.`);
  }

  return workspaceConfig.projects[projectName];

}
