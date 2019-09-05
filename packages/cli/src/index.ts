import commander from 'commander';

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

const program = commander;

// help
program
  .command('help')
  .option('-h, --help', text('help'))
  .action(() => {
    program.help();
  });

// version
program
  .option('-v, --version', text('version'))
  .command('version')
  .version('0.0.0');

program.parse(process.argv);

// tslint:disable-next-line:no-console
console.log('Onyx');
