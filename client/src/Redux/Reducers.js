import { combineReducers } from 'redux';
import { SEARCH_GAMES, FILTER_BY_GENRE, FILTER_BY_ORIGIN, SORT_GAMES, PAGINATE_GAMES } from './actions';

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
  currentPage: 1,
  genreFilter: '',
  sourceFilter: '',
  sortBy: '',
  selectedGenre: '',
  selectedOrigin: '',
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_GENRE:
      return { ...state, selectedGenre: action.payload };
    case FILTER_BY_ORIGIN:
      return { ...state, selectedOrigin: action.payload };
    case SEARCH_GAMES:
      return { ...state, searchResults: action.payload, loading: false, error: null };
    case SORT_GAMES:
      return { ...state, sortBy: action.payload };
    case PAGINATE_GAMES:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  games: gameReducer,
});

export default rootReducer;
