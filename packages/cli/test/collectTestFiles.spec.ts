import { lookUpTestFiles } from '../src/utils/collectTestFiles';

describe('lookUpTestFiles', () => {
  it('should return a list of files when pattern is a glob string', () => {
    const glob = 'src/*.ts';

    expect(lookUpTestFiles(glob)).toHaveLength(3);
  });
  
  it('should return the file if pattern matches a file', () => {
    const file = 'src/index.ts';

    expect(lookUpTestFiles(file)).toStrictEqual([file]);
  });

  it('should concatenate all paths found if pattern is a directory', () => {
    const dir = 'src';

    expect(lookUpTestFiles(dir)).toHaveLength(6);
  });

  it('should throw an error when no files match', () => {
    const none = 'src/doesntExist.ts';

    expect(() => lookUpTestFiles(none)).toThrowError();
  });
})
