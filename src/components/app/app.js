import React, {useState, useEffect} from "react";
import appStyles from './app.module.css';
import Header from "../header/header";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import Modal from "../modal/modal";
import OrderModal from "../modal/orderModal/orderModal";
import IngredientsModal from "../modal/ingredientsModal/ingredientsModal";

export default function App() {
    const [ingredientsData, setIngredientsData] = useState({
        isLoading: false,
        hasError: false,
        data: []
    })
    const [orderModal, setOrderModal] = useState({isOpened: false});
    const [ingredientsModal, setIngredientsModal] = useState({
        isOpened: false,
        ingredient: null
    })


    useEffect(() => {
        getIngredients()
    }, [])


    const URL = 'https://norma.nomoreparties.space/api/ingredients';

    const getIngredients = () => {
        setIngredientsData({...ingredientsData, hasError: false, isLoading: true});
        fetch(URL)
            .then(res => res.json())
            .then(data => setIngredientsData({...ingredientsData, isLoading: false, data: data.data}))
            .catch(e => setIngredientsData({isLoading: false, hasError: true, ...ingredientsData}))
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

    const handleIngredientClick = (ingredient) => {
        setIngredientsModal({isOpened: true, ingredient: ingredient})
    }


    const {data, isLoading, hasError} = ingredientsData;
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
                            <BurgerIngredients
                                ingredientArray={data}
                                onIngredientClick={handleIngredientClick}/>
                            <BurgerConstructor
                                ingredientsArray={data}
                                onButtonClick={handleOrderButtonClick}/>
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
