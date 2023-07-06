import React from 'react'
import RegistrationForm from '../components/RegistrationForm'
import '../assets/css/AuthForm.css'


export default function Registration() {
  return (
    <>
        <section >
          <div className='form-container'>
            <h1>Registration</h1>
            <RegistrationForm/>
          </div>
        </section>
    </>
  )
}
