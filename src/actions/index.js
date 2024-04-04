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

export const heroDeleting = () => {
    return {
        type: 'HERO_DELETING'
    }
}

export const heroDeleted = (heroes) => {
    return {
        type: 'HERO_DELETED',
        payload: heroes
    }
}

export const heroDeletingError = () => {
    return {
        type: 'HERO_DELETING_ERROR'
    }
}

export const heroAdding = () => {
    return {
        type: 'HERO_ADDING'
    }
}

export const heroAdded = (heroes) => {
    return {
        type: 'HERO_ADDED',
        payload: heroes
    }
}

export const heroAddingError = () => {
    return {
        type: 'HERO_ADDING_ERROR'
    }
}
