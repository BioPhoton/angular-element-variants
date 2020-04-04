module.exports = [
  {
    originalSchemaPath: `${__dirname}/schema.base.json`,
    schemaExtensionPaths: [`ng-add/schema.ext.json`, `schema.ext.json`],
    newSchemaPath: `ng-add/schema.json`,
  },
  {
    originalSchemaPath: `${__dirname}/schema.base.json`,
    schemaExtensionPaths: [`add-variant/schema.ext.json`, `schema.ext.json`],
    newSchemaPath: `add-variant/schema.json`,
  }
];
