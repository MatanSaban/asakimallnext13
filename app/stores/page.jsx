import React from 'react'
import ShopInArchive from './ShopInArchive'
import { getStores } from "@/lib/prisma/stores"


async function StoresIndexPage() {
    const { stores } = await getStores();
    return (
        <main className='index storesPage'>
            <h1>החנויות באתר</h1>
            <div className='archive'>
                {
                    stores?.map((shop) => {
                        return (
                            <ShopInArchive key={shop?.id} shopData={shop && shop} />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default StoresIndexPage