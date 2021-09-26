import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './empty-closet.module.scss';
import {HangerIcon} from '../../../../shared/icons/icons'
import { Button } from "react-bootstrap";

function EmptyCloset (props) {
    const {onClick} = props;
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <HangerIcon />
            </div>
            <div className={styles.header}>Nothing in your closet yet!</div>
            <p className={styles.text}>
            We noticed that you haven’t added any clothing items yet.
            This information is essential for outfit generation. 
            Take pictures of your clothes and upload them so we can create outfit suggectoins
            </p>
            <Button variant="op" onClick={onClick}>Upload new item</Button>
        </div>
        
        
    )
}

EmptyCloset.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default EmptyCloset;