import React, {useContext, useEffect} from "react";
import styles from './main-page.module.scss';

import Section
 from "../section/section";
import {UserContext} from '../../shared/contexts/user-info' 
import MainNavbar from "../navbar/navbar";
import { SECTIONS } from "../../shared/constants";
import { ItemsContext } from "../../shared/contexts/items-info";
function MainPage () {

    const {user} = useContext(UserContext);
    const {given_name} = user?.attributes || {};
    const {items} = useContext(ItemsContext);

    useEffect(() => {
        if (items && items.length == 0) {
            console.log("It's empty")
        }
        if (items && items.length > 0) {
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
                >Here will be the list of Items
                {items ? "Items are here" : "Loading it"}
                </Section>
            <Section
                section={SECTIONS.OUTFITS}
            />
           
            Hello!, {given_name}
            

        </div>
        </>
                
        
    )
}

export default MainPage;
