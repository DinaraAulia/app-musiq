const mapSongToPlaylistModel = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

const mapPlaylistToModel = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

const mapAlbumToModel = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year,
});

const mapSongToDetailModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

module.exports = {
  mapSongToPlaylistModel,
  mapPlaylistToModel,
  mapAlbumToModel,
  mapSongToDetailModel,
};
