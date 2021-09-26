import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { SECTIONS } from "../../shared/constants";
import styles from './section.module.scss';
import { HangerIcon } from "../../shared/icons/icons";

function Section (props) {
    const {
        section, 
        children
    } = props;

    const [icon, setIcon] = useState(null)

    useEffect(() => {
        if (section === SECTIONS.CLOSET) {
            setIcon(<HangerIcon />);
        } else if (section === SECTIONS.OUTFITS) {
            setIcon(null);
        }
    }, [section])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.icon}>{icon}</span>
                <span>{section}</span>
            </div>
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