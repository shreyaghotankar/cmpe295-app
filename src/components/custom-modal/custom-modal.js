import React  from "react";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal'
import styles from './custom-modal.module.scss';

function CustomModal (props) {
     const {
          show, onHide, children, hasCloseButton = true, modalStyle
     } = props;


     return (
          <Modal show={show} onHide={onHide} backdrop="static" dialogClassName={modalStyle ? modalStyle : styles.customSize} keyboard={false} contentClassName={styles.modal}>
               {hasCloseButton && <Modal.Header closeButton bsPrefix={`modal-header ${styles.modalHeader}`}/>}
               <Modal.Body>
                    <div className={styles.container} data-testid="modalContent">{children}</div>
               </Modal.Body>
          </Modal>

     )
}

CustomModal.propTypes = {
     children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node
     ]),
     hasCloseButton: PropTypes.bool,
     modalStyle: PropTypes.string,
     onHide: PropTypes.func,
     show: PropTypes.bool
}

export default CustomModal;