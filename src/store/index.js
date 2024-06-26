import { configureStore } from '@reduxjs/toolkit';

import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action);
}

// Creating store without Redux Toolkit

// const store = createStore(
//                     combineReducers({filtersReducer, heroesReducer}),
//                     compose(applyMiddleware(thunk, stringMiddleware),
//                      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//                     );

const store = configureStore({
    reducer: {filters, heroes},
            middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
            devTools: process.env.NODE_ENV !== 'production'
});

export default store;
