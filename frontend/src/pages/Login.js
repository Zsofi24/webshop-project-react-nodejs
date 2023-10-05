import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <section className='login-regist'>

        <div className='form-container'>
            <h3 className='heading-3'>Már regisztráltál?</h3>
            <LoginForm/>
            <p>még nincs fiókja? <Link className='regist-link' to={'/regisztracio'}>regisztráljon</Link></p>
        </div>

      </section>
    </>
  )
}
