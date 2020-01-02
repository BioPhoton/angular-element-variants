import {concat} from 'rxjs';
import {copyFolders, syncPeerDependencies,} from '../../../tooling/common';

const root = '../';
const dist = '../dist';
const nodeModules = '../../node_modules/@angular-element-variants/integration-helper';
const files = ['package.json', 'README.md'];

concat(
    // syncPeerDependencies(root),
    // copyFolders(root, dist, files),
    // copyFolders(dist, nodeModules)
).subscribe();
