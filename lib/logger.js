const chalk = require('chalk');

module.exports = {
  logProgress(message, callback) {
    process.stdout.write(chalk.white.bold(`${message} `));
  }
}
