import { globCopy } from '../../../tooling/common';
import { concat } from 'rxjs';

const wd = process.cwd();
const filesToCopy = [
  // `${wd}/package.build.json`,
  `${wd}/builders.json`,
  `${wd}/collection.json`,
];

const copyAll = globCopy(
  filesToCopy,
  `${wd}/dist`
);

concat(copyAll).subscribe();

