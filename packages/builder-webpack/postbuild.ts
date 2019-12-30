import {concat} from 'rxjs';
import {copyPackageDefaults, syncPeerDependencies, syncWithNodeModules} from '../../tooling/common';

const source = '';
const destination = 'dist';
const nodeModules = '../../node_modules/@angular-element-variants/builder-webpack';
const files = ['builders.json', 'package.json', 'README.md'];

concat(
    syncPeerDependencies(__dirname),
    copyPackageDefaults(files, source, destination),
    syncWithNodeModules(destination, nodeModules)
).subscribe({
    // next(res) { console.log('Copied files to dist'); },
    error(error) {
        console.error('ERROR', error);
    },
    complete() {
        console.log('COMPLETE');
    },
});
