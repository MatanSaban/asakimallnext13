import { getCategoryById } from '@/lib/prisma/categories';
import { getProductsByStoreId } from '@/lib/prisma/products';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import storePlaceHolder from '../../public/media/storeplaceholder.webp'


async function ShopInArchive(props) {

    const shopData = props?.shopData; 

    const { category } = await getCategoryById(shopData?.categoryId)
    const { products } = await getProductsByStoreId(shopData.id)

    const categoryName = category.name;

    return (
        <div className='shop'>
            <div className='phone'>
                <div className='pergula'>
                    <div className='pergula_up'>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                    </div>
                    <div className='pergula_down'>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                        <div className='offWhite'></div>
                        <div className='wineRed'></div>
                    </div>
                </div>
                <div className='shopData'>
                    <Image width={300} height={150} src={storePlaceHolder} alt='shop cover image' />
                    <h2>{shopData.name}</h2>
                    <div className='shopData_category'>??????????????:{categoryName} </div>
                    <div className='shopData_productsCount'>???????????? ??????????: {products?.length}</div>
                    <p>??????, ?????? ?????? ???????? ???????? ?????????????? ???????????? ????</p>
                </div>
                <div className='storeButton'>
                    <Link href={`/stores/${shopData.slug}`}><button>?????????? ??????????</button></Link>
                </div>
            </div>
        </div>
    )
}

export default ShopInArchive