import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';
import styles from './update-item.module.scss';
import { Button } from 'react-bootstrap';
import { ItemsContext } from "../../shared/contexts/items-info";
import AttributesSelection from "../attributes-selection/attributes-selection";
import { ITEM_TYPE } from '../../shared/constants'


function UpdateItem (props) {
     const { updateItem } = useContext(ItemsContext);
     const { cancelUpdate, image, item } = props;
     const { attributes, type, imageId } = item || {};
     const [selectedAttributes, setSelectedAttributes] = useState(attributes);
     const [sendingInfo, setSendingInfo] = useState(false);

     const handleSubmit = () => {
          if (selectedAttributes?.length === 0) {
               alert("DANGER");
               return;
          }
          setSendingInfo(true)
          updateItem(imageId, type, selectedAttributes).then(() => {
               setSendingInfo(false);
               cancelUpdate()
          });
     }
     const backgroundStyle = image ? {
          backgroundImage: `url(${image})`
     } : {
          backgroundImage: `url('/defaultImg.png')`
     }
     return (
          <div className={styles.container}>
               <div>
                    <div className={styles.imageContainer} style={backgroundStyle} data-testid="updateImage"></div>
                    <div className={styles.text}>Select attributes:</div>
                    <AttributesSelection 
                         selectedOptions={selectedAttributes} 
                         setSelectedOptions={setSelectedAttributes} 
                         upper={type === ITEM_TYPE.UPPER}
                    />
                    <div className={styles.buttonContainer}>
                         <Button variant="op" onClick={handleSubmit} disabled={!selectedAttributes || selectedAttributes.length === 0} data-testid="updateButton">
                              {sendingInfo ? <div className="spinner-border" role="status">
                              </div>: 'Update'}
                         </Button>
                    </div>
               </div>
          </div>
     )
}

UpdateItem.propTypes = {
     cancelUpdate: PropTypes.func,
     image: PropTypes.string,
     item: PropTypes.shape({
          attributes: PropTypes.arrayOf(PropTypes.string),
          type: PropTypes.string ,
          imageId: PropTypes.string, 
          recomAttr: PropTypes.any,
          created: PropTypes.number,
          updated: PropTypes.number,
          recomDate: PropTypes.number
     }) 
}

export default UpdateItem;
