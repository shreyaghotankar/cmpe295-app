import React from "react";
import PropTypes from 'prop-types';
import { SECTIONS } from "../../shared/constants";
import styles from './section.module.scss';
import { HangerIcon } from "../../shared/icons/icons";

function Section (props) {
    const {
        section, 
        children
    } = props;

    return (
        <div className={styles.container}>
            <div className={styles.header}>{section}</div>
            
            <div>
                {children}
            </div>
        </div>
    )
}

Section.propTypes = {
    header: PropTypes.string,
    side: PropTypes.string, 
    section: PropTypes.string
}

export default Section;