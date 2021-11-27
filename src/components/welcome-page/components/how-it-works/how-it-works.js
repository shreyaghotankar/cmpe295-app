import React from "react";

import { Col, Row  } from "react-bootstrap";
import styles from './how-it-works.module.scss';

function HowItWorks () {
     const imgOne = {
          backgroundImage: `url(/img/blouse.jpg)`
     }
     const imgTwo = {
          backgroundImage: `url(/img/jeans.png)`
     }

     const imgThree = {
          backgroundImage: `url(/img/skirt.png)`
     }

     const imgFour = {
          backgroundImage: `url(/img/shirt.png)`
     }

     const imgFive = {
          backgroundImage: `url(/img/jacket.png)`
     }
     return (
          <Row className="my-4 mb-md-5">
               <Col md="4" className="mb-4">
                    <div className={styles.container}>
                         <div className={styles.header}>add items from your clost</div>
                         <div className="mt-2 mt-md-3">
                              <Row className="justify-content-around">
                                   <Col>
                                        <div className={styles.item} style={imgOne}></div>
                                        <div className={styles.item} style={imgTwo}></div>
                                   </Col>
                                   <Col className="d-flex align-items-center">
                                        <div className={styles.item} style={imgThree}></div>
                                   </Col>
                                   <Col>
                                        <div className={styles.item} style={imgFour}></div>
                                        <div className={styles.item} style={imgFive}></div>
                                   </Col>
                              </Row>
                         </div>
                    </div>
               </Col>
               <Col md="4" className="mb-4">
                    <div className={styles.container}>
                         <div className={styles.header}>Magic happens</div>
                         <div className="mt-2 mt-md-3">text here</div>
                    </div>
               </Col>
               <Col md="4" className="mb-4">
                    <div className={styles.container}>
                         <div className={styles.header}>save only what you like</div>
                         <div className="mt-2 mt-md-3">picture here</div>
                    </div>
               </Col>
          </Row>
     )
}

export default HowItWorks;
