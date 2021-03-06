import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import styles from './recommendations.module.scss';
import { OutfitsContext } from "../../shared/contexts/outfits-info";
import Results from "./components/results/results";

function Recommendations (props) {
     const { generateOutfits, saveOutfits } = useContext(OutfitsContext);
     const { closeRecommendations, item } = props;
     const [loading, setLoading] = useState(true);
     const [recommendations, setRecommendations] = useState(null);
     const [selectedFavorites, setSelectedFavorites] = useState([]);
     const [sendingInfo, setSendingInfo] = useState(false);
     const { imageId } = item;

     const handleSubmit = () => {
          setSendingInfo(true)
          saveOutfits(imageId, selectedFavorites).then(() => {
               setSendingInfo(false);
               closeRecommendations()
          });
     }

     useEffect(() => {
          if (item?.favorites) {
               setSelectedFavorites(item.favorites)
          }
          return;
     }, [closeRecommendations, item])

     useEffect(() => {
          return;
     }, [])

     useEffect(() => {
          if (recommendations?.success === false) {
               setTimeout(() => closeRecommendations(), 2000)
          }
          return ;
     }, [closeRecommendations, recommendations])

     useEffect(() => {
          setLoading(true);
          return generateOutfits(item).then(res => {
               setRecommendations({
                    success: true,
                    data: res.data
               });
               setLoading(false);
          }).catch(() => {
               setRecommendations({
                    success: false,
                    data: "Smth went wrong"
               });
               setLoading(false);
          })
     }, [item, generateOutfits])

     const updateFavorites = (id) => {
          if (selectedFavorites.includes(id)) {
               setSelectedFavorites(selectedFavorites.filter(item => item !== id))
          } else {
               setSelectedFavorites(prev => [...prev, id])
          }
     }

     return (
          loading ? <div className={styles.loadingContainer}>
               <p className={styles.header}>Magic is all around us.</p>
               <p>You are beautiful!</p>
               <p>We are mixing and matching to create perfect outfits for You!</p>
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
     item: PropTypes.shape({
          attributes: PropTypes.arrayOf(PropTypes.string),
          type: PropTypes.string ,
          imageId: PropTypes.string, 
          recomAttr: PropTypes.any,
          created: PropTypes.number,
          updated: PropTypes.number,
          recomDate: PropTypes.number,
          favorites: PropTypes.arrayOf(PropTypes.string)
     }) 
}

export default Recommendations;
