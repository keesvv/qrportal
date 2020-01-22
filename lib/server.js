const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const express = require('express');

const args = process.argv.slice(2);

module.exports = {
  async start() {
    process.stdout.write(chalk.white.bold('starting server... '));
    
    if (!args.length || !fs.existsSync(args[0])) {
      process.stdout.write(chalk.black.bgRedBright.bold(' FAILED '))
      process.stdout.write('\n');

      if (!args.length) {
        console.log(chalk.redBright('Please specify one or more input files.'));
      } else if (!fs.existsSync(args[0])) {
        console.log(chalk.redBright('One or more files do not exist.'));
      }

      process.exit(1);
    }

    const fileName = path.basename(args[0]);
    const content = fs.readFileSync(args[0]);

    const app = new express();

    app.get('/', (req, res) => {
      process.stdout.write(chalk.white.bold('downloading file... '));

      res.attachment(fileName);
      res.send(content);

      req.on('end', () => {
        process.stdout.write(chalk.black.bgGreen.bold(' OK '))
        process.stdout.write('\n');

        console.log(chalk.white.bold('file downloaded, exiting...'));

        setTimeout(() => {
          process.exit(0);
        }, 1000);
      })
    });

    app.listen(9595, () => {
      process.stdout.write(chalk.black.bgGreen.bold(' OK '))
      process.stdout.write('\n\n');
    });
  }
}
