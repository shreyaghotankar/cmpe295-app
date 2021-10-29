import React, {useContext, useEffect, useState} from "react";
import styles from './main-page.module.scss';

import Section
 from "../section/section";
 import Button from 'react-bootstrap/Button'
import {UserContext} from '../../shared/contexts/user-info' 
import MainNavbar from "../navbar/navbar";
import WelcomeModal from "../welcome-modal/welcome-modal";
import { SECTIONS } from "../../shared/constants";
import { ItemsContext } from "../../shared/contexts/items-info";
import Closet from "../closet/closet";
import {PlusIcon} from '../../shared/icons/icons'
function MainPage () {

    const {user} = useContext(UserContext);
    const {given_name} = user?.attributes || {};
    const {items} = useContext(ItemsContext);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {
        if (items && items.length == 0) {
            setShowWelcomeModal(true)
        }
        if (items && items.length > 0) {
            console.log(items)
            console.log("It's not empty")
        }
        if (!items) {
            console.log("not here yet")
        }
    }, [items])

    return (
        <>
            <MainNavbar />
            <div className={styles.container}>
            <Section
                section={SECTIONS.CLOSET}
                isButton
                sectionButton={<Button 
                                variant="grey" 
                                onClick={() => console.log("hello")}>
                                    <PlusIcon />Upload new item
                                </Button>}
                >
                    <Closet items={items} />
                </Section>
            <Section
                section={SECTIONS.OUTFITS}
                >outfit</Section>
                    <Section
                section="Bonus Section"
                ><Button onClick={()=> setShowWelcomeModal(!showWelcomeModal)}>Modal</Button>
           
                Hello!, {given_name}</Section>


        </div>
        <WelcomeModal show={showWelcomeModal} onHide={()=> setShowWelcomeModal(false)} />
        </>
                
        
    )
}

export default MainPage;
