import { emailOrPhoneExistCheck, updateUser } from 'app/functions';
import axios from 'axios';
import React, { useState } from 'react'

function MyProfile(props) {

  const [userProperties, setUserProperties] = useState({
    firstname: props?.userData?.firstname ? props?.userData?.firstname : '',
    lastname: props?.userData?.lastname ? props?.userData?.lastname : '',
    email: props?.userData?.email ? props?.userData?.email : '',
    mobilephone: props?.userData?.mobilephone ? props?.userData?.mobilephone : '',
  });
  const [error, setError] = useState(["",""]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFields = (e) => {
    console.log(e)
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    
    setUserProperties({ ...userProperties, [fieldName]: fieldValue });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const res = await emailOrPhoneExistCheck(userProperties.email,userProperties.mobilephone)
    const existQuery = res;

    // check if email or phone exist, server response
    if (existQuery && existQuery.length) {
      setLoading(false)
      existQuery.forEach((err) => {
        if (err === 'email') {
          console.log('email')
          setError([error[0] = "כתובת האימייל שהזנת קיימת במערכת", error[1] = error[1]])
        } 
        if (err === 'phone') {
          console.log('phone')
          setError([error[1] = "מספר הטלפון שהזנת קיים במערכת", error[0] = error[0]])
        }
      })
      setSuccess(false)
      return;
    } else { // reset the States
      setError(["",""]);
    }
    // all good here
    
    const update = await updateUser(props.userData.id,userProperties);
    const response = await update.data
    if (response === 'SUCCESS') {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        props.reRenderData();
      }, 1000);
    } else {
      setLoading(false)
      setSuccess(false)
      setError(["שגיאת שרת",""]);
    }
    

  }

  return (
    <div>
      <h1>{props?.title}</h1> 
      <div className='formWrapper'>
        <form onSubmit={handleSubmit}>
          <div className='section'>
            <div>
              <label htmlFor="firstname">שם פרטי</label>
              <input type="text" name="firstname" id="firstname" defaultValue={props?.userData?.firstname} onChange={(e) => {handleFields(e)}}/>
            </div>
            <div>
              <label htmlFor="lastname">שם משפחה</label>
              <input type="text" name="lastname" id="lastname" defaultValue={props?.userData?.lastname} onChange={(e) => {handleFields(e)}}/>
            </div>
          </div>
          <div className='section'>
            <div>
              <label htmlFor="email">אימייל</label>
              <input type="email" name="email" id="email" defaultValue={props?.userData?.email} onChange={(e) => {handleFields(e)}}/>
            </div>
            <div>
              <label htmlFor="mobilephone">טלפון נייד</label>
              <input type="number" name="mobilephone" id="mobilephone" defaultValue={props?.userData?.mobilephone} onChange={(e) => {handleFields(e)}}/>
            </div>
          </div>
          <button type="submit">שמירה</button>
        </form>
        {loading && <p className='loadingP'>טוען...</p>}
        {!loading && success && <p className='successP'>השינויים נשמרו בהצלחה! <br /> הינך מועבר/ת לעמוד החשבון הראשי</p>}
        {!loading && error && error.length > 0 && 
        error.map((errorText, index) => {
          return (
            <p key={index} className='errorP'>{errorText}</p>
          )
        })
        }
      </div>
    </div>
  )
}

export default MyProfile
