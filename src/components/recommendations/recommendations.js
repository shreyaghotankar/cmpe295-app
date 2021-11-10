import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import styles from './recommendations.module.scss';
import { Button } from 'react-bootstrap';
import { OutfitsContext } from "../../shared/contexts/outfits-info";

function Recommendations (props) {
     const { generateOutfits, saveOutfits } = useContext(OutfitsContext);
     const { closeRecommendations, imageId, attributes, type } = props;
     const [loading, setLoading] = useState(true);
     const [recommendations, setRecommendations] = useState(null);
     const [selectedFavorites, setSelectedFavorites] = useState([]);
     const [sendingInfo, setSendingInfo] = useState(false);

     const handleSubmit = () => {
          if (selectedFavorites.length === 0) {
               alert("DANGER");
               return;
          }
          setSendingInfo(true)
          saveOutfits(imageId, selectedFavorites).then(() => {
               setSendingInfo(false);
               closeRecommendations ()
          });
     }

     useEffect(() => {
          setLoading(true);
          generateOutfits(imageId, type, attributes).then(res => {
               setRecommendations(res);
               setLoading(false);
          })
     }, [recommendations, generateOutfits, imageId, type, attributes])

     const updateFavorites = (id) => {
          setSelectedFavorites([id]);
     }

     return (
          loading ? <>We are working on your request</> :
               <div>here will be result</div>
     )
}

Recommendations.propTypes = {
     closeRecommendations: PropTypes.func,
     imageId: PropTypes.string, 
     attributes: PropTypes.arrayOf(PropTypes.string), 
     type: PropTypes.string
}

export default Recommendations;
