export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleting = () => {
    return {
        type: 'HEROES_DELETING'
    }
}

export const heroesDeleted = (heroes) => {
    console.log(heroes);
    return {
        type: 'HEROES_DELETED',
        payload: heroes
    }
}

export const heroesDeletingError = () => {
    return {
        type: 'HEROES_DELETEING_ERROR'
    }
}
