import React from "react";
import PropTypes from 'prop-types';
import styles from './type-button-pill.module.scss';

function TypeButtonPill (props) {
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
			<span>{value.toLowerCase()}</span>
		</button>
	)
}

TypeButtonPill.propTypes = {
	isChecked: PropTypes.bool,
	onSelect: PropTypes.func,
	value: PropTypes.string,
	icon: PropTypes.string
}

export default TypeButtonPill;

