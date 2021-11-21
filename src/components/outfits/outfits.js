import React, { useEffect }  from "react";
import PropTypes from 'prop-types';
// import styles from './closet.module.scss';
import OutfitCart from "../outfit-cart/outfit-cart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Outfits (props) {
     const { outfits } = props;
     const emptyCollection = !outfits || outfits.length === 0;
     useEffect (()=> {
          return ;
     }, [])
     return (
          <div>
               {emptyCollection ? <div><p>Outfits Insperation Board is empty.</p><p>Make the magic happens by clicking on 'Generate outfit'</p></div> : null}
               <Row className="justify-content-start">
                    {Array.isArray(outfits) && outfits.map((el, index)=>{
                         const imageIdOne = el?.itemOne?.imageId;
                         const userId = el?.itemOne?.userId;
                         const imageIdTwo = el?.itemTwo;
                         const imageOne = imageIdOne ? `${process.env.REACT_APP_CLOUD_FRONT}${userId}/${imageIdOne}` : '';
                         const imageTwo = imageIdTwo ? `${process.env.REACT_APP_CLOUD_FRONT}${userId}/${imageIdTwo}` : '';
                         return (<Col sm="auto" key={`user-outfit-${index}`}>
                              <OutfitCart imageOne={imageOne} imageTwo={imageTwo} mainItem={el?.itemOne} imageIdTwo={imageIdTwo} displayDeleteButton/>
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