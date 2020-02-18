import { globCopy } from '../../../tooling/common';
import { concat, from } from 'rxjs';
import * as path from 'path';
import {promises as fs} from 'fs';

const wd = process.cwd();
const filesToCopy = [
  path.join(wd,'builders.json'),
  path.join(wd,'collection.json'),
];

const copyAll = globCopy(
  filesToCopy,
  `${wd}/dist`
);
const rename = from(fs.rename(path.join(wd,'package.build.json'), path.join(wd,'dist/package.json')));
concat(copyAll, rename).subscribe();




