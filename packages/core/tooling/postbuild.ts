import {concat} from 'rxjs';
import * as path from "path";

const root = '';
const dist = path.join(root, 'dist');
const nodeModules = path.join(root, '../../node_modules/@angular-element-variants/core');
const files = ['package.json', 'README.md'];

concat(
    // syncPeerDependencies(root),
    // copyFolders(root, dist, files),
    // copyFolders(dist, nodeModules)
)
    .subscribe();
