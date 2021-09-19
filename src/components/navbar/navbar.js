import React from "react";
import { Auth, Hub } from 'aws-amplify';
import styles from './navbar.module.scss'
import { Container, Navbar, Row, Col } from "react-bootstrap";
import {ReactComponent as ExitIcon} from '../../shared/icons/logout.svg'

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
            <Row><Col></Col><Col><button className={styles.button} onClick={handleSignOutButtonClick}>
            <ExitIcon />Exit
            </button></Col></Row>
                    
        </Navbar>

        
    )
}

export default MainNavbar;