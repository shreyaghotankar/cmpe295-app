import React  from "react";
import PropTypes from 'prop-types';
// import styles from './closet.module.scss';
import OutfitCart from "../outfit-cart/outfit-cart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Outfits (props) {
     const { outfits } = props;
     const emptyCollection = !outfits || outfits.length === 0;

     return (
          <div>
               {emptyCollection ? <div> Outfits Insperation Board is empty. Make the magic happens by clicking on 'Generate outfit'</div> : null}
               <Row className="justify-content-start">
                    {Array.isArray(outfits) && outfits.map((el, index)=>{
                         console.log("outfit:", el)
                         //const imageOne = `${process.env.REACT_APP_CLOUD_FRONT}${userId}/${itemOne}`;
                         //const imageTwo = `${process.env.REACT_APP_CLOUD_FRONT}${userId}/${itemTwo}`;
                         const imageOne = 'https://di2ponv0v5otw.cloudfront.net/posts/2020/11/15/5fb1c7d2ffba9492e0b2c29a/m_5fb1c7d812d8803988ba4355.jpg'
                         const imageTwo = 'https://di2ponv0v5otw.cloudfront.net/posts/2020/11/15/5fb1c7d2ffba9492e0b2c29a/m_5fb1c7d812d8803988ba4355.jpg' 
                         return (<Col sm="auto" key={`user-outfit-${index}`}>
                              <OutfitCart imageOne={imageOne} imageTwo={imageTwo} imageIdOne={el?.[0]} imageIdTwo={el?.[1]}/>
                         </Col>);})
                    }
               </Row>
          </div>
     )
}

Outfits.propTypes = {
     items: PropTypes.arrayOf(PropTypes.object)
}

export default Outfits;