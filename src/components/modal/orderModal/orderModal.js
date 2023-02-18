import modalStyles from "../modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderImage from "../../../images/orderImage.svg";
import orderStyles from "./orderModal.module.css";
import React from "react";


export default function OrderModal({onClose})  {
    return(
        <div className={orderStyles.order_modal}>
            <a href='#' className={orderStyles.close_button} onClick={onClose}>
                <CloseIcon type="primary"/>
            </a>
            <div className={orderStyles.modal_content}>
                <section className={orderStyles.order_id}>
                    <h2 className={'text text_type_digits-large'}>034536</h2>
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
            </div>
        </div>
    )
}