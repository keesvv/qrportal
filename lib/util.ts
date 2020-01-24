function exit(code: number, graceTime = 0) {
  setTimeout(() => {
    process.exit(code);
  }, graceTime);
}

export default {
  exit
}
