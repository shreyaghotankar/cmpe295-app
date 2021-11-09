import React, { useContext, useEffect, useState } from "react";
import styles from './main-page.module.scss';

import Section
     from "../section/section";
import Button from 'react-bootstrap/Button'
import MainNavbar from "../navbar/navbar";
import WelcomeModal from "../welcome-modal/welcome-modal";
import { SECTIONS,  FILTER_TYPES } from "../../shared/constants";
import { ItemsContext } from "../../shared/contexts/items-info";
import Closet from "../closet/closet";
import { PlusIcon } from '../../shared/icons/icons';
import CustomModal from "../custom-modal/custom-modal";
import AddItem from "../add-item/add-item";
import Outfits from "../outfits/outfits";
import { OutfitsContext } from "../../shared/contexts/outfits-info";

function MainPage () {

     const { items } = useContext(ItemsContext);
     const { outfits } = useContext(OutfitsContext);
     const [showWelcomeModal, setShowWelcomeModal] = useState(false);
     const [showAddModal, setShowAddModal] = useState(false);
     const [itemsFilter, setItemsFilter] = useState(FILTER_TYPES.ALL);
     const [filteredItems, setFilteredItems] = useState([]);
     const [filterHeader, setFilterHeader] = useState('Types');

     useEffect(() => {
          if (items && items.length === 0) {
               setShowWelcomeModal(true)
          }
          if (items && items.length > 0) {
               setFilteredItems(items);
               console.log(items)
          }
          if (!items) {
               console.log("not here yet")
          }
     }, [items]);

     useEffect(() => {
          if (itemsFilter !== FILTER_TYPES.ALL) {
               setFilterHeader(`Types: ${itemsFilter.toLowerCase()}`)
               setFilteredItems(items.filter(el => el.type === itemsFilter))
          } else {
               setFilterHeader('Types');
               setFilteredItems(items)
          }    
     }, [itemsFilter, items])

     return (
          <>
               <MainNavbar />
               <div className={styles.container}>
                    <Section
                         section={SECTIONS.CLOSET}
                         isButton
                         sectionButton={<Button 
                              variant="grey" 
                              onClick={() => setShowAddModal(true)}>
                              <PlusIcon />Upload new item
                         </Button>}
                         filterHeader={filterHeader}
                         filterOptions={[FILTER_TYPES.UPPER, FILTER_TYPES.BOTTOM, FILTER_TYPES.ALL]}
                         onFilterSelect={(option)=> setItemsFilter(option)}
                    >
                         <Closet items={filteredItems} />
                    </Section>
                    <Section
                         section={SECTIONS.OUTFITS}
                    >
                         <Outfits outfits={outfits}/>
                    </Section>
               </div>
               <WelcomeModal show={showWelcomeModal} onHide={()=> setShowWelcomeModal(false)}/>
               <CustomModal show={showAddModal} onHide={()=> setShowAddModal(false)} hasCloseButton={false}>
                    <AddItem cancelAdding={()=> setShowAddModal(false)}/>
               </CustomModal>
          </>
                
        
     )
}

export default MainPage;
