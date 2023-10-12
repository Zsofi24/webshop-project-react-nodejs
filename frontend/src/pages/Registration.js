import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiFillExclamationCircle } from 'react-icons/ai';
import RegistrationForm from '../components/RegistrationForm'
import { formValidation } from '../utils/formValidation';
import { authService } from '../services/authService';

export default function Registration() {

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      email: {
          value: "",
          valid: false
      },
      password: {
          value: "",
          valid: false
      },
      username: {
          value: "",
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
    setErrorMessage("")
  }

  function submitRegistration(e) {
    e.preventDefault();
    const invalid = Object.values(formData).find(element => !element.valid);
    const empty = Object.values(formData).find(element => !element.value)

    if(empty) {
        setErrorMessage("Minden mező kitöltése kötelező!");
        return
    }
    if(invalid)  {
        setErrorMessage("Minden mezőt helyesen töltsön ki!");
        return
    } 
  
    authService.userRegist({email: formData.email.value, password: formData.password.value, username: formData.username.value})
        .then(resp => {
            console.log(resp, "resp regist");
            if(resp.ok) navigate('/belepes')
            else setErrorMessage("Már létezik ilyen email!")
        })  
  }

  return (
    <>
        <section className='login-regist' >
          <div className='form-container'>
            <h3 className='heading-3'>Ez az első látogatásod?</h3>
            <div className='form-container__message--error'>{errorMessage ? ( <><AiFillExclamationCircle/> {errorMessage}</> ) : ""}</div>
            <RegistrationForm
              formData={formData}
              handleChange={handleChange}
              submitRegistration={submitRegistration}
            />
          </div>
        </section>
    </>
  )
}
