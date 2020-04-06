# copySchematicsAssets

## Description
This task takes care about copying all related files related to a schematic,
tat are not compiled by TypeScript to the dist folder.

## Usage 

`copySchematicsAssets` takes 3 arguments:
- source {string} - The source folder
- folder {string} - The folder in which schematics life
- destination {string} - The path/to/file.json to merge in.

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
│               │   index.md
│               │   index.ts
│               │   schema.ext.json
│               │   schema.ts
│               │   ...
│               └───files
│                      __name@camelize__.component.css
│                      __name@camelize__.component.html
│                      __name@camelize__.component.ts
│                      __name@camelize__.component.spec.ts
│                      ...
│                      
└───...
```

#### Copying Schemas

```typescript
copySchematicsAssets('libs/lib-one', 'schematics', 'dist/libs/lib-one');
```

The function internally copies files matching following glob patterns:

```typescript
[
    // files for generate commands
    path.join(libsFolderStruct, '*/files/**/**.*'),
    // cli info files
    path.join(libsFolderStruct, '**/index.md')
]
```

The resulting dist folder looks like following:

**Build output in dist structure**
```
libs
└───lib-one
│   │   README.md
│   │   collection.json
│   │   builders.json
│   │   ...
│   └───src
│       └───lib
│       │   └───browser
│       │   └───dev-server
│       │   └───karma
│       │   └───...
│       └───schematics
│           └───ng-add
│           │   index.md
│           └───custom-generate
│               └───files
│                      __name@camelize__.component.css
│                      __name@camelize__.component.html
│                      __name@camelize__.component.ts
│                      __name@camelize__.component.spec.ts
│                      ...          
└───...
```
