import React, {useState, useEffect} from "react";
import appStyles from './app.module.css';
import Header from "../header/header";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import Modal from "../modal/modal";
import OrderModal from "../modal/orderModal/orderModal";
import IngredientsModal from "../modal/ingredientsModal/ingredientsModal";
import {useDispatch, useSelector} from "react-redux";
import {ingredientsLoad, modalClose} from "../../services/actions";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export default function App() {

    const dataReducer = useSelector(state => {
        const {dataReducer} = state;
        return dataReducer;
    })

    const dispatch = useDispatch();

    const modal = useSelector(state => {
        const {modalReducer} = state;
        return modalReducer;
    })
    const closeModals = () => {
        dispatch(modalClose());
    }

    useEffect(() => {
        dispatch(ingredientsLoad())
    }, []);


    const handleError = () => {
        alert('Ошибка при загрузке данных с сервера')
    }

    const handleIsLoading = () => {
        console.log('Загрузка данных с сервера')
    }


    const {data, hasError, isLoading} = dataReducer;

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
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients/>
                                <BurgerConstructor/>
                            </DndProvider>
                        </div>
                    </div>
                </main>
            }
            {modal.isOpen &&
                <Modal onClose={closeModals}>
                    {modal.ingredient ?
                        <IngredientsModal
                            ingredient={modal.ingredient}
                            onClose={closeModals}>
                        </IngredientsModal>
                        : <OrderModal onClose={closeModals}></OrderModal>
                    }
                </Modal>
            }
        </>
    )
}
