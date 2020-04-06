import * as path from 'path';

const schemas = [
  {
    schemas: [
      path.join('ng-add', 'schema.ext.json'),
      'schema.ext.json',
      'schema.base.json'
    ],
    destination: path.join('ng-add', 'schema.json')
  },
  {
    schemas: [
      path.join('add-variant', 'schema.ext.json'),
      'schema.ext.json',
      'schema.base.json'
    ],
    destination: path.join('add-variant', 'schema.json')
  }
];

module.exports = schemas;
