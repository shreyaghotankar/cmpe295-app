import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styles from './add-item.module.scss';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { API, Storage } from "aws-amplify";


Storage.configure({ level: 'private' });

let apiName = 'dBApi';
let path = '/images';

function AddItem () {
    const [images, setImages] = useState([]);
    const[attributes, setAttributes] = useState([])
    const[image_id, setImage_id] = useState("");

    useEffect(() => {
        fetchImages()
    }, [])


    async function fetchImages() {
        let imageKeys = await Storage.list('')
        imageKeys = await Promise.all(imageKeys.map(async k => {
        const signedUrl = await Storage.get(k.key)
        return signedUrl
        }))
        console.log('imageKeys: ', imageKeys)
        setImages(imageKeys)
    }  

    async function onchange(e){
        const file = e.target.files[0];
        const result = await Storage.put(file.name, file)
        const image_id = result.key
        //await Storage.get(result.key)
        console.log("results: ", result)
        console.log("image id: ", image_id)
        setImage_id(image_id);
        fetchImages()

        }
        const onBoxChecked = e =>{
            const target = e.target;
            const attributes = target.value;
            setAttributes(attributes)
          }
        const handleSubmit = e => {
            e.preventDefault();
            let item = {image_id, attributes};
            console.log("payload:", item)
            API.put(apiName,path, {
               body: {
                   imageId: image_id,
                   attributes: attributes
               },
           }).then(res => {
               console.log("Database updated");
           })
           .catch(error => {
               console.log(error.response)
           });

        }

    return (
        <div>Add Item Will be here
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
        </div>
    )
}

AddItem.propTypes = {

}

export default AddItem;