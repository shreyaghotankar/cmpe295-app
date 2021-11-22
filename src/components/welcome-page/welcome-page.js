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
               text: 'add smth here'
          },
          {
               icon: < MoneyIcon />, 
               header: 'save your budget', 
               text: 'add smth here'
          },
          {
               icon: <PlanetIcon/>, 
               header: 'save the planet', 
               text: 'add smth here'
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
                              {sections.map((el, id)=> <Row key={id} className="mb-4 mb-md-5">
                                   <Col xs="auto" className="me-4">{el.icon}</Col>
                                   <Col>
                                        <div className={styles.subsectionHeader}>{el.header}</div>
                                        <div className="mt-2 mt-md-3">{el.text}</div>
                                   </Col>
                              </Row>)}
                              <div className="pt-5  d-md-none text-center">
                                   <p>“You can have anything you want in life if you dress for it.”</p>
                                   <p>Edith Head</p>
                              </div>

                         </Col>
                         <Col className="mt-4 mt-md-0">{children}
                         </Col>
                    </Row>
                    <div className="py-5 d-none d-md-block text-center">
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
                    <p className="mt-4">Outfit Perfection provides you with an opportunity to explore your own Closet. Our state-of-art recommendation algorithm will help find amazing outfit options for you by matching tops or bottoms for a aprticular clothing item in your closet.</p>
                    <p>
                    Our vision is to promote sustainable fashion by repurposing items already owned by the user without compromising on style.
                    </p>
               </div>
               <div className={styles.sectionAbout} ref={aboutRef}>
                    <h1 className={styles.header}>About us</h1>
                    <p className="mt-4">Lorem ipsum is a name for a common type of placeholder text. Also known as filler or dummy text, this is simply copy that serves to fill a space without actually saying anything meaningful. ... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
