// En el archivo reducers/index.js
import { combineReducers } from 'redux';
import { SEARCH_GAMES, FILTER_GAMES, SORT_GAMES, PAGINATE_GAMES } from './actions';

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
  currentPage: 1,
  genreFilter: '',
  sourceFilter: '',
  sortBy: '',
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_GAMES:
      // Manejar la búsqueda de videojuegos
      return { ...state, searchResults: action.payload, loading: false, error: null };
    case FILTER_GAMES:
      // Manejar el filtrado de videojuegos
      return { ...state, ...action.payload };
    case SORT_GAMES:
      // Manejar la ordenación de videojuegos
      return { ...state, sortBy: action.payload };
    case PAGINATE_GAMES:
      // Manejar la paginación de videojuegos
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  games: gameReducer,
  // Agrega más reducers según sea necesario
});

export default rootReducer;
