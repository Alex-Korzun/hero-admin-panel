const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    filteredHeroes: []
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
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HERO_DELETED':
            return {
                ...state,
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_DELETING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_ADDING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HERO_ADDED':
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                heroes: action.payload
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
        case 'FETCH_FILTERED_HEROES':
            return {
                ...state,
                filteredHeroes: action.payload
            }
        default: 
            return state;
    }
}

export default reducer;
