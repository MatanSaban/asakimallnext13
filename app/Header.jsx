"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Logo from '../public/media/Logo.svg'
import LoginPopup from "./LoginPopup"
import cookieCutter from "cookie-cutter";
import { redirect } from "next/navigation"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import SideCart from "./SideCart"




function Header(props) {

    const onlyForLoggedInUsersArray = [
        '/my-account',
    ]
    const onlyForNotLoggedInUsersArray = [
        '/register'
    ]


    const [showPopup, setShowPopup] = useState(false);
    const [popupOn, setPopupOn] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartPopup, setCartPopup] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const handleCart = (bool) => {
        if (bool === false) {
            setShowCart(false)
            setTimeout(() => {
                setCartPopup(false)
            }, 600);
        }
        if (cartPopup) {
            setShowCart(false)
            setTimeout(() => {
                setCartPopup(false)
            }, 600);
        } else {
            setCartPopup(true)
            setTimeout(() => {
                setShowCart(true)
            }, 400);
        }
    }

    const checkLoggedInUser = (bool) => {
        bool ? setIsLoggedIn(true) : setIsLoggedIn(false)
    }

    const handlePopup = (bool) => {
        bool ?
            setTimeout(() => {
                setShowPopup(true);
                setTimeout(() => {
                    setPopupOn(true)
                }, 500);
            }, 0)
            :
            setTimeout(() => {
                setPopupOn(false)
                setTimeout(() => {
                    setShowPopup(false)
                }, 500);
            }, 0);
    }

    const logout = () => {
        cookieCutter.set('loggedIn', '', { expires: new Date(0) })
        cookieCutter.set('userToken', '', { expires: new Date(0) })

        setIsLoggedIn(false);
        window.location.replace('/')

    }

    useEffect(() => {
        const loggedInCookie = cookieCutter.get('loggedIn')
        const userTokenCookie = cookieCutter.get('userToken')
        setIsLoggedIn(props.isLoggedIn)
        if (!props.isLoggedIn) {
            onlyForLoggedInUsersArray.forEach((pagePath) => {
                if (window.location.pathname.includes(pagePath)) {
                    console.log("not logged in and in restricted page")
                    window.location.replace('/');
                }
            })
        }
        if (props.isLoggedIn) {
            onlyForNotLoggedInUsersArray.forEach((pagePath) => {
                if (window.location.pathname.includes(pagePath)) {
                    if (window.location.pathname !== '/register/seller') {
                        window.location.replace('/');
                    } else {
                        if (props.userHasStore === true) {
                            window.location.replace('/');
                        }
                    }
                }
            })
        }
    }, [])


    return (
        <div style={{ position: 'relative', maxWidth: '100vw', zIndex: '99' }}>
            {showPopup && <LoginPopup handlePopup={handlePopup} popupOn={popupOn} checkLoggedInUser={checkLoggedInUser} />}
            {cartPopup && <SideCart handleCart={handleCart} isLoggedIn={props.isLoggedIn} showCart={showCart} userCart={props.userCart} />}
            <header>
                <div className="LogoDiv">
                    <Link href="/"><Image src={Logo} alt="logo" /></Link>
                </div>
                <nav>
                    <ul>
                        <li onClick={() => handleCart(false)}><Link href="/">ראשי</Link></li>
                        <li onClick={() => handleCart(false)}><Link href="/stores">חנויות</Link></li>
                        <li onClick={() => handleCart(false)}><Link href="/products">מוצרים</Link></li>
                        <li onClick={() => handleCart(false)}><Link href="/categories">קומות הקניון</Link></li>
                    </ul>
                </nav>
                <div className="userDiv">
                    {!isLoggedIn ?
                        <>
                            <Link href="register"><button>הרשמה</button></Link>
                            <button onClick={() => handlePopup(true)}>התחברות</button>
                        </>
                        :
                        <>
                            {!props.userHasStore && <Link href='/register/seller'><button className="openStore">פתיחת חנות</button></Link>}
                            <Link href='/my-account'><button>החשבון שלי</button></Link>
                            <button className="logoutButton" onClick={() => logout()}>התנתקות</button>
                        </>
                    }
                    <button onClick={() => handleCart()} className="cartIcon"><AiOutlineShoppingCart /></button>
                </div>
            </header>
        </div>
    )
}

export default Header 