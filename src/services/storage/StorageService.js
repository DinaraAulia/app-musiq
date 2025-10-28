const fs = require('fs');
const path = require('path');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    const targetPath = path.join(this._folder, filename);

    const fileStream = fs.createWriteStream(targetPath);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }

  deleteFile(filename) {
    const targetPath = `${this._folder}${filename}`;
    if (fs.existsSync(targetPath)) {
      return fs.unlinkSync(targetPath);
    }
    return undefined;
  }
}

module.exports = StorageService;
