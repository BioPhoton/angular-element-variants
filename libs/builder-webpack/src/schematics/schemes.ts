module.exports = [
  {
    originalSchemaPath: `${__dirname}/schema.base.json`,
    schemaExtensionPaths: [`${__dirname}/ng-add/schema.ext.json`, `${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../../dist/schematics/ng-add/schema.json`,
  },
  {
    originalSchemaPath: `${__dirname}/schema.base.json`,
    schemaExtensionPaths: [`${__dirname}/add-variant/schema.ext.json`, `${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../../dist/schematics/add-variant/schema.json`,
  }
];
