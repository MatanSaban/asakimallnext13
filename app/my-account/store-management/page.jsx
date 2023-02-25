'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import StoreDesign from './StoreDesign';
import StoreMain from './StoreMain';
import StoreProducts from './StoreProducts';
import StoreSettings from './StoreSettings';
import NewProduct from './NewProduct';
import cookieCutter from 'cookie-cutter'
import { userIdFromToken } from 'app/functions';
import axios from 'axios';

function StoreManagment() {
  const [userData, setUserData] = useState();
  const [storeDataProp, setStoreDataProp] = useState();
  const [loading, setLoading] = useState(false);
  const [reRender, setRerender] = useState(0);
  const reRenderData = () => {
      setRerender(reRender + 1)
  }
  const [childPage, setChildPage] = useState();



  useEffect(() => {
      setLoading(true);
      const userToken = cookieCutter.get("userToken")
      const userId = userIdFromToken(userToken) 
      const getData = async () => {
          const getUserData = axios.get(`/api/users/${userId}`);
          const userData = await getUserData;
          setUserData(await userData?.data?.user);
          if (userData?.data?.user) {
            const getSellerData = axios.get(`/api/sellers/${userData.data.user.sellerId}`);
            const sellerData = await getSellerData;
            const storeId = await sellerData?.data?.seller.storeId
            const getStoreData = axios.get(`/api/stores/${storeId}`);
            const storeData = await getStoreData;
            const getProducts = await axios.get(`/api/products/${storeId}`);
            const theProducts = await getProducts.data.products;
            let newStoreData = storeData.data.store
            newStoreData.products = theProducts
              setStoreDataProp(newStoreData);
              setChildPage(<StoreMain userData={await userData?.data?.user} storeData={newStoreData} title={'ניהול החנות שלי'} />)
              if (storeData?.data?.store) {
                setLoading(false)
              }
          }
      }
      getData(); 
  },[reRender])

  const updateProducts = (newProducts) => {
    const oldStoreData = storeDataProp;
    oldStoreData.products = newProducts;
    const newStoreData = oldStoreData;
    setStoreDataProp(newStoreData)
    console.log('updated products')
    console.log('updated products')
    console.log(newProducts)
    console.log('updated products')
    console.log('updated products')
  }

  const handlePageChange = (comp) => {
    reRenderData();
    setChildPage(comp)
  }
  
  return (
    <div className="storeManagmentPage">
    {loading ? 'טוען את הנתונים' :
        <>
            <aside>
                <h3>תפריט החנות שלי</h3>
                <ul>
                    <li>
                        <button onClick={() => setChildPage(<StoreMain userData={userData} storeData={storeDataProp} title={'ניהול החנות שלי'} />)}>ראשי</button>
                    </li>
                    <li>
                        <button onClick={() => setChildPage(<StoreSettings reRenderData={reRenderData} userData={userData} storeData={storeDataProp}  title={'הגדרות החנות'}/>)}>הגדרות החנות</button>
                    </li>
                    <li>
                        <button onClick={() => setChildPage(<StoreDesign reRenderData={reRenderData} userData={userData} storeData={storeDataProp} title={'עיצוב החנות'}/>)}>עיצוב החנות</button>
                    </li>
                    <li>
                        <button onClick={() => setChildPage(<StoreProducts reRenderData={reRenderData} userData={userData} storeData={storeDataProp} updateProducts={updateProducts} title={'ניהול מוצרים'}/>)}>ניהול מוצרים</button>
                        <ul>
                          <li>
                            <button onClick={() => setChildPage(<NewProduct reRenderData={reRenderData} userData={userData} storeData={storeDataProp} updateProducts={updateProducts} title={'הוספת מוצר חדש'}/>)}>הוספת מוצר חדש</button>
                          </li>
                        </ul>
                    </li>
                </ul>
            </aside>
            <main>
                {childPage}
            </main>
        </>
    }
</div>
  )
}

export default StoreManagment
