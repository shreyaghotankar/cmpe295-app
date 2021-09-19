import React, {useContext} from "react";
import styles from './main-page.module.scss';

import Section
 from "../section/section";
import {UserContext} from '../../shared/contexts/user-info' 
import MainNavbar from "../navbar/navbar";
function MainPage () {

    const {user} = useContext(UserContext);
    const {given_name} = user?.attributes || {};

    return (
        <>
            <MainNavbar />
            <div className={styles.container}>

           
            Hello!, {given_name}
            
            <Section 
                header="this is one section"
            />
        </div>
        </>
                
        
    )
}

export default MainPage;
