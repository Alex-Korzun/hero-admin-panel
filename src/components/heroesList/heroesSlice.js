import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

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
        heroDeleted: (state, action) => {state.heroes.filter(item => item.id !== action.payload)},
        heroDeletingError: state => {state.heroesLoadingStatus = 'error'},
        heroAdded: (state, action) => {state.heroes.push(action.payload)},
        heroAddingError: state => {state.heroesLoadingStatus = 'error'}
    },
    // Extra reducers for actions, created with createAsyncThunk, because they are not included into default reducers above.
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDeleted,
    heroDeletingError,
    heroAdded,
    heroAddingError
} = actions;
