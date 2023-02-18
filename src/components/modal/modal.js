import React from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

const modalsRoot = document.getElementById('modals');

export default function Modal({onClose, children}) {

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
                    {children}
                </div>
                <ModalOverlay/>
            </>
        ),
        modalsRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}