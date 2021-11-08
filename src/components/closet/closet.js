import React  from "react";
import PropTypes from 'prop-types';
// import styles from './closet.module.scss';
import ItemCart from "../item-cart/item-cart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Closet (props) {
	const { items } = props;

	const emptyCloset = !items || items.length === 0;

	const fakeData = {
		image: "https://di2ponv0v5otw.cloudfront.net/posts/2020/11/15/5fb1c7d2ffba9492e0b2c29a/m_5fb1c7d812d8803988ba4355.jpg",
		attributes: ['t_stripe', 'f_denim', 't_stripe', 'f_denim', 't_stripe', 'f_denim', 't_stripe', 'f_denim']
	}

	console.log("items: ", items);


	return (
		<div>
			{emptyCloset ? <div>No items in your Closet yet</div> : null}
			<Row className="justify-content-start">
                
				{Array.isArray(items) && items.map((el, index)=>{
					const image = 'https://d17y7rra8hr88b.cloudfront.net/private/' + el.userId + '/' + el.imageId;
					return (<Col sm="auto" key={`user-item-${index}`}>
						<ItemCart image={image} attributes={el.attributes} imageId={el.imageId} type={el.type}/>
					</Col>)
				})

				}</Row>
			<Row className="justify-content-start"><Col sm="auto"><ItemCart 
				image={fakeData.image} 
				attributes={fakeData.attributes}
			/></Col><Col><ItemCart/></Col></Row>
		</div>
	)
}

Closet.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object)
}

export default Closet;