import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import styles from './item-cart.module.scss';
import Button from 'react-bootstrap/Button';
import { BinIcon, PenIcon, ArrowIcon } from "../../shared/icons/icons";
import { getAttrName, ITEM_TYPE } from "../../shared/constants";
import { ItemsContext } from "../../shared/contexts/items-info";
import CustomModal from "../custom-modal/custom-modal";
import UpdateItem from "../update-item/update-item";

function ItemCart (props) {
     const {
          image, 
          attributes, 
          imageId,
          type,
     } = props;

     const [showAttr, setShowAttr] = useState(false);
     const [showUpdateModal, setShowUpdateModal] = useState(false);
     const [deletingItem, setDeletingItem] = useState(false);
     const { removeItem } = useContext(ItemsContext);
     const upper = type === ITEM_TYPE.UPPER;

     const imageStyle = image ? {
          backgroundImage: `url(${image})`
     } : {
          backgroundImage: `url('/defaultImg.png')`
     }

     const spinnerStyle= {
          height: `14px`,
          width: `14px`
     }
     const attrLength = Array.isArray(attributes) ? attributes.length : 0;
     const handleDelete = (e) =>{
          e.preventDefault();
          setDeletingItem(true);
          removeItem(imageId).then(() => console.log("done"));
     }

     return (
          <>
               <div className={styles.container}>
                    <div className={image ? styles.image : styles.noImage} style={imageStyle}>
                         <Button variant="icon" onClick={() => setShowUpdateModal(true)}><PenIcon /></Button>
                         <Button variant="icon" onClick={handleDelete}>{deletingItem ? <div style={spinnerStyle} className="spinner-border" role="status"></div> : <BinIcon />}</Button>
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
                         {showAttr && attrLength > 0 && <div className={`row ${styles.list}`}>
                              {attributes.map((attr, index) =>
                                   <span key={`item-attribute-${index}`} className={`col-auto ${styles.pill}`}>{getAttrName(upper, attr)}</span>
                              )}
                         </div>}
                    </div>
                    <Button variant="outfit">Generate Outfit</Button>
               </div>
               <CustomModal show={showUpdateModal} onHide={()=> setShowUpdateModal(false)}>
                    <UpdateItem image={image} imageId={imageId} attributes={attributes} type={type} cancelUpdate={() => setShowUpdateModal(false)} />
               </CustomModal>
          </>
     )
}

ItemCart.propTypes = {
     image: PropTypes.string,
     attributes: PropTypes.arrayOf(PropTypes.string),
     upper: PropTypes.bool
}

export default ItemCart;