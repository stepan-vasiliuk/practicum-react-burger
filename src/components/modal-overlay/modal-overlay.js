import React from "react";
import overlayStyles from './modal-overlay.module.css';

export default function ModalOverlay() {
    return (
        <div className={overlayStyles.overlay}></div>
    )
}