import chalk from 'chalk';

function logError(message: string, exit = false) {
  console.log(chalk.redBright(message));

  if (exit) {
    process.exit(1);
  }
}

async function logProgress(message: string, promise: Promise<void>) {
  process.stdout.write(chalk.white.bold(`${message} `));

  try {
    await promise;
    process.stdout.write(chalk.black.bgGreen.bold(' OK '));
    process.stdout.write('\n');
  } catch (error) {
    process.stdout.write(chalk.black.bgRedBright.bold(' FAILED '));
    process.stdout.write('\n');

    if (error.message) {
      logError(error.message, error.exit);
    }
  }
}

export default {
  logError,
  logProgress
}
