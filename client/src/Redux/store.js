import { createStore } from 'redux'; //, applyMiddleware
//import thunk from 'redux-thunk';
import rootReducer from './Reducers'; // Ajusta la ruta según la ubicación de tus reducers

const store = createStore(
  rootReducer,
  //applyMiddleware(thunk)
);

export default store;
