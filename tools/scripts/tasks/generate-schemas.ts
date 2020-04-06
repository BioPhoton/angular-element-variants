import { Observable, of, throwError } from 'rxjs';
import * as path from 'path';
import { merge } from 'lodash';
import { writeFileSync } from 'fs';
import { ensureDirectoryExists } from '../utils/ensure-directory-exists';
import { GlobCopyResult } from '../utils/glob-copy';

interface CustomSchema {
  schemas: string[];
  destination: string;
}

export function generateSchemas(source: string, folder: string, destination: string): Observable<GlobCopyResult> {
  if (!source || !destination) {
    return throwError('Params source and destination required.');
  }

  const folderPath = require(path.join(source, 'src', folder, 'schemes.ext.ts'));
  const customSchemas: CustomSchema[] = folderPath;

  customSchemas.forEach(customSchema => {
    const newSchema = customSchema.schemas
      .map((p: string) => p[0] === '@' ? p : path.join(source, 'src', folder, p))
      .map((p: string) => require(p))
      .reduce((extendedSchema: any, currentExtension: any) => merge(extendedSchema, currentExtension));

    const destinationPath = path.join(destination, folder);

    ensureDirectoryExists(path.join(destinationPath, customSchema.destination));
    writeFileSync(path.join(destinationPath, customSchema.destination), JSON.stringify(newSchema, null, 2), 'utf-8');
  });

  const res: GlobCopyResult = {
    source,
    patterns: [folderPath],
    destination,
    numberOfFiles: customSchemas.length
  };

  return of(res);
}
