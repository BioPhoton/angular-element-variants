import * as path from 'path';
import * as fs from 'fs-extra';
import {concat, from, merge, Observable} from 'rxjs';



export function copyPackageDefaults(files: string[], source: string, destination: string): Observable<void>  {
const observables: Observable<void>[] = files
    .reduce((obs, file) => obs.concat([from(fs.copyFile(path.join(source, file), path.join(destination, file)))]), []);
return concat(merge(...observables));
}
export function syncWithNodeModules(source: string, desitnation: string): Observable<void> {
    return concat(
        from(fs.mkdir(source)),
        from(fs.copy(source, desitnation))
    )
}
