import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './empty-closet.module.scss';
import {HangerIcon} from '../../../../shared/icons/icons'
import { Row, Col } from "react-bootstrap";

function EmptyCloset () {
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <HangerIcon />
            </div>
            <div className={styles.header}>Nothing in your closet yet!</div>
            <p className={styles.text}>
            We noticed that you haven’t added any clothing items yet.
            </p>
            <button>Upload new item</button>
        </div>
        
        
    )
}

EmptyCloset.propTypes = {

}

export default EmptyCloset;