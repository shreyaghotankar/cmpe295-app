import React  from "react";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import styles from './custom-modal.module.scss';

function CustomModal (props) {
     const {
          show, onHide, children, hasCloseButton = true
     } = props;


     return (
          <Modal show={show} onHide={onHide} backdrop="static" dialogClassName={styles.customSize} keyboard={false} contentClassName={styles.modal}>
               {hasCloseButton && <Modal.Header closeButton bsPrefix={`modal-header ${styles.modalHeader}`}/>}
               <Modal.Body>
                    <div className={styles.container}>{children}</div>
               </Modal.Body>
          </Modal>

     )
}

CustomModal.propTypes = {
     onHide: PropTypes.func,
     show: PropTypes.bool,
     hasCloseButton: PropTypes.bool,
     children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node
     ])
}

export default CustomModal;