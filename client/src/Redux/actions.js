// En el archivo actions/index.js
export const SEARCH_GAMES = 'SEARCH_GAMES';
export const FILTER_GAMES = 'FILTER_GAMES';
export const SORT_GAMES = 'SORT_GAMES';
export const PAGINATE_GAMES = 'PAGINATE_GAMES';

export const searchGames = (searchResults) => ({
  type: SEARCH_GAMES,
  payload: searchResults,
});

export const filterGames = (filters) => ({
  type: FILTER_GAMES,
  payload: filters,
});

export const sortGames = (sortBy) => ({
  type: SORT_GAMES,
  payload: sortBy,
});

export const paginateGames = (page) => ({
  type: PAGINATE_GAMES,
  payload: page,
});
