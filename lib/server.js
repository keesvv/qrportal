const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const logger = require('./logger');
const util = require('./util');

const args = process.argv.slice(2);

module.exports = {
  async start() {
    const app = new express();
    let fileName;

    await logger.logProgress('starting server...', new Promise((resolve, reject) => {
      if (!fileName || !fs.existsSync(args[0])) {
        if (!args.length) {
          reject({ exit: true, message: 'Please specify one or more input files.' });
        } else if (!fs.existsSync(args[0])) {
          reject({ exit: true, message: 'One or more files do not exist.' });
        }
      }
    }));
    
    fileName = path.basename(args[0]);
    
    app.get('/', async (req, res) => {
      res.attachment(fileName);
      res.sendFile(args[0]);

      await logger.logProgress('downloading file...', new Promise((resolve, reject) => {
        req.on('end', () => {
          resolve();
        });
      }));

      console.log(chalk.white.bold('file downloaded, exiting...'));
  
      util.exit(0, 1000);
    });

    app.listen(9595, () => {
      process.stdout.write(chalk.black.bgGreen.bold(' OK '))
      process.stdout.write('\n\n');
    });
  }
}
