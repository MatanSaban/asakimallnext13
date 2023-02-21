'use client'
import cookieCutter from "cookie-cutter";

import React from 'react'

function SideCart(props) {


    const showCart = props?.showCart;
    const handleCart = () => props?.handleCart();
    const isLoggedIn = props?.isLoggedIn;
    let userCart = null
    if (isLoggedIn) {
        userCart = props?.userCart;
    } else {
        userCart = cookieCutter.get('userCart')
    }

    return (
        <div className={`popUpWrapper ${showCart ? 'showCart' : 'hideCart'}`}>
            <div onClick={() => handleCart()} className="background"></div>
            <div className={`cartPopup ${showCart ? 'showCart' : 'hideCart'}`}>
                <h3>העגלה שלי</h3>
                <div className="products">
                    <div className="productStoreWrapper" style={{ background: 'pink', textShadow: '0 0 10px black' }}>
                        <div className="product">
                            <div className="productImage"></div>
                            <div className="productTitleAndStore">
                                <h4>Store title</h4>
                                <h4>product title</h4>
                            </div>
                            <div className="productPriceAndAmount">
                                <p>price</p>
                                <p>amount</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="toPayment">מעבר לתשלום</button>
            </div>
        </div>
    )
}

export default SideCart