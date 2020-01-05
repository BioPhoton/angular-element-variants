import { writeFileSync } from 'fs';
import { merge } from 'lodash';

interface CustomSchema {
  originalSchemaPath: string;
  schemaExtensionPaths: string[];
  newSchemaPath: string;
}

const wd = process.cwd();
const schemesToMerge: CustomSchema[] = []
  //.concat(require(`${wd}/src/lib/schemes`))
  .concat(require(`${wd}/src/schematics/schemes`));
console.log('schemesToMerge', schemesToMerge);
for (const customSchema of schemesToMerge) {
  const originalSchema = require(customSchema.originalSchemaPath);
  const schemaExtensions = customSchema.schemaExtensionPaths.map((path: string) => require(path));
  const newSchema = schemaExtensions.reduce(
    (extendedSchema: any, currentExtension: any) => merge(extendedSchema, currentExtension),
    originalSchema
  );
  writeFileSync(customSchema.newSchemaPath, JSON.stringify(newSchema, null, 2), 'utf-8');
}
