import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from './item-cart.module.scss';
import Button from 'react-bootstrap/Button';
import { BinIcon, PenIcon, ArrowIcon } from "../../shared/icons/icons";
import { getAttrName } from "../../shared/constants";

function ItemCart (props) {
    const {
        image, 
        attributes, 
        upper = true,
    } = props;

    const [showAttr, setShowAttr] = useState(false);

    const imageStyle = image ? {
        backgroundImage: `url(${image})`
    } : {
        backgroundImage: `url('/defaultImg.png')`
    }

    const attrLength = Array.isArray(attributes) ? attributes.length : 0;

    return (
        <div className={styles.container}>
            <div className={image ? styles.image : styles.noImage} style={imageStyle}>
                <Button variant="icon"><PenIcon /></Button>
                <Button variant="icon"><BinIcon /></Button>
            </div>
            <div className={styles.attributes}>
                <div className={styles.header}>
                    Attributes
                    <span className="px-1">({attrLength})</span>
                    <Button 
                        className="ms-auto" 
                        variant="toggle"
                        onClick={()=>setShowAttr(!showAttr)}
                        >
                        <ArrowIcon className={showAttr ? '': `${styles.toggle}`}/>
                    </Button>
                </div>
                {showAttr && attrLength > 0 && <div className={styles.list}>
                    {attributes.map((attr) =>
                        <span className={styles.pill}>{getAttrName(upper, attr)}</span>
                    )}
                </div>}
            </div>
            <Button variant="outfit">Generate Outfit</Button>
        </div>
    )
}

ItemCart.propTypes = {
    image: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.string),
    upper: PropTypes.bool
}

export default ItemCart;