import React from "react";

import { Col, Row  } from "react-bootstrap";
import styles from './how-it-works.module.scss';
import { TimeIcon, PlanetIcon, MoneyIcon } from '../../../../shared/icons/icons';

function HowItWorks () {

     return (
          <Row className="my-4 mb-md-5">
               <Col md="4" className="mb-4">
                    <div className={styles.container}>
                         <div className={styles.header}>add items from your clost</div>
                         <div className="mt-2 mt-md-3">picture here</div>
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
