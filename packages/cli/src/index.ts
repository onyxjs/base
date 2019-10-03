import commander from 'commander';
import fs from 'fs';
// tslint:disable-next-line:no-var-requires
const pkg = require('../package.json');

enum descriptions {
  version = 'Prints Onyx version',
  help = 'Shows CLI help and exits',
}

const text = (description: string) => {
  if (!(descriptions as any)[description]) {
    throw new Error(`Could not find description for: ${description}`);
  }

  return (descriptions as any)[description];
};

const program = new commander.Command();

// help
program
  .command('help')
  .option('-h, --help', text('help'))
  .description(text('help'))
  .action(() => {
    program.help();
  });

// version
program
  .option('-v, --version', text('version'))
  .command('version')
  .description(text('version'))
  .action(() => {
    // tslint:disable-next-line:no-console
    console.log(pkg.version);
  });

program.parse(process.argv);

const files = process.argv;

// tslint:disable-next-line:no-console
console.log('Onyx');

fs.readFile('index.js', 'utf-8', (err, data) => {
    // tslint:disable-next-line:no-console
  if (err) { console.log(err); }
  // tslint:disable-next-line:no-console
  console.log(data);
});
