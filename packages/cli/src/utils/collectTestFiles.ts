import * as fs from 'fs';
import * as path from 'path';
import glob from 'glob';

/**
 * @description Validate the given path
 * @param pattern
 */
export function lookUpTestFiles(pattern: string): string[] {
  let files: string[] = [];

  // If the path is a glob pattern and not a file path
  if (!fs.existsSync(pattern)) {
    files = glob.sync(pattern);
    if (!files.length) {
      throw new Error(`No files matched the following pattern: ${pattern}`)
    }

    return files;
  }

  // Check the pattern to see if it's a `File`
  try {
    if (fs.statSync(pattern).isFile()) {
      return [pattern];
    }
  } catch (e) {
    return [];
  }

  const dir = fs.readdirSync(pattern);

  for (const entry of dir) {
    const pathname = path.join(pattern, entry);

    try {
      if (fs.statSync(pathname).isDirectory()) {
        files = files.concat(lookUpTestFiles(pathname))
      }
    } catch(e) {
      return [];
    }

    files.push(pathname);
  }

  return files;
}

lookUpTestFiles('test/collectTestFiles.spec.ts');
lookUpTestFiles('src');
lookUpTestFiles('src/**.ts')
