import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroDeleted: (state, action) => {state.heroes.filter(item => item.id !== action.payload)},
        heroDeletingError: state => {state.heroesLoadingStatus = 'error'},
        heroAdded: (state, action) => {state.heroes.push(action.payload)},
        heroAddingError: state => {state.heroesLoadingStatus = 'error'}
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
