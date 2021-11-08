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
		<button
			type="checkbox"
			onClick={onClick}
			className={`${styles.pill}${isChecked ? ` ${styles.checked}` : ''}`}
		>
			<span>{value}</span>
		</button>
	)
}

AttributesButtonPill.propTypes = {
	isChecked: PropTypes.bool,
	onSelect: PropTypes.func,
	value: PropTypes.string
}

export default AttributesButtonPill;

