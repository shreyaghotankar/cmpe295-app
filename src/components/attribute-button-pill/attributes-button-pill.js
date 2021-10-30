import React from "react";
import PropTypes from 'prop-types';
import styles from './attributes-button-pill.module.scss';

function AttributesButtonPill (props) {
  const { isChecked, onSelect, value } = props;
  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(value);
  }
    
  return (
    <div>
      <button
        type="checkbox"
        onClick={onClick}
        className={isChecked ? styles.pillIsChecked : styles.pill}
      >
        <span>{value}</span>
      </button>
    </div>
  )
}

AttributesButtonPill.propTypes = {
  isChecked: PropTypes.bool,
  onSelect: PropTypes.func,
  value: PropTypes.string
}

export default AttributesButtonPill;

