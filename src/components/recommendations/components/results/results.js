import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import styles from './results.module.scss';
import { Button } from 'react-bootstrap';
import OutfitCart from "../../../outfit-cart/outfit-cart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HeartIcon, QuestionIcon } from "../../../../shared/icons/icons";

function Results (props) {
     const { closeRecommendations, imageId, recommendations, selectedFavorites, updateFavorites, saveOutfits, submitting } = props;
     const { success, data } = recommendations || {};
     const  result  = data?.Items;

     const recommendationsArray = success && Array.isArray(result) && result.length > 0;

     useEffect(() => {
          return;
     },[])

     return (
          recommendationsArray ? 
               <div className={styles.resultsContainer}>
                    <div className={styles.header}>Wow! Here are Your perfect sets!</div>
                    <p>Let us know what looks good for you</p>
                    <div className={styles.recommendations}>
                         <Row className="justify-content-around">
                              {Array.isArray(result) && result.map((el, index)=>{
                                   const imageOne = `${process.env.REACT_APP_CLOUD_FRONT}${el.userId}/${imageId}`;
                                   const imageTwo = `${process.env.REACT_APP_CLOUD_FRONT}${el.userId}/${el.imageId}`;
                                   const isFavorite = selectedFavorites.includes(el.imageId);
                                   return (
                                        <Col sm="auto" key={`outfit-recommendations-${index}`} >
                                             <div className={styles.recommendationCart}>
                                                  <Button variant="icon"  onClick={() => updateFavorites(el.imageId)} className={isFavorite ? styles.likeButton : styles.questionButton}>{isFavorite ? <HeartIcon/> : <QuestionIcon/>}</Button>  
                                                  <OutfitCart imageOne={imageOne} imageTwo={imageTwo} mainItem={el} imageIdTwo={el.imageId}/>  
                                             </div>
                                        </Col>);})
                              }
                         </Row></div>
                    <div className={styles.buttonContainer}>
                         <Button variant="cancel" onClick={closeRecommendations}>Cancel</Button>
                         <Button variant="op" onClick={saveOutfits}>
                              {submitting ? <div className="spinner-border" role="status">
                              </div>: 'Save Favorites'}
                         </Button>
        	          </div>
               </div> :
               <div className={styles.resultsContainer}>
                    <div className={styles.header}>{success ? "Looks like we haven't found anything:(" : "Oops! Something went wrong"}</div>
                    <div className={styles.buttonContainer}>
                         <Button variant="cancel" onClick={closeRecommendations}>
                              {success ? "Hm, Let me check my Closet again" : "Get better"}</Button>
        	          </div>
               </div>
     )
}

Results.propTypes = {
     imageId: PropTypes.string
}

export default Results;
