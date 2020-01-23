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
    let filePath;
    let fileContent;

    app.get('/', async (req, res) => {
      res.attachment(fileName);

      await logger.logProgress('downloading file...', new Promise((resolve, reject) => {
        res.send(fileContent);
        req.on('end', () => {
          resolve();
        });
      }));

      console.log(chalk.white.bold('file downloaded, exiting...'));
  
      util.exit(0, 1000);
    });

    await logger.logProgress('starting server...', new Promise((resolve, reject) => {
      if (!args.length || !fs.existsSync(args[0])) {
        if (!args.length) {
          reject({ exit: true, message: 'Please specify one or more input files.' });
        } else if (!fs.existsSync(args[0])) {
          reject({ exit: true, message: 'One or more files do not exist.' });
        }
      }

      filePath = path.resolve(args[0]);
      fileName = path.basename(filePath);
      fileContent = fs.readFileSync(filePath);

      app.listen(9595, () => {
        resolve();
      });
    }));
  }
}
