import React, { useState } from 'react';
import fakeData from '../../../fakeData';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        // console.log('product', product);
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                    {
                        products.map(pd => <Product handleAddProduct={handleAddProduct} product={pd}></Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                {/* <h1>product</h1>
                <h4>Order Summary: {cart.length}</h4> */}
            </div>

        </div>
    );
};

export default Shop;