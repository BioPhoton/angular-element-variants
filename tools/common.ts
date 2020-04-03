import * as copy from 'copy';
import { bindNodeCallback, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function resolveFile(path: string): any {
  if (path.endsWith('.json')) {
    // Register TS compiler lazily
    require('ts-node').register({
      compilerOptions: {
        resolveJsonModule: true,
        esModuleInterop: true,
        module: 'commonjs'
      }
    });
    const json = require(path);
    return json;
  }

  if (path.endsWith('.ts')) {
    // Register TS compiler lazily
    require('ts-node').register({
      compilerOptions: {
        module: 'commonjs'
      }
    });
  }
  const packageJson = require(path);
  // If the user provides a configuration in TS file
  // then there are 2 cases for exporting an object. The first one is:
  // `module.exports = { ... }`. And the second one is:
  // `export default { ... }`. The ESM format is compiled into:
  // `{ default: { ... } }`
  return packageJson.default || packageJson;
}

export function globCopy(
  patterns: string[],
  dir: string
): Observable<{ patterns: string[], num: number }> {
  return bindNodeCallback(copy)(patterns, dir)
    .pipe(
      map((files) => ({ patterns, num: files.length })
      )
    );
}
