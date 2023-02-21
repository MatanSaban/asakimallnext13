import ShopInArchive from "app/stores/ShopInArchive";
import { getStores } from "@/lib/prisma/stores"


const ShopsList = async () => {
    const { stores } = await getStores();

    return (
        stores?.map((shop) => {
            return (
                <ShopInArchive key={shop.id} shopData={shop} />
            )
        })
    )
}


export default ShopsList 