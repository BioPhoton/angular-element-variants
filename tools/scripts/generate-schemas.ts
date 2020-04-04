import { from, Observable, of, throwError } from 'rxjs';
import * as path from 'path';
import { getProject } from './utils/get-project';
import { experimental } from '@angular-devkit/core';
import { getOutPath } from './utils/get-out-path';
import { merge } from 'lodash';
import { mergeMap } from 'rxjs/operators';
import { writeFileSync } from 'fs';
import { ensureDirectoryExists } from './utils/ensure-directory-exists';


interface Params {
  projectName: string,
  folders: string[]
}


interface CustomSchema {
  originalSchemaPath: string;
  schemaExtensionPaths: string[];
  newSchemaPath: string;
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
  () => {}
);
process.exit();

// ===

function generateSchemas(source: string, folder: string, destination: string): Observable<number> {
  if (!source || !destination) {
    return throwError('Params source and destination required.');
  }

  const customSchemas: CustomSchema[] = require(path.join(source, 'src', folder, 'schemes.ts'));
  customSchemas.forEach(customSchema => {
    const originalSchema = require(path.join(customSchema.originalSchemaPath));
    const schemaExtensions = customSchema.schemaExtensionPaths
      .map((p: string) => require(path.join(source, 'src', folder, p)));
    const newSchema = schemaExtensions.reduce(
      (extendedSchema: any, currentExtension: any) => merge(extendedSchema, currentExtension),
      originalSchema
    );
    const destinationPath = path.join(destination, folder);
    ensureDirectoryExists(path.join(destinationPath, customSchema.newSchemaPath));
    writeFileSync(path.join(destinationPath, customSchema.newSchemaPath), JSON.stringify(newSchema, null, 2), 'utf-8');
  });

  return of(customSchemas.length);

}
