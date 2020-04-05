import { Observable, throwError } from 'rxjs';
import { globCopy, GlobCopyResult } from '../utils/glob-copy';
import * as path from 'path';

export function copySchematicsAssets(source: string, folder:string, destination: string): Observable<GlobCopyResult> {
  if (!source || !destination) {
    return throwError('Params source and destination required.');
  }

  const libsFolderStruct = path.join('/src/', folder);
  return globCopy(
    source,
    [
      path.join(libsFolderStruct, '*/files/**/**.*'),
      path.join(libsFolderStruct, '**/index.md')
    ],
    path.join(destination, folder)
  );
}
