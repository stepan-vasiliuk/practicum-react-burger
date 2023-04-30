import React from "react";
import overlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

type TModalOverlayProps = {
    onClose: () => void;
}
export default function ModalOverlay({onClose} : TModalOverlayProps): JSX.Element {
    return (
        <div className={overlayStyles.overlay} onClick={onClose}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
}