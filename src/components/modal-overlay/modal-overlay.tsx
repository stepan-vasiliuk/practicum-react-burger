import React from "react";
import overlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
    onClose: () => void;
}
export default function ModalOverlay({onClose} : TModalOverlayProps): JSX.Element {
    return (
        <div className={overlayStyles.overlay} onClick={onClose}></div>
    )
}