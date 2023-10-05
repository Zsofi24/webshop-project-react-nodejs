import React from 'react'
import RegistrationForm from '../components/RegistrationForm'
// import '../assets/css/AuthForm.css'


export default function Registration() {
  return (
    <>
        <section className='login-regist' >
          <div className='form-container'>
            <h3 className='heading-3'>Ez az első látogatásod?</h3>
            <RegistrationForm/>
          </div>
        </section>
    </>
  )
}
