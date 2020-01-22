const banner = require('./banner');
const server = require('./server');
const qrcode = require('./qrcode');

(async() => {
  banner.display();

  await server.start();
  
  qrcode.generate();
})();
