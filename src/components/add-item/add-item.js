import React, { useEffect, useState, useContext } from "react";
import styles from './add-item.module.scss';
import { Button } from 'react-bootstrap';
import { ItemsContext } from "../../shared/contexts/items-info";
import AttributesSelection from "../attributes-selection/attributes-selection";

function AddItem (props) {
  const { addItem } = useContext(ItemsContext);
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const handleSubmit = () => {
    if (!selectedFile || selectedAttributes.length === 0) {
      addItem(null, null, selectedAttributes);
      alert("DANGER");
      return;
    }
    addItem(selectedFile.name, selectedFile, selectedAttributes);
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
    
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  return (
    <div>Add Item Will be here
      <div>
        {!selectedFile && 
            <div className={styles.fileInput}>
              <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={onSelectFile}/>
              <label htmlFor="file-upload" className="btn btn-op">
                    Add photo
              </label>
                
            </div>
        }

        <div>{selectedFile &&  
        <>
          <img alt="item-selected" src={preview} />
          <AttributesSelection selectedOptions={selectedAttributes} setSelectedOptions={setSelectedAttributes} upper/>
        </>
        }</div>
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

AddItem.propTypes = {

}

export default AddItem;
