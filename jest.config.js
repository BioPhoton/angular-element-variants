
const {
  compilerOptions
} = require('./tsconfig');
// compilerOptions.paths

const {
  resolve
} = require('path');

module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  "collectCoverageFrom": [
    "**/*.{ts,tsx}",
    "!**/node_modules/**"
  ]
};
