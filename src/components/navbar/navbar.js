import React from "react";
import { Auth, Hub } from 'aws-amplify';
import styles from './navbar.module.scss'
import { Navbar, NavbarBrand } from "react-bootstrap";
import {ExitIcon} from '../../shared/icons/icons'

const handleSignOutButtonClick = async () => {
    try {
        await Auth.signOut();
        Hub.dispatch('UI Auth', {   // channel must be 'UI Auth'
            event: 'AuthStateChange',    // event must be 'AuthStateChange'
            message: 'signedout'    // message must be 'signedout'
        });
    } catch (error) {
        console.log('error signing out: ', error);
    }
};  


function MainNavbar () {

    return (
        <Navbar className={styles.container}>
            <NavbarBrand className={styles.brand}>Outfit Perfection</NavbarBrand>
            <button className={styles.button} onClick={handleSignOutButtonClick}>
            <ExitIcon /><span className={styles.buttonText}>Exit</span>
            </button>
                    
        </Navbar>

        
    )
}

export default MainNavbar;