import React from "react";
import overlayStyles from './modal-overlay.module.css';

export default function ModalOverlay({onClose}) {
    return (
        <div className={overlayStyles.overlay} onClick={onClose}></div>
    )
}