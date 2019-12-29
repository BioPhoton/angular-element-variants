import * as path from 'path';
import * as fs from 'fs-extra';
import {concat, from, merge} from 'rxjs';

const source = '';
const destination = '../dist/builder-webpack';
const nodeModules = '../node_modules/@angular-element-variants/builder-webpack';
const files = [
    'builders.json',
    'package.json',
    'README.md'
];

const observables = files
    .reduce((obs, file) => obs.concat([from(fs.copyFile(path.join(source, file), path.join(destination, file)))]), [])
concat(merge(...observables), syncWithNodeModules())
    .subscribe({
        // next(res) { console.log('Copied files to dist'); },
        error(error) {
            console.error('ERROR', error);
        },
        complete() {
            console.log('COMPLETE');
        }
    });

function syncWithNodeModules() {
    console.log('syncWithNodeModules');
    return concat(
        from(fs.mkdir(nodeModules)),
        from(fs.copy(destination, nodeModules))
    )
}
