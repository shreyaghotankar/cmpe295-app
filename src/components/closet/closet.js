import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './closet.module.scss';

function Closet (props) {
    const {items} = props;

    return (
        <div>My Items: {items ? "Items are here" : "Loading it"}</div>
    )
}

Closet.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
}

export default Closet;