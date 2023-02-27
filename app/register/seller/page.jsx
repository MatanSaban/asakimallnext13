"use client"

import React, { useEffect, useState } from 'react'
import SellersForm from './SellersForm'
import cookieCutter from "cookie-cutter";
import { userIdFromToken } from 'app/functions';
import axios from 'axios';
import { redirect } from 'next/navigation';



function SellerRegisterPage() {

    const [categories, setCategories] = useState();
    const [storeFields, setStoreFields] = useState({
        name: '',
        slug: '',
        categoryId: ''
    });
    const [loading, setLoading] = useState();
    const [redirectUser, setRedirectUser] = useState(false)

    useEffect(() => {
        if (redirectUser) {
            redirect('/my-account/store-management')
        }
    },[redirectUser])


    const handleField = (e) => {
        const fieldName = e.target.name;
        let fieldInput = e.target.value
        if (fieldName === 'slug') {
            fieldInput = fieldInput.replaceAll(/ /g, "")
        }
        setStoreFields({ ...storeFields, [fieldName]: fieldInput });
    }

    useEffect(() =>{
        const getCategories = async () => {
            const res = await fetch('/api/categories/');
            const {categories} = await res.json();
            setCategories(categories)
        }
        getCategories();
    },[])


    const handleSubmit = (e) => {
        e.preventDefault();
        const userToken = cookieCutter.get("userToken")
        const userId = userIdFromToken(userToken)
        let sellerId = '';
        let storeId = '';
        
        axios.put(`/api/users/${userId}`, {
            hasStore : true,
            role : 'SELLER'
        }).then((res) => {
            console.log('res 0')
            console.log(res)
            if (res.statusText === 'OK') {
                setLoading('צובעים את הקירות של החנות החדשה שלך')
                sellerId = res.data.sellerId;
                axios.put(`/api/sellers/${res.data.data.sellerId}`, {
                    usersId : userId
                }).then((res) => {
                    if (res.statusText === 'OK') {
                        setLoading('מנקים את החנות')
                        console.log('res 1')
                        console.log(res)
                        axios.post(`/api/stores`, {
                            "published":false,
                            "name":storeFields.name,
                            "slug":storeFields.slug,
                            "sellersId":sellerId,
                            "categoryId":storeFields.categoryId
                        }).then((res) => {
                            setLoading('תולים את השלט')
                            console.log('res 2')
                            console.log(res)
                            storeId = res.data.data.id;
                            // console.log(res)
                            axios.put(`/api/sellers/${sellerId}`, {
                                storeId : storeId
                            }).then((res) => {
                                console.log('res 3')
                                console.log(res)
                                setLoading('החנות שלך מוכנה, מיד מעבירים אותך לעמוד הניהול')
                                setTimeout(() => {
                                    setRedirectUser(true)
                                }, 1500);
                                // end
                                // dont forget to check if is not successful, if so, remove setting from previous api calls 

                            })
                        })
                    }
                })
            }
        })


        
    }


    return (
        <main className='SellerRegisterPage'>
            <div>
                <h1>פתיחת חנות בעסקימול</h1>
                <p>
                    ברוך הבא לפתיחת החנות שלך בעסקימול! 
                    <br />
                    מלא/י את הטופס הקצר ולחץ/י על פתיחת חנות 
                    <br />
                    לאחר מכן ייפתחו לך אפשרויות ניהול החנות המלאות הכוללות <br />
                    הוספת וניהול מוצרים, פרסום החנות באתר, ניהול ערכת צבעי החנות ועוד.. <br />
                    אז למה את/ה מחכה? בהצלחה!
                </p>
            </div>
            <SellersForm handleSubmit={handleSubmit} handleField={handleField} categories={categories}/>
            {loading && loading}
        </main>
    )
}

export default SellerRegisterPage 