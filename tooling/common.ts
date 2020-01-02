import * as path from 'path';
import * as fs from 'fs-extra';
import { concat, EMPTY, from, Observable } from 'rxjs';

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
      from(fs
        .writeFile(
          fileName,
          JSON.stringify(packageJson, null, 2),
          { encoding: 'utf8' },
        ),
      ),
    );
  }
  return EMPTY;
}

function resolveFile(path: string): any {
  if (path.endsWith('.ts')) {
    // Register TS compiler lazily
    require('ts-node').register({
      compilerOptions: {
        module: 'commonjs',
      },
    });
  }

  if (path.endsWith('.json')) {
    // Register TS compiler lazily
    require('ts-node').register({
      compilerOptions: {
        resolveJsonModule: true,
        esModuleInterop: true,
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
