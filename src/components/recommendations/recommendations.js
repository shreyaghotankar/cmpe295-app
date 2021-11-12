import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import styles from './recommendations.module.scss';
import { OutfitsContext } from "../../shared/contexts/outfits-info";
import Results from "./components/results/results";

function Recommendations (props) {
     const { generateOutfits, saveOutfits } = useContext(OutfitsContext);
     const { closeRecommendations, imageId, attributes, type } = props;
     const [loading, setLoading] = useState(true);
     const [recommendations, setRecommendations] = useState(null);
     const [selectedFavorites, setSelectedFavorites] = useState([]);
     const [sendingInfo, setSendingInfo] = useState(false);

     const handleSubmit = () => {
          setSendingInfo(true)
          saveOutfits(imageId, selectedFavorites).then(() => {
               setSendingInfo(false);
               closeRecommendations()
          });
     }

     useEffect(() => {
          return;
     }, [])

     useEffect(() => {
          setLoading(true);
          return generateOutfits(imageId, type, attributes).then(res => {
               setRecommendations(res);
               console.log('recommd: ', res);
               setLoading(false);
          })
     }, [type, imageId, attributes, generateOutfits])

     const updateFavorites = (id) => {
          console.log(id)
          if (selectedFavorites.includes(id)) {
               setSelectedFavorites(selectedFavorites.filter(item => item !== id))
          } else {
               setSelectedFavorites(prev => [...prev, id])
          }
     }

     return (
          loading ? <div className={styles.loadingContainer}>
               <p className={styles.header}>Magic is all around us.</p>
               <p>You are beautifyl!</p>
               <p>We are maxing and matching to create perfect outfits for You!</p>
               {"...".split("").map((char, index) => {
                    const style = { animationDelay: (0.5 + index/10) + "s" };
                    return <span aria-hidden="true"
                         key={`char-${index}`}
                         style={style}>
                         {char}
                    </span>
               })}
          </div> :
               <Results 
                    recommendations={recommendations} 
                    selectedFavorites={selectedFavorites} 
                    updateFavorites={updateFavorites}
                    closeRecommendations={closeRecommendations}
                    imageId={imageId}
                    saveOutfits={handleSubmit}
                    submitting={sendingInfo}
               />
     )
}

Recommendations.propTypes = {
     closeRecommendations: PropTypes.func,
     imageId: PropTypes.string, 
     attributes: PropTypes.arrayOf(PropTypes.string), 
     type: PropTypes.string
}

export default Recommendations;
