import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// import { SECTIONS } from "../../shared/constants";
import styles from './section.module.scss';
// import { ClosetIcon, OutfitsIcon } from "../../shared/icons/icons";
import { ArrowIcon } from "../../shared/icons/icons";
function Section (props) {
	const {
		section, 
		children,
		isButton, 
		sectionButton
	} = props;

	const [hideSection, setHideSection] = useState(false);

	// const [icon, setIcon] = useState(null)

	// useEffect(() => {
	//     if (section === SECTIONS.CLOSET) {
	//         setIcon(<ClosetIcon />);
	//     } else if (section === SECTIONS.OUTFITS) {
	//         setIcon(<OutfitsIcon />);
	//     }
	// }, [section])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerLeft}>
					<span className={styles.headerText}>{section}</span>
					<Button 
						className="ms-auto" 
						variant="toggle"
						onClick={()=>setHideSection(!hideSection)}
					>
						<ArrowIcon className={hideSection ? `${styles.toggle}` : ''}/>
					</Button>
				</div>
    
				{isButton && <span className={styles.button}>{sectionButton}</span>}
			</div>
			<div className={hideSection ? `${styles.bodyHidden}` : `${styles.body}`}>
				{children}
			</div>
		</div>
	)
}

Section.propTypes = {
	header: PropTypes.string,
	isButton: PropTypes.bool,
	sectionButton: PropTypes.object,
	side: PropTypes.string, 
	section: PropTypes.string,
}

export default Section;