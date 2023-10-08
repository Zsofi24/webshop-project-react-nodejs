import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { Link, useLoaderData } from 'react-router-dom';

export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');  
}

export default function Login() {
  
  const message = useLoaderData();
  
  return (
    <>
      <section className='login-regist'>

        <div className='form-container'>
            <h3 className='heading-3'>Már regisztráltál?</h3>
            <h4 className='heading-message'>{message}</h4>
            <LoginForm/>
            <p>még nincs fiókja? <Link className='regist-link' to={'/regisztracio'}>regisztráljon</Link></p>
        </div>

      </section>
    </>
  )
}
