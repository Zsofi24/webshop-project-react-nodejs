import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { Link, useLoaderData } from 'react-router-dom';
import {AiFillExclamationCircle} from 'react-icons/ai';
import { formValidation } from '../utils/formValidation';
import { authService } from '../services/authService';
import { UserAuthContext } from '../contexts/UserAuthContext';


export function loader({ request }) {
  return new URL(request.url).searchParams.get('message');  
}

export default function Login() {
  
  const message = useLoaderData();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserAuthContext);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const [formData, setFormData] = useState({
    email: {
        value: "ab@a.com",
        valid: false
    },
    password: {
        value: "12345",
        valid: false
    }
  })


  function handleChange(e) {
    const {value, name} = e.target;
    setFormData(prev => ({
        ...prev, 
        [name] : {
            value: value,
            valid: formValidation(name, value)
        }
    }))
  }

  function loginSubmit(e) {
    e.preventDefault();
    authService.userLogin({email: formData.email.value, password: formData.password.value})
        .then(data => { 
            setUser(data)
            if(data.isAdmin) navigate('/admin')
            else navigate('/', {state:{message: `Üdvözöljük, ${data.username}`}})
        })
        .catch(err => setErrorMessage(err.message))
  }
  
  return (
    <>
      <section className='login-regist'>

        <div className='form-container'>
            <h3 className='heading-3'>Már regisztráltál?</h3>
            <h4 className='heading-message'>{message}</h4>
            <div className='form-container__message--error'>{errorMessage ? ( <><AiFillExclamationCircle/> {errorMessage}</> ) : ""}</div>
            <LoginForm
              handleChange={handleChange}
              loginSubmit={loginSubmit}
              formData={formData}
            />
            <p>még nincs fiókja? <Link className='regist-link' to={'/regisztracio'}>regisztráljon</Link></p>
        </div>

      </section>
    </>
  )
}
