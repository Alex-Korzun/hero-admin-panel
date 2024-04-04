const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
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
                heroesLoadingStatus: 'idle',
                heroes: action.payload
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
        default: 
            return state;
    }
}

export default reducer;
