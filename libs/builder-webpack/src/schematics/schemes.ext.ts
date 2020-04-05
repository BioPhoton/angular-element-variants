import * as path from 'path';

const schemas = [
  {
    originalSchemaPath: path.join(__dirname,'schema.base.json'),
    schemaExtensionPaths: [path.join('ng-add', 'schema.ext.json'), `schema.ext.json`],
    newSchemaPath: path.join('ng-add', 'schema.json')
  },
  {
    originalSchemaPath: path.join(__dirname,'schema.base.json'),
    schemaExtensionPaths: [path.join('add-variant', 'schema.ext.json'), `schema.ext.json`],
    newSchemaPath: path.join('add-variant', 'schema.json')
  }
];

module.exports = schemas;
