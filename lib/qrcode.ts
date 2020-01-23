import qrcode from 'qrcode-terminal';
import internalIp from 'internal-ip';

export default {
  async generate() {
    const ip = await internalIp.v4();
    process.stdout.write('\n');
    qrcode.generate(`http://${ip}:9595`, { small: true });
  }
}
