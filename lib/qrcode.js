const qrcode = require('qrcode-terminal');
const internalIp = require('internal-ip');

module.exports = {
  async generate() {
    const ip = await internalIp.v4();
    process.stdout.write('\n');
    qrcode.generate(`http://${ip}:9595`, { small: true });
  }
}
