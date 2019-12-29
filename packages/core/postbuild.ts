import * as path from 'path';
import * as fs from 'fs-extra';
import {from, merge} from 'rxjs';

const source = '';
const destination = '../dist/core';
const files = [
    'package.json',
    'README.md'
];

const observables = files
    .reduce((obs, file) => obs.concat([from(fs.copyFile(path.join(source, file), path.join(destination, file)))]), [])
merge(...observables)
    .subscribe({
        // next(res) { console.log('Copied files to dist'); },
        error(error) {
            console.error('ERROR', error);
        },
        complete() {
            console.log('COMPLETE');
        }
    });
