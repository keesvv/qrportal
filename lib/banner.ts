import chalk from 'chalk';
import { version } from '../package.json';

export default {
  display() {
    console.log();
    
    // Display version
    console.log(`${chalk.white.bold('qrportal version')} ${chalk.black.bgGreen.bold(` ${version} `)}`);

    // Credits
    console.log(`${chalk.white.bold('another project by')} ${chalk.cyanBright('Kees van Voorthuizen')}`);

    console.log();
  }
}
