const chalk = require('chalk');

module.exports = {
  async logProgress(message, promise) {
    process.stdout.write(chalk.white.bold(`${message} `));

    try {
      await promise;
      process.stdout.write(chalk.black.bgGreen.bold(' OK '));
      process.stdout.write('\n');
    } catch (error) {
      process.stdout.write(chalk.black.bgRedBright.bold(' FAILED '));
      process.stdout.write('\n');

      if (error.message) {
        console.log(chalk.redBright(error.message));
      }

      if (error.exit) {
        process.exit(1);
      }
    }
  }
}
