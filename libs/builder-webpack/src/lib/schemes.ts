import * as path from 'path';

module.exports = [
  {
    originalSchemaPath: '@angular-devkit/build-angular/src/browser/schema.json',
    schemaExtensionPaths: [path.join('browser', 'schema.ext.json'), 'schema.ext.json'],
    newSchemaPath: path.join('browser','schema.json')
  },
  {
    originalSchemaPath: '@angular-devkit/build-angular/src/server/schema.json',
    schemaExtensionPaths: [path.join('server','schema.ext.json'), 'schema.ext.json'],
    newSchemaPath: path.join('server','schema.json')
  },
  {
    originalSchemaPath: '@angular-devkit/build-angular/src/karma/schema.json',
    schemaExtensionPaths: [path.join('karma','schema.ext.json'), 'schema.ext.json'],
    newSchemaPath: path.join('karma','schema.json')
  },
  {
    originalSchemaPath: '@angular-devkit/build-angular/src/dev-server/schema.json',
    schemaExtensionPaths: [path.join('dev-server','schema.ext.json'), 'schema.ext.json'],
    newSchemaPath: path.join('dev-server','schema.json')
  }
];
