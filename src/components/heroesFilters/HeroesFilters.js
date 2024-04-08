import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useHttp } from "../../hooks/http.hook";
import { filtersFetching, filtersFetched, filtersFetchingError, fetchFilteredHeroes } from "../../actions";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();
    const { filters, filtersLoadingStatus, heroes } = useSelector(state => state);

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
            
    // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">No filters</h5>
        }

        return arr.map(item => {
            switch (item) {
                case 'all':
                    return <button id={item} className="btn btn-outline-dark active">Все</button>;
                case 'fire':
                    return <button id={item} className="btn btn-danger">Огонь</button>;
                case 'water':
                    return <button id={item} className="btn btn-primary">Вода</button>
                case 'wind':
                    return <button id={item} className="btn btn-success">Ветер</button>;
                case 'earth':
                    return <button id={item} className="btn btn-secondary">Земля</button>;
                default: 
                    return item;
            }
        })
    }

    const elements = renderFilters(filters);
    
    const onActivateFilter = (target) => {
        for (let button of target.parentNode.childNodes) {
            button.classList.remove('active');
            if (button.id === target.id) {
                button.classList.add('active');
            }
        }

        if (target.id === 'all') {
            dispatch(fetchFilteredHeroes(heroes));
        } else {
            dispatch(fetchFilteredHeroes(heroes.filter(hero => hero.element === target.id)));
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group" onClick={(e) => onActivateFilter(e.target)}>
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
