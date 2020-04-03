import { Observable, throwError } from 'rxjs';
import { globCopy } from './utils/glob-copy';
import * as path from 'path';

const wd = process.cwd();
const argv = process.argv;

const folderParam = argv[0];
const destinationParam = argv[0];
console.log(folderParam, destinationParam);
copySchematicsAssets(
  path.join(wd, folderParam),
  path.join(wd, destinationParam)
)
  .subscribe();

// ===

function copySchematicsAssets(source: string, destination: string): Observable<any> {
  if (!!source || !destination) {
    return throwError('Params source and destination required.');
  }
  const libsFolderStruct = '/src/schematics';
  return globCopy(
    [
      path.join(wd, source, libsFolderStruct, '*/files/**/**.*'),
      path.join(wd, source, libsFolderStruct, '**/index.md')
    ],
    path.join(wd, destination, 'schematics')
  );
}
