import React from "react";
import appStyles from './app.module.css';
import Header from "../header/header";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import MainSection from "../main/main";

export default function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    })

    React.useEffect(() => {
        getIngredients()
    }, [])


    const URL = 'https://norma.nomoreparties.space/api/ingredients';

    const getIngredients = () => {
        setState({...state, hasError: false, isLoading: true});
        fetch(URL)
            .then(res => res.json())
            .then(data => setState({...state, isLoading: false, data: data.data}))
            .catch(e => setState({isLoading: false, hasError: true, ...state}))
    }

    const handleError = () => {
        alert('Ошибка при загрузке данных с сервера')
    }

    const handleIsLoading = () => {
        console.log('Загрузка данных с сервера')
    }

    const {data, isLoading, hasError} = state;
    return (
        <>
            <Header/>
            {isLoading && handleIsLoading()}
            {hasError && handleError()}
            {!isLoading &&
                !hasError &&
                data.length &&
                <MainSection
                    data={data}/>
            }
        </>
    )
}
