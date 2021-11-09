import React from "react";
import PropTypes from 'prop-types';
import styles from './filter-button.module.scss';
import { Dropdown } from 'react-bootstrap';
import { ArrowIcon } from "../../shared/icons/icons";

function FilterButton (props) {
     const { header, options, onSelect } = props;
     const onClick = (e) => {
          onSelect(e.target.name);
     }
    
     return (
          <Dropdown>
               <Dropdown.Toggle variant="dropdown" id="dropdown-basic">
                    {header}
                    <ArrowIcon className={styles.toggle} />
               </Dropdown.Toggle>

               <Dropdown.Menu>
                    {options.map(option =>  <Dropdown.Item as="button" name={option} onClick={onClick} key={`filter-keys-${option}`}>{option.toLowerCase()}</Dropdown.Item>)}
               </Dropdown.Menu>
          </Dropdown>
     )
}

FilterButton.propTypes = {
     isChecked: PropTypes.bool,
     onSelect: PropTypes.func,
     value: PropTypes.string
}

export default FilterButton;