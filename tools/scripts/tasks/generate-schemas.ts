import { Observable, of, throwError } from 'rxjs';
import * as path from 'path';
import { merge } from 'lodash';
import { writeFileSync } from 'fs';
import { ensureDirectoryExists } from '../utils/ensure-directory-exists';

interface CustomSchema {
  originalSchemaPath: string;
  schemaExtensionPaths: string[];
  newSchemaPath: string;
}

export function generateSchemas(source: string, folder: string, destination: string): Observable<number> {
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
