import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Product = (props) => {
    // console.log(props);
    
    const { img, name, seller, price, stock, key } = props.product;
    // console.log(price);
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
            <Link to={"/product/"+key}><h3 className="product-name head-line">{name}</h3></Link>
                <p><small>By:{seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} Left in stock- Order soon</small></p>
                {props.showAddToCart && <button 
                className="main-btn" 
                onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} />Add to Cart
                </button>}
            </div>

        </div>
    );
};

export default Product;