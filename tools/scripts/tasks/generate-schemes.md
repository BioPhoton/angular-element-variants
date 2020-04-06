# generate-schemes

## Description

This task helps to keep your schema description maintainable and up to date.
I looks for a description file in your project,
and extends the described schemas in the named order.
After merging it exports them as one schema.json in the dist folder of the target project. 

## Usage 

`generateSchemas` takes 3 arguments:
- source {string} - The source folder
- folder {string} - The folder in which schematics life
- destination {string} - The path/to/file.json to merge in.

It uses source to and folder to determine the target folder.
In the target folder it looks for `schemes.ext.ts`, which describes how the schema.ext.json get inherited from each other.
With this information it loads all schema files, merges them together based on `schemes.ext.ts` and 
writes them to the specified destination file in the dist folder.


### Example:

Following workspace structure is assumed:

**Root structure**
```
root
│   ...
│   angular.json
│   package.json    
│
└───apps
│   └───app-one
│   └───app-two
│   └───app-three   
└───libs
    └───lib-one
    └───lib-two
    └───lib-three
```

Following project details are assumed:

**lib-one structure**
```
libs
└───lib-one
│   │   README.md
│   │   collection.json
│   │   builders.json
│   │   ...
│   └───src
│       └───lib
│       │   │   index.ts
│       │   │   schema.ext.json
│       │   │   schemes.ext.ts
│       │   │   ...
│       │   └───browser
│       │   │   schema.ext.json
│       │   │   index.ts
│       │   │   ...
│       │   └───dev-server
│       │   └───karma
│       │   └───...
│       └───schematics
│           │   index.ts
│           │   schema.base.json
│           │   schema.base.ts
│           │   schema.ext.json
│           │   schema.ts
│           │   schemes.ext.ts
│           │   ...
│           └───ng-add
│           │   index.md
│           │   index.ts
│           │   schema.ext.json
│           │   schema.ts
│           │   ...
│           └───custom-generate
│               └───files
│                   index.md
│                   index.ts
│                   schema.ext.json
│                   schema.ts
│                   ...
└───...
```

#### Extending Existing Schemas

```typescript
generateSchemas('libs/lib-one', 'lib', 'dist/libs/lib-one');
```

This command looks for `schemes.ext.ts` in `libs/lib-one/src/lib`:
```typescript
// libs/lib-one/src/lib/schemes.ext.ts
module.exports = [
  {
    schemas: [
      path.join('browser', 'schema.ext.json'), 
      'schema.ext.json',
      '@angular-devkit/build-angular/src/browser/schema.json'
    ],
    destination: path.join('browser','schema.json')
  },
  { ...  },
  ...
];
```
In this file we see the base schema we want to extend from under `originalSchemaPath`. In our case the angular browser builder.

Over a set of `schema.ext.json` files we can specify properties extend or override the base schema.

They are listed in the second property `schema.ext.json`. This property
describes over an array in which order the `schema.ext.json` files should get merged together.

The merged result will than parsed to JSON and written to the output path specified in `newSchemaPath`.

**Build output in dist structure**

```
libs
└───lib-one
│   │   ...
│   └───lib
│       └───browser
│       │   schema.json
│       └───dev-server
│       └───karma
│       └───...
└───...
```

#### Extending custom base schema

Sometime we don't know have the base schema available in another lib. 
In this case we have to create our own base schema.

We save it under `schema.base.json` for the schema and `schema.base.ts` of a TypeScript interface.

```typescript
generateSchemas('libs/lib-one', 'schematics', 'dist/lib/lib-one');
```

The `schemes.ext.ts` looks like that:
```typescript
// libs/lib-one/src/schematics/schemes.ext.ts
module.exports = [
 {
     schemas: [
      path.join('ng-add', 'schema.ext.json'), 
      `schema.ext.json`,
      'schema.base.json'
    ],
     destination: path.join('ng-add', 'schema.json')
   },
   { ...  },
  ...
];
```
In this file we see `schema.base.json` is used as base schema.


**Build output in dist structure**

```
libs
└───lib-one
│   │   ...
│   └───schematics
│       │   schema.d.ts
│       │   ...
│       └───ng-add
│       │   schema.json
│       │   schema.d.ts
│       │   ...
│       └───custom-generate
│           schema.json
│           schema.d.ts
│           ...
└───...
```
