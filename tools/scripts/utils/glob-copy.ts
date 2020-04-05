import * as copy from 'copy';
import { bindNodeCallback, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as path from 'path';

export interface GlobCopyResult {
  source: string,
  patterns: string[],
  destination: string,
  numberOfFiles: number
}

/**
 * @description
 * A function that copies files based on a glob pattern
 *
 * @param {string[]} patterns - string array of glob pattern or file paths
 * @param {string} destination - the destination directory
 * @return {Observable<GlobCopyResult>} -
 *
 * @example
 * ```ts
 * globCopy('*.js', 'foo')
 *   .pipe(
 *     catchError(error => EMPTY)
 *   );
 * ```
 */
export function globCopy(
  source: string,
  patterns: string[],
  destination: string
): Observable<GlobCopyResult> {
  const patternsWithSource = patterns.map(p => path.join(source, p));
  return bindNodeCallback(copy)(patternsWithSource, destination).pipe(
    map(files => ({
      source,
      patterns,
      destination,
      numberOfFiles: files.length
    }))
  );
}
