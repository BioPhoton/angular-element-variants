import * as copy from 'copy';
import { bindNodeCallback, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface GlobCopyResult {
  patterns: string[],
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
  patterns: string[],
  destination: string
): Observable<GlobCopyResult> {
  return bindNodeCallback(copy)(patterns, destination).pipe(
    map(files => ({
      patterns,
      numberOfFiles: files.length
    }))
  );
}
