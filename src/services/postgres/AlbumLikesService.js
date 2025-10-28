const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addAlbumLike(userId, albumId) {
    const checkQuery = {
      text: 'SELECT 1 FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const checkResult = await this._pool.query(checkQuery);

    if (checkResult.rows.length) {
      throw new InvariantError('Anda sudah menyukai album ini.');
    }

    const albumQuery = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId],
    };
    const albumResult = await this._pool.query(albumQuery);

    if (!albumResult.rows.length) {
      throw new NotFoundError('Album tidak ditemukan.');
    }

    const insertQuery = {
      text: 'INSERT INTO user_album_likes (user_id, album_id) VALUES($1, $2)',
      values: [userId, albumId],
    };

    await this._pool.query(insertQuery);
    await this._cacheService.delete(`album-likes:${albumId}`);
  }

  async deleteAlbumLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING user_id',
      values: [userId, albumId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Anda belum menyukai album ini.');
    }

    await this._cacheService.delete(`album-likes:${albumId}`);
  }

  async getAlbumLikesCount(albumId) {
    const key = `album-likes:${albumId}`;
    try {
      const result = await this._cacheService.get(key);
      const likes = JSON.parse(result);

      return {
        source: 'cache',
        likes: Number(likes),
      };
    } catch (error) {
      const query = {
        text: 'SELECT COUNT(*) FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };

      const result = await this._pool.query(query);
      const { count } = result.rows[0];

      if (count === 0) {
        const albumCheckQuery = { text: 'SELECT 1 FROM albums WHERE id = $1', values: [albumId] };
        const albumCheckResult = await this._pool.query(albumCheckQuery);
        if (!albumCheckResult.rows.length) {
          throw new NotFoundError('Album tidak ditemukan');
        }
      }

      await this._cacheService.set(key, count.toString());

      return {
        source: 'database',
        likes: Number(count),
      };
    }
  }
}

module.exports = AlbumLikesService;
