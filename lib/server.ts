import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import express from 'express';
import logger from './logger';
import util from './util';

const args = process.argv.slice(2);

export default {
  async start() {
    const app = express();
    let fileName: string;
    let filePath: string;
    let fileContent: Buffer;

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
