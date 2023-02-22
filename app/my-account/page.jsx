"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import cookieCutter from 'cookie-cutter'
import { userIdFromToken } from "app/functions";
import MyOrders from "./MyAccComps/MyOrders";
import ActiveOrders from "./MyAccComps/MyOrdersComp/ActiveOrders";
import CompletedOrders from "./MyAccComps/MyOrdersComp/CompletedOrders";
import MyAccountMain from "./MyAccComps/MyAccMain";
import MyProfile from "./MyAccComps/MyProfile";

function MyAccountLayout() {
    const [userData, setUserData] = useState();
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
            setUserData(await userData.data.user);
            if (userData.data.user) {
                setLoading(false)
                setChildPage(<MyAccountMain userData={userData.data.user} title={'החשבון שלי'} />)
            }
        }
        getData(); 
    },[reRender])
    



    return (
        <div className="MyAccountLayout">
            {loading ? 'טוען את הנתונים' :
                <>
                    <aside>
                        <h3>תפריט החשבון שלי</h3>
                        <ul>
                            <li>
                                <button onClick={() => setChildPage(<MyAccountMain userData={userData} title={'החשבון שלי'}/>)}>ראשי</button>
                            </li>
                            <li>
                                <button onClick={() => setChildPage(<MyProfile reRenderData={reRenderData} userData={userData} title={'הפרופיל שלי'}/>)}>הפרופיל שלי</button>
                            </li>
                            {userData?.hasStore && 
                                <li>
                                    <Link className="MyStoreManagement" href={'/my-account/store-management'}><button>ניהול החנות שלי</button></Link>
                                </li>
                            }
                            <li>
                                <button onClick={() => setChildPage(<MyOrders title={'ההזמנות שלי'}/>)}>ההזמנות שלי</button>
                                    <ul>
                                        <li>
                                            <button onClick={() => setChildPage(<ActiveOrders title={'הזמנות פעילות'}/>)}>הזמנות פעילות</button>
                                        </li>
                                        <li>
                                            <button onClick={() => setChildPage(<CompletedOrders title={'הזמנות שהושלמו'}/>)}>הזמנות שהושלמו</button>
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
    );
}

export default MyAccountLayout;
