import banner from './banner';
import server from './server';
import qrcode from './qrcode';

(async() => {
  banner.display();

  await server.start();
  
  qrcode.generate();
})();
