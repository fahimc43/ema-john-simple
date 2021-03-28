import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push("/shipment");
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        
        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

        // const cartProducts = productKeys.map( key => {
        //     const product = fakeData.find( pd => pd.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
        // });
        // setCart(cartProducts);
        
    }, []);

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt=""/>        
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map( pd => <ReviewItem 
                        key={pd.key} 
                        removeProduct={removeProduct} 
                        product={pd}></ReviewItem>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                    <Cart cart={cart}>
                        <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
                    </Cart>
            </div>
            
        </div>
    );
};

export default Review;