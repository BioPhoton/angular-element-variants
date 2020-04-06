import * as path from 'path';
const schemes = [
  {
    schemas: [
      path.join('browser', 'schema.ext.json'),
      'schema.ext.json',
      '@angular-devkit/build-angular/src/browser/schema.json'
    ],
    destination: path.join('browser','schema.json')
  },
  {
    schemas: [
      path.join('server','schema.ext.json'),
      'schema.ext.json',
      '@angular-devkit/build-angular/src/server/schema.json'
    ],
    destination: path.join('server','schema.json')
  },
  {
    schemas: [
      path.join('karma','schema.ext.json'),
      'schema.ext.json',
      '@angular-devkit/build-angular/src/karma/schema.json'
    ],
    destination: path.join('karma','schema.json')
  },
  {
    schemas: [
      path.join('dev-server','schema.ext.json'),
      'schema.ext.json',
      '@angular-devkit/build-angular/src/dev-server/schema.json'
    ],
    destination: path.join('dev-server','schema.json')
  }
];

module.exports = schemes;
