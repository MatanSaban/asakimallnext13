'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'



const handleAddToCart = (e) => {
    e.preventDefault();
    const cartIcon = document.querySelector("header .cartIcon")
    let rect = cartIcon?.getBoundingClientRect();
    let rectTop = rect?.top;
    let rectLeft = rect?.left;
    const productId = e.target.name;
    const product = e.target.closest(".product")
    const imageWrapper = product.querySelector(".productImage")
    let imgRect = imageWrapper?.getBoundingClientRect();
    let imgRectTop = imgRect?.top;
    let imageRectLeft = imgRect?.left;
    const image = imageWrapper.querySelector("img")
    const imageClone = image.cloneNode(true);
    imageWrapper.append(imageClone)
    // sits on product

    // setTimeout(() => {
    // }, 0);
    imageClone.style = `position:fixed; top:${imgRectTop}px; left:${imageRectLeft}px; transform: translate(30%, 30%); box-shadow: 0 0 10px #00000090; z-index: -1;     border-radius:50%; width: 200px; height: 200px; opacity:1;  transition: all 1s ease; `;

    setTimeout(() => {
        const style2 = `position:fixed; top:${imgRectTop}px; left:${imageRectLeft}px; transform: translate(110%, 110%);box-shadow: 0 0 10px #00000090; z-index: 112; border-radius:50%; width: 100px; height: 100px;opacity:1 ; transition: all 1s ease; `;
        imageClone.style = style2;
    }, 200);

    setTimeout(() => {
        const style3 = `position:fixed;     top:${rectTop}px;     left:${rectLeft}px;       transform: translate(80%, -100%); box-shadow: 0 0 10px #00000090; z-index: 112;   border-radius:50%; width: 30px; height: 30px;   opacity:1 ; transition: all 1s ease`;
        imageClone.style = style3;
    }, 1500);

    setTimeout(() => {
        const style4 = `position:fixed;     top:${rectTop}px;     left:${rectLeft}px;       transform: translate(350%, 350%); box-shadow: 0 0 10px #00000090; z-index: 112;   border-radius:50%; width: 0px; height: 0px;   opacity:0.5 ; transition: all 2s ease`;
        imageClone.style = style4;
    }, 2400);
    setTimeout(() => {
        const style5 = `position:fixed;     top:${rectTop}px;     left:${rectLeft}px;       transform: translate(400%, 400%); box-shadow: 0 0 10px #00000090; z-index: 0;   border-radius:50%; width: 0px; height: 0px;   opacity:0 display:none; transition: all 5s ease;`;
        imageClone.style = style5;
    }, 3500);
    setTimeout(() => {
        const style5 = `position:fixed;     top:${rectTop}px;     left:${rectLeft}px;       transform: translate(400%, 400%); box-shadow: 0 0 10px #00000090; z-index: 0;   border-radius:50%; width: 0px; height: 0px;   opacity:0 display:none; transition: all 5s ease;`;
        imageClone.remove();
    }, 3500);
    setTimeout(() => {
        cartIcon.style = 'margin-top:20px'
    }, 3700);
    setTimeout(() => {
        cartIcon.style = 'margin-top:0'
    }, 4000);


}





function SingleProductInArchive(props) {
    const storeSlug = props?.storeSlug;
    const product = props?.product;

    return (
        <Link href={`/stores/${storeSlug}/${product?.id}`} className='product' key={product?.id}>
            <div className='productDetails'>
                <div className='productImage'>
                    <img src={'https://greendiamonds.co.il/wp-content/uploads/2022/10/%D7%98%D7%91%D7%A2%D7%AA-3-%D7%99%D7%94%D7%9C%D7%95%D7%9E%D7%99%D7%9D-%D7%96%D7%94%D7%91-%D7%A6%D7%94%D7%95%D7%91-%D7%9E%D7%A2%D7%91%D7%93%D7%94-1-300x300.jpg'} alt='product image' width={150} height={150} />
                </div>
            </div>
            <div className='productData'>
                <h3>{product?.name}</h3>
                <h4>{(product?.price * 1.17).toFixed(2)} ₪ כולל מע&quot;מ</h4>
                <button name={product?.id} onClick={(e) => handleAddToCart(e)}>הוספה לסל</button>
            </div>
        </Link>
    )
}

export default SingleProductInArchive