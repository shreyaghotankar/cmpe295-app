import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styles from './add-item.module.scss';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { Storage } from "aws-amplify";

Storage.configure({ level: 'private' });

function AddItem () {
    const [images, setImages] = useState([]);

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

    async  function onchange(e){
        const file = e.target.files[0];
        const result = await Storage.put(file.name, file)
        console.log("results: ", result)
        fetchImages()

        }

    return (
        <div>Add Item Will be here
        <div>
        
        <form>
            <label>Upload Image:
                <div>
                <input type='file' onChange={onchange} /></div>
            </label>
        </form>
        </div>
        </div>
    )
}

AddItem.propTypes = {

}

export default AddItem;