Example:

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



**Build output in dist structure**

```
libs
└───lib-one
│   │   ...
│   └───lib
│   │   │   index.ts
│   │   │   ...
│   │   └───browser
│   │   │   schema.json
│   │   │   index.d.ts
│   │   │   ...
│   │   └───dev-server
│   │   └───karma
│   │   └───...
│   └───schematics
│       │   index.d.ts
│       │   schema.d.ts
│       │   ...
│       └───ng-add
│       │   index.md
│       │   index.d.ts
│       │   schema.json
│       │   schema.d.ts
│       │   ...
│       └───custom-generate
│           └───files
│               index.md
│               index.d.ts
│               schema.json
│               schema.d.ts
│               ...
└───...
```
