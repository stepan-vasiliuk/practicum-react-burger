import modalStyles from "../modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderImage from "../../../images/orderImage.svg";
import orderStyles from "./orderModal.module.css";
import React from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";


export default function OrderModal({onClose}) {

    const orderNumber = useSelector(state => state.orderReducer.orderNumber);
    const hasError = useSelector(state => state.orderReducer.hasError);
    const isLoading = useSelector(state => state.orderReducer.isLoading);

    return (
        <div className={orderStyles.order_modal}>
            <a href='#' className={orderStyles.close_button} onClick={onClose}>
                <CloseIcon type="primary"/>
            </a>

            <div className={orderStyles.modal_content}>
                {orderNumber && !hasError && !isLoading &&
                    <>
                        <section className={orderStyles.order_id}>
                            <h2 className={'text text_type_digits-large'}>{orderNumber}</h2>
                            <p className={'text text_type_main-medium'}>Идентификатор заказа</p>
                        </section>
                        <img className={orderStyles.order_image} src={orderImage}>
                        </img>
                        <section className={orderStyles.order_description}>
                            <p className={'text text_type_main-default'}>
                                Ваш заказ начали готовить
                            </p>
                            <p className={`text text_type_main-default text_color_inactive`}>
                                Дождитесь готовности на орбитальной станции
                            </p>
                        </section>
                    </>
                }
                {isLoading &&
                    <>
                        <section className={orderStyles.order_id}>
                            <p className={'text text_type_main-medium'}>Загрузка данных</p>
                        </section>
                        <span className={orderStyles.loader}></span>
                    </>
                }
                {hasError &&
                    <>
                        <section className={orderStyles.order_id}>
                            <h2 className={'text text_type_main-large'}>Ой</h2>
                            <p className={'text text_type_main-medium'}>Что-то пошло не так..</p>
                        </section>
                    </>
                }
            </div>
        </div>
    )
}

OrderModal.propTypes = {
    onClose: PropTypes.func.isRequired,
}