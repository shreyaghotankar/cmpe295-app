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

     const recommendationsArray = Array.isArray(recommendations) && recommendations.length > 0;

     useEffect(() => {
          return;
     },[])

     const imageOne = 'https://di2ponv0v5otw.cloudfront.net/posts/2020/11/15/5fb1c7d2ffba9492e0b2c29a/m_5fb1c7d812d8803988ba4355.jpg'

     return (
          recommendationsArray ? 
               <div className={styles.resultsContainer}>
                    <div className={styles.header}>Wow! Here are Your perfect sets!</div>
                    <p>Let us know what looks good for you</p>
                    <div className={styles.recommendations}>
                         <Row className="justify-content-around">
                              {Array.isArray(recommendations) && recommendations.map((el, index)=>{
                                   console.log("outfit:", el)             
                                   const imageTwo = 'https://di2ponv0v5otw.cloudfront.net/posts/2020/11/15/5fb1c7d2ffba9492e0b2c29a/m_5fb1c7d812d8803988ba4355.jpg'
                                   const isFavorite = selectedFavorites.includes(el);
                                   return (
                                        <Col sm="auto" key={`outfit-recommendations-${index}`} >
                                             <div className={styles.recommendationCart}>
                                                  <Button variant="icon"  onClick={() => updateFavorites(el)} className={isFavorite ? styles.likeButton : styles.questionButton}>{isFavorite ? <HeartIcon/> : <QuestionIcon/>}</Button>  
                                                  <OutfitCart imageOne={imageOne} imageTwo={imageTwo} imageIdOne={imageId} imageIdTwo={el}/>  
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
                    <div className={styles.header}>Looks like we haven't found anything:(</div>
                    <div className={styles.buttonContainer}>
                         <Button variant="cancel" onClick={closeRecommendations}>Hm, Let me check my Closet again</Button>
        	          </div>
               </div>
     )
}

Results.propTypes = {
     imageId: PropTypes.string
}

export default Results;
