import {concat} from 'rxjs';
import {copyFolders, syncPeerDependencies} from '../../../tooling/common';

const root = '../';
const dist = 'dist';
const nodeModulesSubFolder = '../../../node_modules/@angular-element-variants/builder-webpack';
const packageFiles = ['builders.json', 'package.json', 'README.md'];

concat(
    // syncPeerDependencies(root),
    // copyFolders(root, dist, packageFiles),
    // copyFolders(dist, nodeModulesSubFolder)
).subscribe();
