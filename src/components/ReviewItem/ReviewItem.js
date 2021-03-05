import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    // console.log(key);
    return (
        <div className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity:{quantity}</p>
            <p>${price}</p>
            <br/>
            <button 
            className="main-btn"
            onClick={() => props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;