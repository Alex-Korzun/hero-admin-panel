const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    filteredHeroes: [],
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                                action.payload :
                                action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const newHeroListForDeletion = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroListForDeletion,
                filteredHeroes: state.activeFilter === 'all' ?
                                newHeroListForDeletion :
                                newHeroListForDeletion.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_DELETING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_ADDED':
            const newHeroListForAdding = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroListForAdding,
                filteredHeroes: state.activeFilter === 'all' ?
                                newHeroListForAdding :
                                newHeroListForAdding.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_ADDING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
            }
        default: 
            return state;
    }
}

export default reducer;
