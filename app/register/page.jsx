"use client";
import { authenticateUser } from "app/functions";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import Form from "./Form";

function UserRegisterPage() {
    const router = useRouter();

    const [userRegister, setUserRegister] = useState({
        email: "",
        mobilephone: "",
        firstname: "",
        lastname: "",
        password: "",
        profileimage: "",
        coverimage: "",
        hasStore: false,
        cart: [],
        ordersIds: [],
    });
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [fieldError, setFieldError] = useState(false);
    const [canSend, setCanSend] = useState(true);
    const [loading, setLoading] = useState(false)

    const handleField = (e) => {
        // console.log(e)
        const target = e.target;
        const fieldName = target.name;
        const fieldInput = target.value;

        // password confirmation
        if (fieldName == "password") {
            if (fieldInput === passwordConfirm && fieldInput.length > 0) {
                setUserRegister({ ...userRegister, [fieldName]: fieldInput });
                setFieldError(false);
                setCanSend(true);
            } else {
                setUserRegister({ ...userRegister, [fieldName]: fieldInput });
                setFieldError(true);
                setCanSend(false);
            }
        } else if (fieldName == "passwordConfirmation") {
            if (fieldInput === userRegister.password && fieldInput.length > 0) {
                setPasswordConfirm(fieldInput);
                setUserRegister({ ...userRegister, password: fieldInput });
                setCanSend(true);
                setFieldError(false);
            } else {
                setPasswordConfirm(fieldInput);
                setFieldError(true);
                setCanSend(false);
            }
        } else {
            setUserRegister({ ...userRegister, [fieldName]: fieldInput });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let userId = ''
        let sellerId = ''
        canSend && axios.post(`/api/users`,userRegister).then((res) => {
                if (res.statusText === 'OK') {
                    userId = res.data.data.id;
                    axios.post(`/api/sellers`, {usersId: userId}).then((res) => {
                        if (res.statusText === 'OK') {
                            sellerId = res.data.data.id
                            axios.put(`/api/users/${userId}`, {sellerId: sellerId }).then((res) => {
                                if (res.statusText === 'OK') {
                                    setLoading(false)
                                    loginUser().then((res) => {
                                        if (res === true) window.location.href = '/'
                                    })
                                }
                            })
                        }
                    })
                }
            });
    };

    const loginUser = () => {
        const email = userRegister.email;
        const password = userRegister.password;
        const result = authenticateUser(email, password);
        return result;
    };

    return (
        <main className="registerPage wrapper">
            <h1>הרשמה לעסקימול</h1>
            <p>
                בעמוד זה תוכל להירשם כלקוח לאתר עסקימול ולהינות מהטבות השמורות
                ללקוחות האתר בלבד!
                <br />
                במידה וברצונך להירשם כמוכר ולפתוח חנות באתר, יש להירשם תחילה
                כלקוח ולאחר מכן תיפתח האפשרות.
            </p>
            <Form
                handleSubmit={handleSubmit}
                handleField={handleField}
                fieldError={fieldError}
            />
            {loading && <span>רושמים אותך...</span>}
        </main>
    );
}

export default UserRegisterPage;
