import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

// Initial state using Entity Adapter
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

// Creating action creators to work with Promises.
export const fetchHeroes = createAsyncThunk(
    'heroes/fecthHeroes',
    () => {
        const { request } = useHttp();
        return request('http://localhost:3001/heroes');
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroDeleted: (state, action) => {heroesAdapter.removeOne(state, action.payload)},
        heroDeletingError: state => {state.heroesLoadingStatus = 'error'},
        heroAdded: (state, action) => {heroesAdapter.addOne(state, action.payload)},
        heroAddingError: state => {state.heroesLoadingStatus = 'error'}
    },
    // Extra reducers for actions, created with createAsyncThunk, because they are not included into default reducers above.
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (activeFilter, heroes) => {
        if (activeFilter === 'all') {
            return heroes;
        } else {
            return heroes.filter(item => item.element === activeFilter);
        }
    }
);

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDeleted,
    heroDeletingError,
    heroAdded,
    heroAddingError
} = actions;
