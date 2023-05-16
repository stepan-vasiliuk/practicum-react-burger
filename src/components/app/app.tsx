import React, {useEffect} from "react";
import appStyles from './app.module.css';
import Header from "../header/header";
import Modal from "../modal/modal";
import OrderDetails from "../modal/orderModal/orderDetails";
import IngredientDetails from "../modal/ingredientDetails/IngredientDetails";
import {checkUserAuth, ingredientsLoad } from "../../services/actions";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import HomePage from "../../pages/homePage/homePage";
import LoginPage from "../../pages/loginPage/loginPage";
import RegisterPage from "../../pages/registerPage/registerPage";
import ForgotPassword from "../../pages/forgot-password/forgotPassword";
import ResetPassword from "../../pages/reset-password/resetPassword";
import IngredientDetailsPage from "../../pages/ingredientDetailsPage/ingredientDetailsPage";
import ProfilePage from "../../pages/profile/profilePage";
import EditPage from "../../pages/profile/editPage/editPage";
import {OnlyAuth, OnlyUnAuth} from "../protectedRoute";
import NotFoundPage from "../../pages/notFoundPage/notFoundPage";
import OrderFeed from "../../pages/orderFeed/orderFeed";
import OrdersHistory from "../../pages/profile/ordersHistory/ordersHistory";
import {IIngredient} from "../../utils/types";
import {modalClose} from "../../services/actions/orderActions";
import {useTypedDispatch, useTypedSelector} from "../../hooks/hooks";

export default function App(): JSX.Element {


    const data: ReadonlyArray<IIngredient> | [] = useTypedSelector(state => state.dataReducer.data);

    const isLoading: boolean = useTypedSelector(state => state.dataReducer.isLoading);

    const hasError: boolean = useTypedSelector(state => state.dataReducer.hasError);

    const isModalOpen: boolean = useTypedSelector(state => state.orderReducer.isOpen);


    const navigate = useNavigate();
    const dispatch = useTypedDispatch();

    const closeModals = () => {
        isModalOpen ? dispatch(modalClose()) : navigate(-1);
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(ingredientsLoad())
    }, []);


    useEffect(() => {
        // @ts-ignore
        dispatch(checkUserAuth());
    }, [])


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
                            <Route path='/order-feed' element={<OrderFeed/>}/>
                            <Route path='/login' element={<OnlyUnAuth component={<LoginPage/>}/>}/>
                            <Route path='/register' element={<OnlyUnAuth component={<RegisterPage/>}/>}/>
                            <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword/>}/>}/>
                            <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword/>}/>}/>
                            {getCurrentIngredient() &&
                                <Route path='/ingredients/:_id' element={<IngredientDetailsPage
                                    ingredient={getCurrentIngredient()}/>}/>
                            }
                            <Route path='/profile' element={<OnlyAuth component={<ProfilePage/>} />}>
                                <Route index element={<EditPage/>}/>
                                <Route path='orders' element={<OrdersHistory/>}/>
                            </Route>
                            <Route path='/*' element={<NotFoundPage/>}/>
                        </Routes>

                    </div>
                </main>

            }
            {
                getCurrentIngredient() && state?.background && (
                    <Routes>
                        <Route path='/ingredients/:_id' element={
                            <Modal onClose={closeModals}>
                                <IngredientDetails ingredient={getCurrentIngredient()!}/>
                            </Modal>
                        }/>
                    </Routes>
                )
            }
            {isModalOpen &&
                <Modal onClose={closeModals}>
                    <OrderDetails/>
                </Modal>
            }
        </>
    )
}
