import React, { useState } from "react";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import styles from './custom-modal.module.scss';

function CustomModal (props) {
    const {
        show, onHide, children
    } = props;


    return (
        <Modal show={show} onHide={onHide} backdrop="static" size="lg" keyboard={false} dialogClassName={styles.modal}>
            <Modal.Header closeButton bsPrefix={`modal-header ${styles.modalHeader}`}/>
            <Modal.Body>
                <div className={styles.container}>{children}</div>
            </Modal.Body>
        </Modal>

    )
}

CustomModal.propTypes = {
    onHide: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default CustomModal;