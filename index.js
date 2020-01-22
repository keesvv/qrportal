const banner = require('./lib/banner');
const server = require('./lib/server');
const qrcode = require('./lib/qrcode');

(async() => {
  banner.display();

  await server.start();
  
  qrcode.generate();
})();
