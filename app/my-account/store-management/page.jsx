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
import Loader from 'app/Loader';
import { storage } from "app/firebase";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import { uuid as v4 } from 'uuidv4';

function StoreManagment() {
  const [userData, setUserData] = useState();
  const [storeDataProp, setStoreDataProp] = useState(null);
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
          console.log('userData')
          console.log(userData)
          setUserData(await userData?.data?.user);
          if (userData?.data?.user) {
            console.log('userData?.data?.user?.sellerId')
            console.log(userData?.data?.user?.sellerId)
            const getSellerData = await axios.get(`/api/sellers/${userData?.data?.user?.sellerId}`);
            console.log('getSellerData')
            console.log(getSellerData)
            const sellerData = await getSellerData?.data;
            const storeId = await sellerData?.seller?.storeId
            const getStoreData = axios.get(`/api/stores/${storeId}`);
            const storeData = await getStoreData;
            if (storeData?.data?.store) {
              setLoading(false)
            }
            const getProducts = await axios.post(`/api/products/${storeId}`, {});
            const theProducts = await getProducts.data.data;
            let newStoreData = await storeData.data.store
            if (newStoreData) {
              newStoreData.products = theProducts
            }
              setStoreDataProp(newStoreData);
              setChildPage(<StoreMain userData={await userData?.data?.user} storeData={newStoreData} title={'ניהול החנות שלי'} />)
          }
      }
      console.log('useEffect from StoreProducts')
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




  const handleUploads = async (array, productId) => {
    console.log('handleUploads starts')
    let mainImage;
    let galleryImages = [];

    if (typeof array[0] === 'object') {
      // If main image exists, upload it
      const path = `images/users/userId_${userData.id}/storeId_${storeDataProp.id}/productId_${productId}/${array[0].name+'_'+v4()}`
      const imageRef = ref(storage, path);
      const mainImageUploadTask = uploadBytes(imageRef, array[0]);
      const mainImageUploadTaskSnapshot = await mainImageUploadTask;
      const mainImageUrl = await getDownloadURL(mainImageUploadTaskSnapshot.ref);
      mainImage = mainImageUrl;
    }
  
    if (array[1].length > 0) {
      // If gallery images exist, upload them and save their URLs
      const galleryUploadPromises = array[1].map((file) => {
        const path = `images/users/userId_${userData.id}/storeId_${storeDataProp.id}/productId_${productId}/${file.name+'_'+v4()}`
        const imageRef = ref(storage, path);
        return uploadBytes(imageRef, file).then((response) => {
          return getDownloadURL(response.ref);
        });
      });
      const galleryUrls = await Promise.all(galleryUploadPromises);
      galleryImages = galleryUrls;
    }
  
    return [mainImage, galleryImages];
  }

  async function outerFunction(array, productId) {
    const [mainImageUrl, galleryImageUrls] = await handleUploads(array, productId)
    return [mainImageUrl, galleryImageUrls];
  }
  
  useEffect(() => {
    console.log('StoreDataProp from PAGE');
    console.log(storeDataProp);
    if (storeDataProp) { 
      const updateTheStoreData = async () => {
        const getProducts = await axios.post(`/api/products/${storeDataProp.id}`, {});
        const theProducts = await getProducts.data.data;
        let newStoreData = storeDataProp
        newStoreData.products = theProducts
        setStoreDataProp(newStoreData);
      }
      updateTheStoreData();
    }

  }, [storeDataProp]);
  
  const handleSubmit = async (e, object, toDo) => {
    e.preventDefault();
    try {
      
      switch (toDo) {
        case 'newProduct':
          let objectWithoutImages
          let images
          let product
          let productId 
          let updatedData;
          if (object.mainImage !== '' || object.gallery.length > 0) { // there are any images
            // 1 - separate the images from object and make a new clean of images object
            images = [object.mainImage, [...object.gallery]]
            object.mainImage = '';
            object.gallery = [];
            objectWithoutImages = object;

            // 2 - send api to get a product id 
            const makeProduct = await axios.post('/api/products', objectWithoutImages);
            product = await makeProduct.data.data
            productId = await product.id;
            // 3 - upload the files and get the urls for main image and gallery.
            const uploads = outerFunction(images, productId);
            const uploadsRes = await uploads;
              if (uploadsRes[0]) { // there is a main image
                object.mainImage = uploadsRes[0];
              }
              if (uploadsRes[1]) { // there is a gallrey
                object.gallery = uploadsRes[1];
              }
              console.log('the object')
              console.log(object)
              axios.put(`/api/products/${productId}`, object).then((res) => {
                product = res.data.data
                const updatedProducts = [...storeDataProp.products, product];

              setStoreDataProp({...storeDataProp,products: updatedProducts});
              console.log('StoreDataProp from PAGE')
              console.log('StoreDataProp from PAGE')
              console.log('StoreDataProp from PAGE')
              console.log(storeDataProp)
              })

          } else { // there are no images at all
              const getProducts = await axios.post('/api/products', object);
              const product = await getProducts.data.data
              
              console.log(product)
              if (getProducts.statusText === 'OK') {
                console.log('getProducts.statusText === OK')
                const updatedProducts = [...storeDataProp.products, product];
                await setStoreDataProp({...storeDataProp, products: updatedProducts});
                
                
                setTimeout(() => {
                  console.log('updatedData')
                  console.log(storeDataProp.products)
                  
                }, 1000);
                await setChildPage(<StoreMain userData={userData} storeData={storeDataProp} title={'ניהול החנות שלי'} />)
                setTimeout(() => {
                  
                }, 5000);
                
                return setChildPage(<NewProduct storeData={storeDataProp} userData={userData} updateProducts={updateProducts} handleSubmit={handleSubmit} title={'הוספת מוצר חדש'}/>) ;
              }


            
            }
        case 'editProducts':
          
          break;
          case 'deleteProducts':
            const idsToDelete = [];
            let updatedStoreData = { ...storeDataProp };
            const table = document.querySelector('table');
            object.forEach((row) => {
              idsToDelete.push(row.id)
            });
            console.log('its delete products')
            console.log(idsToDelete)
            
            const deletePromises = idsToDelete.map(async (productId) => {
              try {
                await axios.delete(`/api/products/${productId}`);
                console.log(`Product ${productId} deleted successfully.`);
              } catch (error) {
                console.error(`Error deleting product ${productId}: ${error}`);
              }
            });
            
            console.log('loop about to start')
            Promise.all(deletePromises).then(() => {
              idsToDelete.forEach((productId) => {
                const tableRow = table.querySelector(`tr#${CSS.escape(productId)}`);
                if (tableRow) {
                  tableRow.style.backgroundColor = 'red';
                  setTimeout(() => {
                    updatedStoreData.products = updatedStoreData.products.filter((product) => product.id !== productId);
                    setStoreDataProp(updatedStoreData);
                  }, 1000);
                }
              });
              console.log('loop ends');
              console.log(updatedStoreData);
              return true;
            });
            
            break;
                    default:
            break;
        }
      } catch (error) {
      }
      
      return true;
    }

    const updateStoreData = (object) => {

		// Object.keys(object).map((fieldName) => {
		// 	console.log(fieldName)
		// 	console.log(object[[fieldName]])
			
		// 	console.log({...storeDataProp, [fieldName] : object[fieldName]})
		// })
		
		setStoreDataProp(object)
    }

    const setChild = (childName) => {

      switch (childName) {
        case 'NewProduct':
          setChildPage(<NewProduct reRenderData={reRenderData} userData={userData} storeData={storeDataProp} updateProducts={updateProducts} handleSubmit={handleSubmit} title={'הוספת מוצר חדש'}/>)
          break;
      
        default:
          break;
      }

    }
    

  return (
    <div className="storeManagmentPage">
    {loading ? <Loader title={'טוען את החנות שלך'}/> :
        <>
            <aside>
                <h3>תפריט החנות שלי</h3>
                <ul>
                    <li>
                        <button onClick={() => setChildPage(<StoreMain setChild={setChild} userData={userData} storeData={storeDataProp} title={'ניהול החנות שלי'} />)}>ראשי</button>
                    </li>
                    <li>
                        <button onClick={() => setChildPage(<StoreSettings updateStoreData={updateStoreData} reRenderData={reRenderData} userData={userData} storeData={storeDataProp}  title={'הגדרות החנות'}/>)}>הגדרות החנות</button>
                    </li>
                    <li>
                        <button onClick={() => setChildPage(<StoreDesign reRenderData={reRenderData} userData={userData} storeData={storeDataProp} title={'עיצוב החנות'}/>)}>עיצוב החנות</button>
                    </li>
                    <li>
                        <button onClick={() => setChildPage(<StoreProducts reRenderData={reRenderData} userData={userData} storeData={storeDataProp} updateProducts={updateProducts} handleSubmit={handleSubmit} title={'ניהול מוצרים'}/>)}>ניהול מוצרים</button>
                    </li>
                    <li>
                        <button onClick={() => setChildPage(<NewProduct reRenderData={reRenderData} userData={userData} storeData={storeDataProp} updateProducts={updateProducts} handleSubmit={handleSubmit} title={'הוספת מוצר חדש'}/>)}>הוספת מוצר חדש</button>
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
