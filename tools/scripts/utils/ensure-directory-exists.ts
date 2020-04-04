import * as path from "path";
import { existsSync, mkdirSync } from 'fs';

export function ensureDirectoryExists(filePath) {
  var dirname = path.dirname(filePath);
  if (existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  mkdirSync(dirname);
}
