import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    // console.log(props);
    
    const { img, name, seller, price, stock } = props.product;
    // console.log(price);
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br/>
                <p><small>By:{seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} Left in stock- Order soon</small></p>
                <button onClick={() => props.handleAddProduct(props.product)} className="main-btn"><FontAwesomeIcon icon={faShoppingCart} />Add to Cart</button>
            </div>

        </div>
    );
};

export default Product;