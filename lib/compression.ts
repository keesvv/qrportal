import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import streamBuffers from 'stream-buffers';

export default {
  async compressFile(filePath: string) {
    const fileName = path.basename(filePath);

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      archive.file(filePath, { name: fileName });
    } else if (stat.isDirectory()) {
      archive.directory(filePath, fileName);
    } else {
      throw new Error('Unsupported');
    }

    const buffer = new streamBuffers.WritableStreamBuffer();
    archive.pipe(buffer);

    await archive.finalize();
    return buffer.getContents();
  }
}
