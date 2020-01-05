import { globCopy } from '../../../tooling/common';


const wd = process.cwd();
const schemesToMerge = []
  .concat(require(`${wd}/src/schematics/schemes`));

globCopy(
  [`${wd}/src/schematics/*/files/**/**.*`, `${wd}/src/schematics/**/index.md`],
  `${wd}/dist/schematics`,
  (err, file) => {
    console.log('err, file', err, file.length);
  },
)
  .subscribe();
