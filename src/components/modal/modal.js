import React, {useEffect} from "react";
import ReactDOM, {createPortal} from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalsRoot = document.getElementById('modals');

export default function Modal({onClose, children}) {


    useEffect(() => {
        document.addEventListener('keydown', handleEscButton);
        return () => {
            document.removeEventListener('keydown', handleEscButton);
        }
    }, [])

    const handleEscButton = (e) => {
        e.key === 'Escape' && onClose();
    }

    return createPortal(
        (
            <>
                <div className={modalStyles.modal}>
                    <a href='#' className={modalStyles.close_button} onClick={onClose}>
                        <CloseIcon type='primary'/>
                    </a>
                    {children}
                </div>
                <ModalOverlay onClose={onClose}/>
            </>
        ),
        modalsRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}