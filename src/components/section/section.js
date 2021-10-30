import React from "react";
import PropTypes from 'prop-types';
// import { SECTIONS } from "../../shared/constants";
import styles from './section.module.scss';
// import { ClosetIcon, OutfitsIcon } from "../../shared/icons/icons";

function Section (props) {
  const {
    section, 
    children,
    isButton, 
    sectionButton
  } = props;

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
        <span>{section}</span>
        {isButton && <span className={styles.button}>{sectionButton}</span>}
      </div>
      <div>
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