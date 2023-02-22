import React from 'react'
import { getProductById } from '@/lib/prisma/products'


const SingleProductPage = async ({params}) => {
    const {product} = await getProductById(params.productId)
  return (
    <main>
      <section>
        <div className='productImage'>
            <img src={product?.mainImage} alt={product?.name} />
        </div>
        <div className='productDetails'>
            <h1>{product?.name}</h1>
            <p>{product?.shortDescription}</p>
            <span>{product?.price}</span>
        </div>
      </section>
    </main>
  )
}

export default SingleProductPage
