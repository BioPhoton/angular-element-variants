import { Observable, throwError } from 'rxjs';
import { globCopy, GlobCopyResult } from './utils/glob-copy';
import * as path from 'path';
import { getProject } from './utils/get-project';
import * as yargs from 'yargs';
import { isArray } from 'util';
import { experimental } from '@angular-devkit/core';

interface Params {
  projectName: string
}

const wd = process.cwd();
// @TODO check why it is not working with params
const params = {projectName: 'builder-webpack'};// (yargs.argv._ as unknown) as Params;

const projectName = isArray(params) ? params[0] : params.projectName;
if(!projectName) {
  throw new Error('Param projectName required. use --projectName my-project or ` ` my-project')
}


const project: experimental.workspace.WorkspaceProject = getProject(projectName);
const projectType = project.projectType === 'library' ? 'lib' : 'app';
const outputPath = project.architect.build.options.outputPath;
const destinationParam: string[] = outputPath ? [outputPath] : [projectType, projectName];

copySchematicsAssets(
  path.join(wd, project.root),
  path.join(wd, 'dist', ...destinationParam)
)
  .subscribe(result => {
    console.log(`Copied ${result.numberOfFiles} to ${path.join(wd, 'dist',...destinationParam)}`);
    process.exit();
  });

// ===

function copySchematicsAssets(source: string, destination: string): Observable<GlobCopyResult> {
  if (!source || !destination) {
    return throwError('Params source and destination required.');
  }

  const libsFolderStruct = '/src/schematics';
  return globCopy(
    [
      path.join(source, libsFolderStruct, '*/files/**/**.*'),
      path.join(source, libsFolderStruct, '**/index.md')
    ],
    path.join(destination, 'schematics')
  );
}
