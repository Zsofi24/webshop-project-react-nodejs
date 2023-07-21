import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <section>
        <div className='form-container'>
            <h1>Login</h1>
            <LoginForm/>
            <p>nincs még fiókja? <Link className='regist-link' to={'/regisztracio'}>regisztráljon</Link></p>
        </div>
      </section>
    </>
  )
}
