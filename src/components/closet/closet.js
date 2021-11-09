import React  from "react";
import PropTypes from 'prop-types';
// import styles from './closet.module.scss';
import ItemCart from "../item-cart/item-cart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Closet (props) {
     const { items } = props;
     const emptyCloset = !items || items.length === 0;

     return (
          <div>
               {emptyCloset ? <div>No items in your Closet yet</div> : null}
               <Row className="justify-content-start">
                    {Array.isArray(items) && items.map((el, index)=>{
                         const image = `${process.env.REACT_APP_CLOUD_FRONT}${el.userId}/${el.imageId}`;
                         return (<Col sm="auto" key={`user-item-${index}`}>
                              <ItemCart image={image} attributes={el.attributes} imageId={el.imageId} type={el.type}/>
                         </Col>);})
                    }
               </Row>
          </div>
     )
}

Closet.propTypes = {
     items: PropTypes.arrayOf(PropTypes.object)
}

export default Closet;