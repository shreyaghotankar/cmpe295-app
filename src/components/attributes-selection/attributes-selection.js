import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styles from './attributes-selection.module.scss';
import {Row, Col, Form, Button} from 'react-bootstrap';
import {UPPER_ATTRIBUTES, getAttrName} from '../../shared/constants'
import AttributesButtonPill from "../attribute-button-pill/attributes-button-pill";

function AttributesSelection (props) {
    const {selectedOptions, setSelectedOptions, upper=true} = props;
    const options = Object.keys(UPPER_ATTRIBUTES)
    const selectOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option))
        } else {
            setSelectedOptions(prev => [...prev, option])
        }
    }


    return (
        <div>
            {
            options.map(option => {
                const value = getAttrName(upper, option);
                const pill_key = `button-pill-${value}`
            return (
                <AttributesButtonPill key={pill_key} value={value} onSelect={()=> selectOption(option)} isChecked={selectedOptions.includes(option)}/>
            )}
            )
            }
        </div>
    )
}

AttributesSelection.propTypes = {

}

export default AttributesSelection ;



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