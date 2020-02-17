import * as path from 'path';
import * as copy from 'copy';
import * as fs from 'fs-extra';
import { bindNodeCallback, concat, EMPTY, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function syncPeerDependencies(sourceFolder: string): Observable<void> {
  const fileName = path.join(sourceFolder, 'package.json');
  const packageJson = resolveFile(fileName);
  if (packageJson.peerDependencies !== undefined) {
    const [packageScope, packageName] = packageJson.name.split('/');
    const packageVersion = packageJson.version;
    const devDependencies = packageJson.devDependencies || {};
    packageJson.peerDependencies = {
      ...packageJson.peerDependencies,
      ...Object.entries(packageJson.peerDependencies)
        .filter(([lib, version]) => lib.indexOf(packageScope) !== -1)
        .reduce((peerDependencies, [lib, version]) => {
          const p = lib.split('/')[1];
          const allowedPackages = ['core'];
          if (!allowedPackages.includes(p)) {
            throw new Error(`PeerDependency to ${p} is not allowed!`);
          }
          peerDependencies[lib] = devDependencies[lib] || packageVersion;
          return peerDependencies;
        }, {}),
    };

    return concat(
      from(fs.writeFile(fileName, JSON.stringify(packageJson, null, 2), { encoding: 'utf8' }))
    );
  }
  return EMPTY;
}

function resolveFile(path: string): any {
  if (path.endsWith('.json')) {
    // Register TS compiler lazily
    require('ts-node').register({
      compilerOptions: {
        resolveJsonModule: true,
        esModuleInterop: true,
        module: 'commonjs',
      },
    });
    const json = require(path);
    return json;
  }

  if (path.endsWith('.ts')) {
    // Register TS compiler lazily
    require('ts-node').register({
      compilerOptions: {
        module: 'commonjs',
      },
    });
  }
  const packageJson = require(path);
  // If the user provides a configuration in TS file
  // then there are 2 cases for exporing an object. The first one is:
  // `module.exports = { ... }`. And the second one is:
  // `export default { ... }`. The ESM format is compiled into:
  // `{ default: { ... } }`
  return packageJson.default || packageJson;
}

export function globCopy(
  patterns: string[],
  dir: string
): Observable<{patterns: string[], num: number}> {
  return bindNodeCallback(copy)(patterns, dir)
    .pipe(
      map((files) => ({ patterns, num: files.length })
    )
  );
}


export function _globCopy(
  patterns: string[],
  dir: string
): Observable<any> {
  const p =  new Promise<any>((resolve, reject) => {
    copy(patterns, dir, (res, err) => {
      if(err) {
        return reject(err);
      }
      return resolve(res)
    })
  });
  return from(p);
}
