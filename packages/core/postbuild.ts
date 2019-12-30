import { concat } from 'rxjs';
import { copyPackageDefaults, syncWithNodeModules } from '../../tooling/common';

const source = '';
const destination = 'dist';
const nodeModules = '../../node_modules/@angular-element-variants/core';
const files = ['package.json', 'README.md'];

concat(
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
