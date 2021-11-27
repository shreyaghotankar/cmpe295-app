import React from "react";

import { Col, Row, Button  } from "react-bootstrap";
import styles from './how-it-works.module.scss';
import { HeartIcon, AlgoIcon } from '../../../../shared/icons/icons'
import OutfitCart from "../../../outfit-cart/outfit-cart";


function HowItWorks () {
     const imgFour = {
          backgroundImage: `url(/img/blouse.png)`
     }
     const imgTwo = {
          backgroundImage: `url(/img/jeans.png)`
     }

     const imgThree = {
          backgroundImage: `url(/img/skirt.png)`
     }

     const imgOne = {
          backgroundImage: `url(/img/shirt.png)`
     }

     const imgFive = {
          backgroundImage: `url(/img/jacket.png)`
     }
     return (
          <Row className="my-4 mb-md-5">
               <Col className="mb-4">
                    <div className={styles.container}>
                         <div className={styles.header}>add items from your clost</div>
                         <div className="mt-2 mt-md-3">
                              <Row className="justify-content-around">
                                   <Col xs='auto'>
                                        <div className={styles.item} style={imgOne}></div>
                                   </Col>
                                   <Col xs="auto">
                                        <div className={styles.item} style={imgTwo}></div>
                                   </Col>
                                   <Col xs='12' className="d-flex align-items-center">
                                        <div className={styles.item} style={imgThree}></div>
                                   </Col>
                                   <Col xs='auto'>
                                        <div className={styles.item} style={imgFour}></div>
                                   </Col>
                                   <Col xs="auto">
                                        <div className={styles.item} style={imgFive}></div>
                                   </Col>
                              </Row>
                         </div>
                    </div>
               </Col>
               <Col className="mb-4">
                    <div className={styles.container}>
                         <div className={styles.header}>Magic happens</div>
                         <div className="mt-2 mt-md-3">
                              <div className="my-4 d-flex justify-content-center"><AlgoIcon className={styles.algoIcon}/></div>
                              Our state-of-art recommendation algorithm mixes and matches your items to create amazing outfit options.</div>
                    </div>
               </Col>
               <Col md="auto" className="mb-4">
                    <div className={styles.container}>
                         <div className={styles.header}>save only what you like</div>
                         <div className={styles.recommendations}>
                              <div className={styles.recommendationCart}>
                                   <Button variant="icon" className={styles.likeButton}><HeartIcon/></Button>  
                                   <OutfitCart imageOne={'/img/blouse.png'} imageTwo={'/img/jeans.png'} custom/>  
                              </div>
                              <div className={styles.recommendationCart}>
                                   <Button variant="icon" className={styles.likeButton}><HeartIcon/></Button>  
                                   <OutfitCart imageOne={'/img/shirt.png'} imageTwo={'/img/skirt.png'} custom/>  
                              </div>
                              <div className={styles.recommendationCart}>
                                   <Button variant="icon" className={styles.likeButton}><HeartIcon/></Button>  
                                   <OutfitCart imageOne={'/img/jacket.png'} imageTwo={'/img/jeans.png'} custom/>  
                              </div>
                         </div>
                         <div className={styles.blank}></div>
                         <div className={styles.addition}></div>
                         <div className={styles.addition}></div>
                    </div>
               </Col>
          </Row>
     )
}

export default HowItWorks;
