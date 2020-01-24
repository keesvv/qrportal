import archiver from 'archiver';
import fs from 'fs';
import path from 'path';
import streamBuffers from 'stream-buffers';

async function compress(filePaths: string[]) {
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  filePaths.forEach((filePath) => {
    const fileName = path.basename(filePath);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      archive.file(filePath, { name: fileName });
    } else if (stat.isDirectory()) {
      archive.directory(filePath, fileName);
    } else {
      throw { exit: true, message: 'This input type is unsupported.' };
    }
  });

  const buffer = new streamBuffers.WritableStreamBuffer();
  archive.pipe(buffer);

  await archive.finalize();
  return buffer.getContents();
}

export default {
  compress
}
