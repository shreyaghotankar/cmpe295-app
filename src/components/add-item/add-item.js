import React, { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';
import styles from './add-item.module.scss';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { API, Storage } from "aws-amplify";
import { ItemsContext } from "../../shared/contexts/items-info";
import AttributesSelection from "../attributes-selection/attributes-selection";


Storage.configure({ level: 'private' });

function AddItem (props) {
    const {addItem} = useContext(ItemsContext);
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const handleSubmit = () => {
        console.log("hhh")
        if (!selectedFile || selectedAttributes.length == 0) {
            addItem(null, null, selectedAttributes);
            alert("DANGER");
            return;
        }
        addItem(selectedFile.name, selectedFile, selectedAttributes);
    }

    // async function onchange(e){
    //     const file = e.target.files[0];
    //     const result = await Storage.put(file.name, file)
    //     const image_id = result.key
    //     //await Storage.get(result.key)
    //     console.log("results: ", result)
    //     console.log("image id: ", image_id)
    //     setImage_id(image_id);

    //     }
    //     const onBoxChecked = e =>{
    //         const target = e.target;
    //         const attributes = target.value;
    //         setAttributes(attributes)
    //       }
    //     const handleSubmit = e => {
    //         e.preventDefault();
    //         let item = {image_id, attributes};
    //         console.log("payload:", item)
    //         API.put(apiName,path, {
    //            body: {
    //                imageId: image_id,
    //                attributes: attributes
    //            },
    //        }).then(res => {
    //            console.log("Database updated");
    //        })
    //        .catch(error => {
    //            console.log(error.response)
    //        });

    //     }

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
        <img src={preview} />
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



{/* <div>Add Item Will be here
<div>
<form>
    <label>Upload Image:
        <div>
        <input type="file" onChange={onchange} />
        </div>
    </label>
</form>
</div>
<div>
<form onSubmit={handleSubmit}>
    <label>Select Clothing Type:</label>
    <div/>
      <input type="radio" onChange={onBoxChecked} value="top" name="clothingType"/>
      <label for="top">Top</label>
      <div></div><div></div>
      <input type="radio" onChange={onBoxChecked} value="bottom" name="clothingType"/>
      <label for="bottom">Bottom</label>
      <button>Submit</button>
  </form>
</div>
</div> */}