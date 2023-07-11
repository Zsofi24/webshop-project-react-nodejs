import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formValidation } from '../utils/formValidation';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import { BiLock } from 'react-icons/bi';
import '../assets/css/AuthForm.css';
import { userService } from '../services/userServices';
import { UserAuthContext } from '../contexts/UserAuthContext';

export default function LoginForm() {

    const navigate = useNavigate()
    const [ errorMessage, setErrorMessage ] = useState(null);
    const { user, setUser } = useContext(UserAuthContext);

    const [formData, setFormData] = useState({
        email: {
            value: "",
            valid: false
        },
        password: {
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
    }

    function loginSubmit(e) {
        e.preventDefault();
        userService.userLogin({email: formData.email.value, password: formData.password.value})
            .then(resp => resp.json())
            .then(data => { 
                console.log(data)
                setUser(data)
                navigate('/')
            })
    }

  return (
    <>
        {user?.name && <h1>{user.name}</h1>}
                <form className='login-form auth-form' onSubmit={(e) => loginSubmit(e)}>
                    {/* {message ? <h1 className='login-message'>{message}</h1> : <h2>log in</h2>*/}
                    {errorMessage && <span>{errorMessage}</span>}
                    <div className='input-container'>
                        <fieldset>
                            <span><MdOutlineAlternateEmail /></span>
                            <input
                                type='text'
                                name='email'
                                id='email'
                                value={formData.email.value}
                                placeholder='email'
                                onChange={(e) => handleChange(e)}
                            />
                        </fieldset>
                        <span className={`${formData.email.valid ? "valid" : "invalid"}`}>{formData.email.valid ?  <GiCheckMark /> : "X"}</span>
                    </div>

                    <div className='input-container'>
                        <fieldset>
                            <span><BiLock /></span>
                            <input
                                type='password'
                                name='password'
                                placeholder='password'
                                value={formData.password.value}
                                onChange={(e) => handleChange(e)}
                            />
                        </fieldset>
                        <span className={`${formData.password.valid ? "valid" : "invalid"}`}>{formData.password.valid ? <GiCheckMark /> : "X"}</span>
                    </div>
                    
                    <button type='submit'>bejelentkezés</button>
                </form>
        </>
  )
}
