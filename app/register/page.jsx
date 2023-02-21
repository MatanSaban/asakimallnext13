"use client"
import { authenticateUser } from 'app/Authenticate';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Form from './Form';


function UserRegisterPage() {

    const router = useRouter();



    const [userRegister, setUserRegister] = useState({
        firstname: "",
        lastname: "",
        email: "",
        mobilephone: "",
        password: "",
    })
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [fieldError, setFieldError] = useState(false);
    const [canSend, setCanSend] = useState(true);

    const handleField = (e) => {
        // console.log(e)
        const target = e.target
        const fieldName = target.name;
        const fieldInput = target.value

        // password confirmation
        if (fieldName == 'password') {
            if (fieldInput === passwordConfirm && fieldInput.length > 0) {
                setUserRegister({ ...userRegister, [fieldName]: fieldInput });
                setFieldError(false)
                setCanSend(true)
            } else {
                setUserRegister({ ...userRegister, [fieldName]: fieldInput });
                setFieldError(true)
                setCanSend(false)
            }
        } else if (fieldName == 'passwordConfirmation') {
            if (fieldInput === userRegister.password && fieldInput.length > 0) {
                setPasswordConfirm(fieldInput);
                setUserRegister({ ...userRegister, password: fieldInput })
                setCanSend(true)
                setFieldError(false)
            } else {
                setPasswordConfirm(fieldInput);
                setFieldError(true)
                setCanSend(false)
            }
        } else {
            setUserRegister({ ...userRegister, [fieldName]: fieldInput });
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (canSend) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "firstname": "משה",
                "lastname": "לוי",
                "email": "moshe@levi.com",
                "mobilephone": "05241337978"
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(userRegister),
                redirect: 'follow'
            };

            fetch("/api/users/", requestOptions)
                .then(response => response.json())
                .then(loginUser()).then(() => {
                    console.log('redirecting')
                    // router.push('/register/completed')

                })
                .catch(error => console.log('error', error));
        }
    }

    const loginUser = () => {
        const email = userRegister.email;
        const password = userRegister.password;

        authenticateUser(email, password)
    }

    return (
        <main className='registerPage wrapper'>
            <h1>הרשמה לעסקימול</h1>
            <p>בעמוד זה תוכל להירשם כלקוח לאתר עסקימול ולהינות מהטבות השמורות ללקוחות האתר בלבד!</p>
            <p>במידה וברצונך להירשם כמוכר ולפתוח חנות באתר, נא ללחוץ על &quot;הרשמה כמוכר&quot;</p>
            <div>
                <Link href={'/register/seller'}><button>הרשמה כמוכר</button></Link>
            </div>
            <Form handleSubmit={handleSubmit} handleField={handleField} fieldError={fieldError} />
        </main>
    )
}

export default UserRegisterPage