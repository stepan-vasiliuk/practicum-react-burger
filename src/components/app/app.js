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

export default function App() {

    const dataReducer = useSelector(state => {
        const {dataReducer} = state;
        console.log(`Data was successfully loaded>>`, dataReducer.data)
        return dataReducer;
    })

    const dispatch = useDispatch();

    const ingrModal = useSelector(state => {
        const {modalReducer} = state;
        return modalReducer;
    })
    const closeModals = () => {
        dispatch(modalClose());
    }

    useEffect(() => {
        dispatch(ingredientsLoad())
    }, []);


    const [orderModal, setOrderModal] = useState({isOpened: false});
    const [ingredientsModal, setIngredientsModal] = useState({
        isOpened: false,
        ingredient: null
    })

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
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </div>
                    </div>
                </main>
            }
            {ingrModal.isOpen &&
                <Modal onClose={closeModals}>
                    {ingrModal.ingredient ?
                        <IngredientsModal
                            ingredient={ingrModal.ingredient}
                            onClose={closeModals}>
                        </IngredientsModal>
                        : <OrderModal onClose={closeModals}></OrderModal>
                    }
                </Modal>
            }
        </>
    )
}
