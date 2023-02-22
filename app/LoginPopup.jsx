'use client'
import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import React, { useState } from 'react'
import { authenticateUser } from './functions';
import { redirect } from 'next/navigation';


function LoginPopup(props) {


    const [showPassword, setShowPassword] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState('notyet')
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const email = e.target[0].value
        const password = e.target[1].value
        const response = await authenticateUser(email, password).then((res) => {
            console.log("res")
            console.log(res)
            if (res === true) {
                setLoading(false)
                setIsLoggedIn(true)
                setTimeout(() => {
                    props.handlePopup(false)
                    props.checkLoggedInUser(true)
                    window.location.replace("/")
                }, 1500);
            } else {
                setLoading(false)
                setIsLoggedIn(false)
            }
        })
    }

    return (
        <div className={`popupModal loginPopup ${props.popupOn ? ' showPopup' : 'hidePopup'}`}>
            <div className='popupBackground' onClick={() => props.handlePopup(false)}></div>
            <div className={`popupContent ${props.popupOn ? 'showPopup' : 'hidePopup'}`} onClick={() => props.handlePopup(true)}>
                <button className='closePopup' onClick={() => props.handlePopup(false)}>X</button>
                <h3>התחברות</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <div>
                            <label htmlFor="email">אימייל</label>
                            <input type="email" name='email' id='email' />
                        </div>
                        <div>
                            <label htmlFor="password">סיסמא</label>
                            <input type={showPassword ? 'text' : 'password'} name='password' id='password' />
                            <i onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}</i>
                        </div>
                    </div>
                    <button type='submit'>התחברות</button>
                    {loading && <span>מאמת נתונים..</span>}
                    {isLoggedIn == true && <p>התחברת בהצלחה</p>}
                    {isLoggedIn == false && <p>שם המשתמש או הסיסמא אינם נכונים</p>}
                </form>
            </div>
        </div>
    )
}

export default LoginPopup