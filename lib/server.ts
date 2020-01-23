import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import express from 'express';
import logger from './logger';
import util from './util';
import compression from './compression';
import moment from 'moment';

const args = process.argv.slice(2);

export default {
  async start() {
    const app = express();
    let filePath: string;
    let fileContent: Buffer | boolean;
  
    if (!args.length) {
      logger.logError('Please specify one or more input files.', true)
    }

    if (!fs.existsSync(args[0])) {
      logger.logError('The file/folder you provided does not exist.', true)
    }

    await logger.logProgress('compressing files...', new Promise(async (resolve, reject) => {
      try {
        filePath = path.resolve(args[0]);
        fileContent = await compression.compressFile(filePath);
        resolve();
      } catch (error) {
        reject(error);
      }
    }));

    await logger.logProgress('starting server...', new Promise((resolve, reject) => {
      app.get('/', async (req, res) => {
        res.attachment(`qrportal_${moment().format('YYYY-MM-DD_HH.mm.ss')}.zip`);
  
        await logger.logProgress('downloading file...', new Promise((resolve, reject) => {
          res.send(fileContent);
          req.on('end', () => {
            resolve();
          });
        }));
  
        console.log(chalk.white.bold('file downloaded, exiting...'));
    
        util.exit(0, 1000);
      });

      app.listen(9595, () => {
        resolve();
      });
    }));
  }
}
