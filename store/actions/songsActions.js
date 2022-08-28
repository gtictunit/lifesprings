export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE';

export const toggleFavourite = (id, gid, uid) => {
  return {type: TOGGLE_FAVOURITE, songId: id, userId: uid, genreId: gid};
};
