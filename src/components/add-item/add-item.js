import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import styles from './add-item.module.scss';
import { Button } from 'react-bootstrap';
import { ItemsContext } from "../../shared/contexts/items-info";
import AttributesSelection from "../attributes-selection/attributes-selection";
import AddItemInput from "../add-item-input/add-item-input";


function AddItem (props) {
 const { addItem } = useContext(ItemsContext);
 const { cancelAdding } = props;
 const [selectedFile, setSelectedFile] = useState(null)
 const [preview, setPreview] = useState(null)
 const [selectedAttributes, setSelectedAttributes] = useState([]);
 const [sendingInfo, setSendingInfo] = useState(false);

 const handleSubmit = () => {
  if (!selectedFile || selectedAttributes.length === 0) {
   alert("DANGER");
   return;
  }
  setSendingInfo(true)
  addItem(selectedFile.name, selectedFile, selectedAttributes).then(() => {
   setSendingInfo(false);
   cancelAdding()
  });
 }

 useEffect(() => {
  if (!selectedFile) {
   setPreview(null)
   return
  }
    
  const objectUrl = URL.createObjectURL(selectedFile)
  setPreview(objectUrl)
    
  // free memory when ever this component is unmounted
  return () => URL.revokeObjectURL(objectUrl)
 }, [selectedFile])
    
 const onSelectFile = e => {
  if (!e.target.files || e.target.files.length === 0) {
   setSelectedFile(null)
   return
  }
  setSelectedFile(e.target.files[0])
 }
 const onDragFile = e => {
  if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
   setSelectedFile(null)
   return
  }
  setSelectedFile(e.dataTransfer.files[0])
 }

 const backgroundStyle = {
  backgroundImage: `url(${preview})`
 }
 return (
  <div className={styles.container}>
   {!selectedFile &&  < AddItemInput onSelectFile={onSelectFile} cancelAdding={cancelAdding} onDragFile={onDragFile}/>}
   {selectedFile &&  
        <div>
         <div className={styles.imageContainer} style={backgroundStyle}></div>
         <div className={styles.text}>Select attributes:</div>
         <AttributesSelection selectedOptions={selectedAttributes} setSelectedOptions={setSelectedAttributes} upper/>
         <div className={styles.buttonContainer}>
          <Button variant="cancel" onClick={cancelAdding}>Cancel</Button>
          <Button variant="op" onClick={handleSubmit} disabled={selectedAttributes.length === 0}>
           {sendingInfo ? <div class="spinner-border" role="status">
            
           </div>: 'Submit'}
          </Button>
         </div>
         
        </div>
   }
      
      
  </div>
 )
}

AddItem.propTypes = {
 cancelAdding: PropTypes.func,
}

export default AddItem;
