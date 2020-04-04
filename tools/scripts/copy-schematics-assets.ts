import { Observable, throwError } from 'rxjs';
import { globCopy, GlobCopyResult } from './utils/glob-copy';
import * as path from 'path';
import { getProject } from './utils/get-project';
import { experimental } from '@angular-devkit/core';
import { getOutPath } from './utils/get-out-path';
import { copySchematicsAssets } from './tasks/copy-schematics-assets';

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
