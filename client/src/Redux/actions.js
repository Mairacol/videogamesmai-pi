export const SEARCH_GAMES = 'SEARCH_GAMES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SORT_GAMES = 'SORT_GAMES';
export const PAGINATE_GAMES = 'PAGINATE_GAMES';
export const SET_RATING = 'SET_RATING';

export const searchGames = (searchResults) => ({
  type: SEARCH_GAMES,
  payload: searchResults,
});

export const filterByGenre = (genre) => ({
  type: FILTER_BY_GENRE,
  payload: genre,
});

export const filterByOrigin = (origin) => ({
  type: FILTER_BY_ORIGIN,
  payload: origin,
});

export const sortGames = (sortBy) => ({
  type: SORT_GAMES,
  payload: sortBy,
});

export const paginateGames = (page) => ({
  type: PAGINATE_GAMES,
  payload: page,
});

export const setRating = (id, rating) => ({
  type: SET_RATING,
  payload: { id, rating },
});
