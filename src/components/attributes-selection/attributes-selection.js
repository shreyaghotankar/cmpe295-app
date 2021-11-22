import React  from "react";
import PropTypes from 'prop-types';
import styles from './attributes-selection.module.scss';
import { UPPER_ATTRIBUTES, BOTTOM_ATTRIBUTES, getAttrName } from '../../shared/constants'
import AttributesButtonPill from "../attribute-button-pill/attributes-button-pill";

function AttributesSelection (props) {
     const { selectedOptions, setSelectedOptions, upper=true } = props;
     const options = upper ? Object.keys(UPPER_ATTRIBUTES) : Object.keys(BOTTOM_ATTRIBUTES)
     const selectOption = (option) => {
          if (selectedOptions?.includes(option)) {
               setSelectedOptions(selectedOptions.filter(item => item !== option))
          } else {
               setSelectedOptions(prev => [...prev, option])
          }
     }


     return (
          <div className={styles.container}>
               {
                    options.map(option => {
                         const value = getAttrName(upper, option);
                         const pill_key = `button-pill-${value}`
                         return (
                              <AttributesButtonPill key={pill_key} value={value} onSelect={()=> selectOption(option)} isChecked={selectedOptions?.includes(option)}/>
                         )}
                    )
               }
          </div>
     )
}

AttributesSelection.propTypes = {
     selectOption: PropTypes.arrayOf(PropTypes.string),
     setSelectedOptions: PropTypes.func,
     upper: PropTypes.bool

}

export default AttributesSelection ;
