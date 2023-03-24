import React from "react";
import overlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

export default function ModalOverlay({onClose}) {
    return (
        <div className={overlayStyles.overlay} onClick={onClose}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
}