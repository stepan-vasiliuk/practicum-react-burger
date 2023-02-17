import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderImage from "../../images/orderImage.svg";

const modalsRoot = document.getElementById('modals');

export default function Modal({onClose}) {

    React.useEffect(() => {
        document.addEventListener('keydown', handleEscButton);
        return () => {
            document.removeEventListener('keydown', handleEscButton);
        }
    }, [])


    const handleEscButton = (e) => {
        e.key === 'Escape' && onClose();
    }


    return ReactDOM.createPortal(
        (
            <>
                <div className={modalStyles.modal}>
                    <a href='#' className={modalStyles.close_button} onClick={onClose}>
                        <CloseIcon type="primary"/>
                    </a>
                    <div className={modalStyles.modal_content}>
                        <section className={modalStyles.order_id}>
                            <h2 className={'text text_type_digits-large'}>034536</h2>
                            <p className={'text text_type_main-medium'}>Идентификатор заказа</p>
                        </section>
                        <img className={modalStyles.order_image} src={orderImage}>
                        </img>
                        <section className={modalStyles.order_description}>
                            <p className={'text text_type_main-default'}>
                                Ваш заказ начали готовить
                            </p>
                            <p className={`text text_type_main-default text_color_inactive`}>
                                Дождитесь готовности на орбитальной станции
                            </p>
                        </section>
                    </div>
                </div>
                <ModalOverlay/>
            </>
        ),
        modalsRoot
    );
}