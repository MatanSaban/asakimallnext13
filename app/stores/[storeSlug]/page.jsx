
import { getProductsByStoreId } from '@/lib/prisma/products'
import { getStoreBySlug } from '@/lib/prisma/stores'
import React from 'react'
import SingleProductInArchive from '../SingleProductInArchive'

const SingleStorePage = async ({ params }) => {
    const { store } = await getStoreBySlug(params.storeSlug)
    const { products } = await getProductsByStoreId(store.id)
    console.log("products")
    console.log(products)
    const storeSlug = params.storeSlug


    return (
        <main className='SingleStorePage'>

            {store?.name}
            <div className='productIndex'>
                {products.map((product) => {
                    return (
                        <SingleProductInArchive key={product.id} storeSlug={storeSlug} product={product} />
                    )
                })}
            </div>
        </main>
    )
}

export default SingleStorePage