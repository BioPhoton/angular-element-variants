import { globCopy } from '../../../tooling/common';
import { concat, from } from 'rxjs';
import * as path from 'path';
import {promises as fs} from 'fs';

const wd = process.cwd();
from(fs.rename(path.join(wd,'package.build.json'), path.join(wd,'dist/package.json')))
.subscribe();




