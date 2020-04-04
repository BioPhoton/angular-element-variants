import { from } from 'rxjs';
import * as path from 'path';
import { getProject } from './utils/get-project';
import { experimental } from '@angular-devkit/core';
import { getOutPath } from './utils/get-out-path';
import { mergeMap } from 'rxjs/operators';
import { generateSchemas } from './tasks/generate-schemas';


interface Params {
  projectName: string,
  folders: string[]
}

const wd = process.cwd();
const params: Params = { projectName: 'builder-webpack', folders: ['lib', 'schematics'] }; // ensureCliParams<Params>(['projectName', 'folders']);

const project: experimental.workspace.WorkspaceProject = getProject(params.projectName);
const destination: string = path.join(wd, 'dist', getOutPath(params.projectName));

from(params.folders).pipe(
  mergeMap(folder => generateSchemas(
    path.join(wd, project.root),
    folder,
    destination
    )
  )
).subscribe(numberOfSchemas => {
    console.log(`Generated ${numberOfSchemas} schemas in ${destination}`);
  },
  () => {
  }
);
process.exit();
