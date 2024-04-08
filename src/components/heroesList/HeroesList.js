import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';
import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleting, heroDeleted, heroDeletingError, fetchFilteredHeroes } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const { heroesLoadingStatus, filteredHeroes } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const fetchHeroes = () => {
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .then(data => dispatch(fetchFilteredHeroes(data.payload)))
            .catch(() => dispatch(heroesFetchingError()));
    }

    useEffect(() => {
        dispatch(heroesFetching());
        fetchHeroes();

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(hero => {
            return <HeroesListItem key={hero.id} {...hero} onDelete={onDelete} />
        })
    }

    const onDelete = (id) => {
        dispatch(heroDeleting());
        
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => dispatch(heroDeleted()))
            .then(() => fetchHeroes())
            .catch(() => dispatch(heroDeletingError()));
    }

    const elements = renderHeroesList(filteredHeroes);

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
