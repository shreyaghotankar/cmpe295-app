import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import styles from './outfit-cart.module.scss';
import { BinIcon, PenIcon, ArrowIcon } from "../../shared/icons/icons";

function OutfitCart (props) {
     const {
          imageOne, 
          imageTwo
     } = props;

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
          </div>
     )
}

OutfitCart.propTypes = {
     imageOne: PropTypes.string,
     imageTwo: PropTypes.string,
}

export default OutfitCart;