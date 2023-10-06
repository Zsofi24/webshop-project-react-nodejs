import React, { useState } from 'react'
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BiLock } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { GiCheckMark } from 'react-icons/gi';
import {formValidation} from '../utils/formValidation.js';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userServices.js';
import Button from '../components/Button';

export default function RegistrationForm() {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);
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
        console.log(invalid);
        if(empty) {
            setErrorMessage("Minden mező kitöltése kötelező!");
            return
        }
        if(invalid)  {
            setErrorMessage("Minden mezőt helyesen töltsön ki!");
            return
        } 
       
        userService.userRegist({email: formData.email.value, password: formData.password.value, username: formData.username.value})
            .then(resp => {
                console.log(resp, "resp regist");
                if(resp.ok) navigate('/belepes')
                else setErrorMessage("Már létezik ilyen email!")
            })  
    }

    return (
        <>
            <form className='registration-form auth-form' onSubmit={(e) => submitRegistration(e)}>
            <   div className='auth-form__message--error'>{errorMessage ? ( <><AiFillExclamationCircle/> {errorMessage}</> ) : ""}</div>
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
                    <div className={`${formData.email.valid ? "valid" : "invalid"} input-container__message`}>
                        {(!formData.email.valid && !formData.email.value) 
                            ? ""
                            : formData.email.valid  
                                ? <GiCheckMark />
                                : <><AiFillExclamationCircle /> Helyes e-mail formátumot adjon meg!</>
                          }
                    </div>
                </div>
            
                <div className='input-container'>
                    <fieldset>
                        <span><BiLock /></span>
                        <input
                            type='password'
                            name='password'
                            placeholder='jelszó'
                            value={formData.password.value}
                            onChange={(e) => handleChange(e)}
                        />
                    </fieldset>
                    <div className={`${formData.password.valid ? "valid" : "invalid"} input-container__message`}>
                        {(!formData.password.valid && !formData.password.value) 
                            ? null
                            : formData.password.valid  
                                ? <GiCheckMark />
                                : <><AiFillExclamationCircle /> Minimum 4 karakter</>
                          }
                    </div>
                </div>

                <div className='input-container'>
                    <fieldset>
                        <span><FaUser /></span>
                        <input
                            type='text'
                            name='username'
                            placeholder='felhasználónév'
                            value={formData.username.value}
                            onChange={(e) => handleChange(e)}
                        />
                    </fieldset>
                    <div className={`${formData.username.valid ? "valid" : "invalid"} input-container__message`}>
                        {(!formData.username.valid && !formData.username.value) 
                            ? null
                            : formData.username.valid  
                                ? <GiCheckMark />
                                : <><AiFillExclamationCircle /> Minimum 2 karakter</>
                          }
                    </div>
                </div>
                <Button type="login-regist">regisztráció</Button>
            </form>
        </>
    )
}
