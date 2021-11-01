import React, { createRef, useEffect, useState }  from "react";
import PropTypes from 'prop-types';
import styles from './add-item-input.module.scss';
import { Button } from 'react-bootstrap';
import { AddItemIcon } from '../../shared/icons/icons';


function AddItemInput (props) {
 const { cancelAdding, onSelectFile, onDragFile } = props;
 const dropDiv = createRef(null);

 const [dragInit, setDragInit] = useState(false);
 const [dragCounter, setDragCounter] = useState(0);

 const handleDrag = (e) => {
  e.preventDefault()
  e.stopPropagation()
 }
 const handleDragIn = (e) => {
  e.preventDefault()
  e.stopPropagation();
  setDragCounter(dragCounter + 1);
 }
 const handleDragOut = (e) => {
  e.preventDefault()
  e.stopPropagation()
  setDragCounter(dragCounter - 1)
  if (dragCounter> 0) {
   return;
  }
 }
 const handleDrop = (e) => {
  e.preventDefault()
  e.stopPropagation()
  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
   onDragFile(e)
   e.dataTransfer.clearData()
   setDragCounter(0);
  }
 }

 useEffect(() => {
  const inputDiv = dropDiv.current
  if (!dragInit) {
   inputDiv.addEventListener('dragenter', handleDragIn);
   inputDiv.addEventListener('dragleave', handleDragOut);
   inputDiv.addEventListener('dragover', handleDrag);
   inputDiv.addEventListener('drop', handleDrop);
   setDragInit(true)
  }

  return () => {
   inputDiv.removeEventListener('dragenter', handleDragIn);
   inputDiv.removeEventListener('dragleave', handleDragOut);
   inputDiv.removeEventListener('dragover', handleDrag);
   inputDiv.removeEventListener('drop', handleDrop); 
  }
 },[])
 return (
  <div className={styles.imageAddContainer} ref={dropDiv}>
   <AddItemIcon />
   <p className={styles.text}>
    <span>Add your photo by clicking the button below or drag and drop them here.</span>
   </p>
        
   <div className={styles.fileInput}>
    <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={onSelectFile}/>
    <label htmlFor="file-upload" className="btn btn-op">
                    Add photo
    </label>
                
   </div>
   <Button variant="link" onClick={cancelAdding}>Cancel
   </Button>
  </div>
 )
}

AddItemInput.propTypes = {
 cancelAdding: PropTypes.func,
 onSelectFile: PropTypes.func,
 onDragFile: PropTypes.func
}

export default AddItemInput;
