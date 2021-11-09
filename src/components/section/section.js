import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// import { SECTIONS } from "../../shared/constants";
import styles from './section.module.scss';
// import { ClosetIcon, OutfitsIcon } from "../../shared/icons/icons";
import { ArrowIcon } from "../../shared/icons/icons";
import FilterButton from "../filter-button/filter-button";

function Section (props) {
     const {
          children,
          filterHeader,
          filterOptions,
          isButton,
          onFilterSelect,
          section, 
          sectionButton 
     } = props;

     const [hideSection, setHideSection] = useState(false);
     const showFilter = filterHeader && typeof(onFilterSelect) == 'function' && typeof(filterOptions) != 'undefined'

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
                         {showFilter && <div className={styles.filterButton}>
                              <FilterButton header={filterHeader} options={filterOptions} onSelect={onFilterSelect} />
                         </div>}
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
     children: PropTypes.any,
     filterHeader: PropTypes.string,
     filterOptions: PropTypes.arrayOf(PropTypes.string),
     isButton: PropTypes.bool,
     onFilterSelect: PropTypes.func,
     section: PropTypes.string,
     sectionButton: PropTypes.object
}

export default Section;