import { Observable, throwError } from 'rxjs';
import { globCopy, GlobCopyResult } from './utils/glob-copy';
import * as path from 'path';
import { getProject } from './utils/get-project';
import { experimental } from '@angular-devkit/core';
import { getOutPath } from './utils/get-out-path';

interface Params {
  projectName: string
}

const wd = process.cwd();
const params: Params = { projectName: 'builder-webpack' }; // ensureCliParams<Params>(['projectName']);

const project: experimental.workspace.WorkspaceProject = getProject(params.projectName);
const destinationParam: string = path.join(wd, 'dist', getOutPath(params.projectName));

copySchematicsAssets(
  path.join(wd, project.root),
  destinationParam
)
  .subscribe(result => {
      console.log(`Copied ${result.numberOfFiles} files to ${destinationParam}`);
      process.exit();
    },
    () => {
      console.log('COMPLETE generate');
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
