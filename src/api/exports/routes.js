const routes = (handler) => ([
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: handler.postExportPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt', // Kriteria 1: Membutuhkan autentikasi
    },
  },
]);

module.exports = routes;
