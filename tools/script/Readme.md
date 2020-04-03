# Scripts

All tasks accept arguments of the command line and can be called from the command line or from npm scripts:  
`ts-node task-name.ts one two=three four`

or with specified tsconfig like this:
`ts-node -P .\tools\tsconfig.tools.json -r .\path\to\tasks\task.name.ts one two=three four`
