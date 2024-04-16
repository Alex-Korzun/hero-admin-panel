import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filtersReducer';
import heroesReducer from '../reducers/heroesReducer';

const store = createStore(combineReducers({filtersReducer, heroesReducer}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
