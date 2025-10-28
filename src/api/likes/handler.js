const autoBind = require('auto-bind').default;

class AlbumLikesHandler {
  constructor(albumLikesService, albumsService) {
    this._albumLikesService = albumLikesService;
    this._albumsService = albumsService;
    autoBind(this);
  }

  async postAlbumLikeHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._albumsService.getAlbumById(albumId);

    await this._albumLikesService.addAlbumLike(userId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album.',
    });
    response.code(201);
    return response;
  }

  async deleteAlbumLikeHandler(request) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._albumsService.getAlbumById(albumId);

    await this._albumLikesService.deleteAlbumLike(userId, albumId);

    return {
      status: 'success',
      message: 'Berhasil batal menyukai album.',
    };
  }

  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;

    await this._albumsService.getAlbumById(albumId);

    const { source, likes } = await this._albumLikesService.getAlbumLikesCount(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });

    if (source === 'cache') {
      response.header('X-Data-Source', 'cache');
    }
    return response;
  }
}

module.exports = AlbumLikesHandler;
