import { resolveFile } from './resolve-file';
import * as path from 'path';
import { experimental } from '@angular-devkit/core';
import { getProject } from './get-project';

const wd = process.cwd();

export function getPublishablePackageJson(projectName: string): experimental.workspace.WorkspaceProject {
  const project: experimental.workspace.WorkspaceProject = getProject(projectName);

  const publishablePackage  = resolveFile(path.join(wd, project.root, './project.json'));

  if ('files' in publishablePackage) {
    console.log(publishablePackage.files)
  }

  return;

}
