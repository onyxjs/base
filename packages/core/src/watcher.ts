import chokidar from 'chokidar';

class Watcher {
  public files: string | string[];
  public options: any;
  private watcher: any;

  constructor(files: string | string[], options: any) {
    this.files = files;
    this.options = options || {/* Default options */};
  }

  public watchFiles(files: string): void {
    if (this.watcher) {
      this.watcher.close();
    }

    this.watcher = chokidar.watch(files, {/*options*/});
  }
}
