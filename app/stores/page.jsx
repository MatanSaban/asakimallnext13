import ShopInArchive from 'app/stores/ShopInArchive'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import storePlaceHolder from '../../public/media/storeplaceholder.webp'
import ShopsList from './ShopsList'




function StoresIndexPage() {
    return (
        <main className='index storesPage'>
            <h1>החנויות באתר</h1>
            <div className='archive'>
                <ShopsList />
            </div>
        </main>
    )
}

export default StoresIndexPage