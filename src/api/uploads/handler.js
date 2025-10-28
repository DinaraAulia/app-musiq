const autoBind = require('auto-bind').default;

class UploadsHandler {
  constructor(storageService, albumsService, validator) {
    this._storageService = storageService;
    this._albumsService = albumsService;
    this._validator = validator;
    autoBind(this);
  }

  async postAlbumCoverHandler(request, h) {
    const { cover } = request.payload;
    const { id: albumId } = request.params;

    this._validator.validateImageHeaders(cover.hapi.headers);

    const oldFilename = await this._albumsService.getAlbumCoverFilename(albumId);
    const filename = await this._storageService.writeFile(cover, cover.hapi);

    await this._albumsService.updateAlbumCover(albumId, filename);

    if (oldFilename) {
      await this._storageService.deleteFile(oldFilename);
    }

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
