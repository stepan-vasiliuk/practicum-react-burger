import React from "react";
import appStyles from './app.module.css';
import Header from "../header/header";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import Modal from "../modal/modal";
import OrderModal from "../modal/orderModal/orderModal";
import IngredientsModal from "../modal/ingredientsModal/ingredientsModal";

export default function App() {
    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    })
    const [orderModal, setOrderModal] = React.useState({isOpened: false});
    const [ingredientsModal, setIngredientsModal] = React.useState({
        isOpened: false,
        ingredient: null
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

    const handleOrderButtonClick = () => {
        setOrderModal({isOpened: true});
    }

    const onClose = () => {
        setOrderModal({isOpened: false});
        setIngredientsModal({...ingredientsModal, isOpened: false})
    }

    const handleIngredientClick = (data) => {
        setIngredientsModal({isOpened: true, ingredient: data})
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

                <main className={appStyles.main}>
                    <div className="container-wrapper">

                        <div className={appStyles.container_grid}>
                            <BurgerIngredients data={data}
                                               onIngredientClick={handleIngredientClick}/>
                            <BurgerConstructor onButtonClick={handleOrderButtonClick}/>
                        </div>
                    </div>
                </main>
            }
            {orderModal.isOpened &&
                <Modal onClose={onClose}>
                    <OrderModal onClose={onClose}></OrderModal>
                </Modal>}
            {ingredientsModal.isOpened &&
                <Modal onClose={onClose}>
                    <IngredientsModal
                        ingredient={ingredientsModal.ingredient}
                        onClose={onClose}></IngredientsModal>
                </Modal>
            }
        </>
    )
}
