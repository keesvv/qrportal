module.exports = {
  exit(code, graceTime = 0) {
    setTimeout(() => {
      process.exit(code);
    }, graceTime);
  }
}
