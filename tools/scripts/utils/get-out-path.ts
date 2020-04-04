import { experimental } from '@angular-devkit/core';
import { getProject } from './get-project';
import * as path from 'path';

export function getOutPath(projectName: string) {
  const project: experimental.workspace.WorkspaceProject = getProject(projectName);
  const projectType = project.projectType === 'library' ? 'libs' : 'apps';
  const outputPath = project.architect.build.options.outputPath;
  const destinationParam: string[] = outputPath ? [outputPath] : [projectType, projectName];
  return path.join(...destinationParam);
}
