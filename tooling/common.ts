import * as path from 'path';
import * as fs from 'fs-extra';
import {concat, EMPTY, from, merge, Observable} from 'rxjs';

export function syncPeerDependencies(sourceFolder: string): Observable<void> {
    const fileName = path.join(sourceFolder, 'package.json');
    const packageJson = resolvePackageJson(fileName);

    if (packageJson.peerDependencies !== undefined) {
        packageJson.peerDependencies = {
            ...packageJson.peerDependencies,
            ...Object.entries(packageJson.peerDependencies)
                .filter(([lib, version]) => lib.indexOf('@angular-element-variants') !== -1)
                .reduce((peerDependencies, [lib, version]) => {
                    const p = lib.split('/')[1];
                    const allowedPackages = ['core'];
                    if (!allowedPackages.includes(p)) {
                        throw new Error(`PeerDependency to ${p} is not allowed!`);
                    }
                    peerDependencies[lib] = packageJson.version;
                    return peerDependencies;
                }, {}),
        };
        return concat(
            // @TODO dist should update from copyPackageDefaults. Needs fix.
            from(
                fs.writeFile(
                    path.join(sourceFolder, '/dist/package.json'),
                    JSON.stringify(packageJson, null, 2),
                    {encoding: 'utf8'}
                )
            ),
            from(fs.writeFile(fileName, JSON.stringify(packageJson, null, 2), {encoding: 'utf8'}))
        );
    }
    return EMPTY;
}

export function copyFolders(source: string, destination: string, files?: string[]): Observable<void> {
    if(files) {
        const observables: Observable<void>[] = files.reduce(
            (obs, file) => {
                obs.push(from(fs.copyFile(path.join(source, file), path.join(destination, file))));
                return obs;
            },
            []
        );
        return merge(...observables);
    }
    return from(fs.copy(source, destination));
}

function resolvePackageJson(path: string): any {
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
