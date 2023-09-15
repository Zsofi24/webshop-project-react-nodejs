import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <section className='flex-wrapper'>
        <div className='form-img'>        </div>

        <div className='form-container'>
            <h1>bejelentkezés</h1>
            <LoginForm/>
            <p>még nincs fiókja? <Link className='regist-link' to={'/regisztracio'}>regisztráljon</Link></p>
        </div>

      </section>
    </>
  )
}
