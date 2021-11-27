import React, { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from './outfit-cart.module.scss';
import Button from 'react-bootstrap/Button';
import { XIcon } from "../../shared/icons/icons";
import { OutfitsContext } from "../../shared/contexts/outfits-info";

function OutfitCart (props) {
     const {
          mainItem,
          imageIdTwo,
          imageOne, 
          imageTwo, 
          displayDeleteButton,
          custom
     } = props;

     const [deletingItem, setDeletingItem] = useState(false);
     const { removeOutfit } = useContext(OutfitsContext);
     useEffect(() => {
          return ;
     },[])

     const handleDelete = (e) =>{
          e.preventDefault();
          setDeletingItem(true);
          removeOutfit(mainItem, imageIdTwo).then(() => setDeletingItem(false));
     }

     const imageStyleOne = imageOne ? {
          backgroundImage: `url(${imageOne})`
     } : {
          backgroundImage: `url('/defaultImg.png')`
     }

     const imageStyleTwo = imageTwo ? {
          backgroundImage: `url(${imageTwo})`
     } : {
          backgroundImage: `url('/defaultImg.png')`
     }

     const spinnerStyle= {
          height: `14px`,
          width: `14px`
     }


     return (
          <div className={custom ? styles.containerCustom : styles.container}>
               <div className={imageOne ? styles.image : styles.noImage} style={imageStyleOne}>
               </div>
               <div className={imageTwo ? styles.image : styles.noImage} style={imageStyleTwo}>
               </div>
               {displayDeleteButton && 
               <Button variant="icon" onClick={handleDelete} className={styles.deleteButton}>{deletingItem ? <div style={spinnerStyle} className="spinner-border" role="status"></div> : <XIcon />}</Button>}
          </div>
     )
}

OutfitCart.propTypes = {
     mainItem: PropTypes.shape({
          attributes: PropTypes.arrayOf(PropTypes.string),
          type: PropTypes.string ,
          imageId: PropTypes.string, 
          recomAttr: PropTypes.any,
          created: PropTypes.number,
          updated: PropTypes.number,
          recomDate: PropTypes.number,
          favorites: PropTypes.arrayOf(PropTypes.string)
     }),
     imageIdTwo: PropTypes.string,
     imageOne: PropTypes.string,
     imageTwo: PropTypes.string,
     displayDeleteButton: PropTypes.bool
}

export default OutfitCart;