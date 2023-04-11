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
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import HomePage from "../../pages/homePage/homePage";
import LoginPage from "../../pages/loginPage/loginPage";
import RegisterPage from "../../pages/registerPage/registerPage";
import ForgotPassword from "../../pages/forgot-password/forgotPassword";
import ResetPassword from "../../pages/reset-password/resetPassword";
import IngredientDetails from "../../pages/ingredientDetails/ingredientDetails";
import {orderReducer} from "../../services/reducers/orderReducer";
import ProfilePage from "../../pages/profile/profilePage";
import EditPage from "../../pages/profile/editPage/editPage";

export default function App() {

    const dataReducer = useSelector(state => {
        const {dataReducer} = state;
        return dataReducer;
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const modal = useSelector(state => {
        const {orderReducer} = state;
        return orderReducer;
    })
    const closeModals = () => {
        modal.isOpen ? dispatch(modalClose()) : navigate(-1);
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

    let location = useLocation();
    let state = location.state;

    const getCurrentIngredient = () => {
        if (data.length) {
            const current = data.find(el => {
                return location.pathname.includes(el._id);
            });
            return current;
        } else return null;
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
                        <Routes location={state?.background || location}>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/register' element={<RegisterPage/>}/>
                            <Route path='/forgot-password' element={<ForgotPassword/>}/>
                            <Route path='/reset-password' element={<ResetPassword/>}/>
                            <Route path='/ingredients/:_id' element={<IngredientDetails
                                ingredient={getCurrentIngredient()}/>} />
                            <Route path='/profile' element={<ProfilePage/>}>
                                <Route index element={<EditPage />} />
                            </Route>
                        </Routes>

                    </div>
                </main>

            }
            {
                getCurrentIngredient() && state?.background && (
                    <Routes>
                        <Route path='/ingredients/:_id' element={
                            <Modal onClose={closeModals}>
                                <IngredientsModal ingredient={getCurrentIngredient()} onClose={closeModals}/>
                            </Modal>
                        }/>
                    </Routes>
                )
            }

            {modal.isOpen &&
                <Modal onClose={closeModals}>

                    <OrderModal onClose={closeModals}></OrderModal>
                </Modal>
            }
        </>
    )
}
