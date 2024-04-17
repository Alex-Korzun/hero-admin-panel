import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import filtersReducer from '../reducers/filtersReducer';
import heroesReducer from '../reducers/heroesReducer';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

const store = createStore(
                    combineReducers({filtersReducer, heroesReducer}),
                    compose(applyMiddleware(thunk, stringMiddleware),
                     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
                    );

export default store;
