import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from "react-redux";
import { heroAdding, heroAdded, heroAddingError, fetchFilteredHeroes } from "../../actions";
import { useHttp } from '../../hooks/http.hook';
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const { heroes, heroesLoadingStatus, filters } = useSelector(state => state);
    const { request } = useHttp();
    const dispatch = useDispatch();

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const addHero = (data) => {
        dispatch(heroAdding());

        const newHero = {
            id: uuidv4(),
            name: data.name.value,
            description: data.text.value,
            element: data.element.value
        }

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(newHero => dispatch(heroAdded([...heroes, newHero])))
            .then(() => dispatch(fetchFilteredHeroes([...heroes, newHero])))
            .catch(() => dispatch(heroAddingError()));
    }

    const renderOptions = (arr) => {
        return arr.map(item => {
            switch (item) {
                case 'fire':
                    return <option value={item}>Огонь</option>;
                case 'water':
                    return <option value={item}>Вода</option>;
                case 'wind':
                    return <option value={item}>Ветер</option>;
                case 'earth':
                    return <option value={item}>Земля</option>;
                default: 
                    return <option>Я владею элементом...</option>;
            }
        })
    }

    const elements = renderOptions(filters);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => addHero(e.target)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control"
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
