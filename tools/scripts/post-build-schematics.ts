import { from, merge } from 'rxjs';
import * as path from 'path';
import { getProject } from './utils/get-project';
import { experimental } from '@angular-devkit/core';
import { getOutPath } from './utils/get-out-path';
import { finalize, mergeMap, tap } from 'rxjs/operators';
import { globCopy } from './utils/glob-copy';
import { generateSchemas } from './tasks/generate-schemas';
import { copySchematicsAssets } from './tasks/copy-schematics-assets';


interface Params {
  projectName: string,
  folders: string[]
}

const wd = process.cwd();
const params: Params = { projectName: 'builder-webpack', folders: ['builders', 'schematics'] };
// in the cli: npm run post-build -- projectName=builder-webpack lib schematics
// const params: Params = ensureCliParams<Params>(['projectName', 'folders']);

const project: experimental.workspace.WorkspaceProject = getProject(params.projectName);
const destination: string = path.join(wd, 'dist', getOutPath(params.projectName));
const source: string = path.join(wd, project.root);

from(params.folders).pipe(
  mergeMap((folder: string) => merge(
    globCopy(source, ['collection.json'], path.join(wd, 'dist')),
    globCopy(source, ['builders.json'], path.join(wd, 'dist')),
    generateSchemas(source, folder, destination),
    copySchematicsAssets(source, folder, destination)
    )
  ),
  tap({
    next(r) {
      console.log(`Copied ${r.numberOfFiles} files from ${r.source} to ${r.destination}`);
    },
    error(e) {
      console.log('Error', e);
    },
    complete() {
      console.log('COMPLETE');
    }
  }),
  finalize(() => process.exit())
)
  .subscribe();


