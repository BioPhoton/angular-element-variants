import { Observable, throwError } from 'rxjs';
import { globCopy, GlobCopyResult } from '../utils/glob-copy';
import * as path from 'path';

export function copySchematicsAssets(source: string, destination: string): Observable<GlobCopyResult> {
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
