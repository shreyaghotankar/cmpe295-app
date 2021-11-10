import React, { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from './outfit-cart.module.scss';
import Button from 'react-bootstrap/Button';
import { XIcon } from "../../shared/icons/icons";
import { OutfitsContext } from "../../shared/contexts/outfits-info";

function OutfitCart (props) {
     const {
          imageIdOne,
          imageIdTwo,
          imageOne, 
          imageTwo
     } = props;

     const [deletingItem, setDeletingItem] = useState(false);
     const { removeOutfit } = useContext(OutfitsContext);
     useEffect(() => {
          return ;
     },[])

     const handleDelete = (e) =>{
          e.preventDefault();
          setDeletingItem(true);
          removeOutfit(imageIdOne, imageIdTwo).then(() => setDeletingItem(false));
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
     // const handleDelete = (e) =>{
     //      e.preventDefault();
     //      removeItem(imageId);
     // }

     return (
          <div className={styles.container}>
               <div className={imageOne ? styles.image : styles.noImage} style={imageStyleOne}>
               </div>
               <div className={imageTwo ? styles.image : styles.noImage} style={imageStyleTwo}>
               </div>
               <Button variant="icon" onClick={handleDelete} className={styles.deleteButton}>{deletingItem ? <div style={spinnerStyle} className="spinner-border" role="status"></div> : <XIcon />}</Button>
          </div>
     )
}

OutfitCart.propTypes = {
     imageIdOne: PropTypes.string,
     imageIdTwo: PropTypes.string,
     imageOne: PropTypes.string,
     imageTwo: PropTypes.string,
}

export default OutfitCart;