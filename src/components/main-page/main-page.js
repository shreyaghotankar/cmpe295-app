import React, {useContext} from "react";
import styles from './main-page.module.scss';

import Section
 from "../section/section";
import {UserContext} from '../../shared/contexts/user-info' 
import MainNavbar from "../navbar/navbar";
import { SECTIONS } from "../../shared/constants";
function MainPage () {

    const {user} = useContext(UserContext);
    const {given_name} = user?.attributes || {};

    return (
        <>
            <MainNavbar />
            <div className={styles.container}>
            <Section
                section={SECTIONS.CLOSET}
                >Here will be the list of Items</Section>
            <Section
                section={SECTIONS.OUTFITS}
            />
           
            Hello!, {given_name}
            

        </div>
        </>
                
        
    )
}

export default MainPage;
