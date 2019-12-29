"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs-extra");
const rxjs_1 = require("rxjs");
const source = 'src';
const destination = 'dist/angular-element-variants';
const files = [
    'package.json',
    'README.md'
];
const observables = files
    .reduce((obs, file) => obs.concat([rxjs_1.from(fs.copyFile(path.join(source, file), path.join(destination, file)))]), []);
rxjs_1.merge(...observables)
    .subscribe({
    // next(res) { console.log('Copied files to dist'); },
    error(error) { console.error('ERROR', error); },
    complete() { console.log('COMPLETE'); }
});
//# sourceMappingURL=post-compile.js.map