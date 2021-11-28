import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { Col, Row,  Navbar, NavbarBrand, Nav } from "react-bootstrap";
import styles from './welcome-page.module.scss';
import { TimeIcon, PlanetIcon, MoneyIcon, GithubIcon, LinkedinIcon } from '../../shared/icons/icons';
import { PERSONAS } from "../../shared/constants";
import HowItWorks from "./components/how-it-works/how-it-works";

const useScroll = () => {
     const elRef = useRef(null);
     const executeScroll = () => elRef.current.scrollIntoView();
   
     return [executeScroll, elRef];
};

function WelcomePage (props) {
     const { children } = props;
     const [scrollAbout, aboutRef] = useScroll();
     const [scrollIdea, ideaRef] = useScroll();
     const [scrollHow, howRef] = useScroll();
     
     const sections = [
          {
               icon: < TimeIcon />, 
               header: 'save your time', 
               text: 'Get outfit recommendations within seconds and dress up without spending too much time on thinking what to wear.'
          },
          {
               icon: < MoneyIcon />, 
               header: 'save your budget', 
               text: "Explore the potencial of your closet: mix and match what is already there."
          },
          {
               icon: <PlanetIcon/>, 
               header: 'save the planet', 
               text: 'Be mindful and buy new things when you really need them.'
          }
     ]

     return (
          <div className={styles.container} data-testid="welcomePage">
               <Navbar className={styles.navContainer} sticky="top" expand='md'>
                    <NavbarBrand className={styles.brand}>Outfit Perfection</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                         <Nav className="ms-auto">
                              <Nav.Link as="button" onClick={()=>scrollHow()} className={styles.button}>How it works</Nav.Link>
                              <Nav.Link as="button" onClick={()=>scrollIdea()} className={styles.button}>Idea</Nav.Link>
                              <Nav.Link as="button" onClick={()=>scrollAbout()} className={styles.button}>About us</Nav.Link>
                         </Nav>
                    </Navbar.Collapse>
               </Navbar>
               <div className={styles.sectionMain}>
                    <h1 className={styles.header}>Explore Your Own Closet</h1>
                    <div className="text-center mx-4 my-3">Discover amazing outfits by mixing and matching clothes that You already have</div>
                    <Row className={styles.infoRow}>
                         <Col>
                              {sections.map((el, id)=> <Row key={id} className="mb-4">
                                   <Col xs="auto" className="me-2 me-md-4">{el.icon}</Col>
                                   <Col >
                                        <div className={styles.subsectionHeader}>{el.header}</div>
                                        <div className="d-none d-md-block mt-md-3">{el.text}</div>
                                   </Col>
                                   <Col className="d-md-none mb-3 mt-2" xs={12}><div className="mt-2 mt-md-3">{el.text}</div></Col>
                              </Row>)}
                              <div className="d-md-none text-center">
                                   <p>“You can have anything you want in life if you dress for it.”</p>
                                   <p>Edith Head</p>
                              </div>

                         </Col>
                         <Col className="mt-4 mt-md-0">{children}
                         </Col>
                    </Row>
                    <div className="py-4 d-none d-md-block text-center">
                         <p>“You can have anything you want in life if you dress for it.”</p>
                         <p>Edith Head</p>
                    </div>
               </div>
               <div className={styles.sectionHow} ref={howRef}>
                    <h1 className={styles.header}>How it works</h1>
                    <HowItWorks />
               </div>
               <div className={styles.sectionIdea} ref={ideaRef}>
                    <h1 className={styles.header}>Idea</h1>
                    <Row className="mt-4">
                         <Col xs={12} md={6}>Outfit Perfection provides you with an opportunity to explore your own Closet. Our state-of-art recommendation algorithm will help find amazing outfit options for you by matching tops or bottoms for a aprticular clothing item in your closet.</Col>
                         <Col>Our vision is to promote sustainable fashion by repurposing items already owned by the user without compromising on style.</Col>
                    </Row>
               </div>
               <div className={styles.sectionAbout} ref={aboutRef}>
                    <h1 className={styles.header}>About us</h1>
                    <p className="mt-4">Meet the women behind Outfit Perfection. We started it as an academic project and on exploring the sustainable fashion domain realized the potential of this application. We incorporated our software engineering and machine learning knowledge for the betterment of the people and the planet.</p>
                    <Row className="my-5">
                         {PERSONAS.map((el, id)=> {
                              const key = "member" + id;
                              const imgStyle = {
                                   backgroundImage: `url(${el.profUrl})`
                              }
                              return (
                                   <Col  className="md-4 mb-4" key={key}>
                                        <div style={imgStyle} className={styles.aboutImage}></div>
                                        <div className="mt-3 fw-bold text-center">{el.name}</div>
                                        <div className="mb-3 text-center">{el.title}</div>
                                        <div>{el.about}</div>
                                        <a href={el.linkedin} className={styles.link}><LinkedinIcon/></a>
                                        <a href={el.githubUrl} className={styles.link}><GithubIcon/></a>
                                   </Col>)
                         })}
                    </Row>
               </div>
          </div>
     )
}

WelcomePage.propTypes = {
     children: PropTypes.any
}

export default WelcomePage;
