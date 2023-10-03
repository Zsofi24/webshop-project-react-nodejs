import React, { useState } from 'react'
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BiLock } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi'
import {formValidation} from '../utils/formValidation.js';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userServices.js';


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
    }

    function submitRegistration(e) {
        e.preventDefault();
        const invalid = Object.values(formData).find(element => !element.valid)
        console.log(invalid);
        if(invalid) return 
        console.log(formData);
       
        userService.userRegist({email: formData.email.value, password: formData.password.value, username: formData.username.value})
            .then(resp => {
                console.log(resp, "resp regist");
                if(resp.ok) navigate('/belepes')
                else setErrorMessage("már létezik ilyen adat")
            })          
        
 
        
    }

    return (
        <>
            <form className='registration-form auth-form' onSubmit={(e) => submitRegistration(e)}>
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
                    <span className={`${formData.email.valid ? "valid" : "invalid"}`}>
                        {(!formData.email.valid && !formData.email.value) 
                            ? null
                            : formData.email.valid  
                                ? <GiCheckMark />
                                : "Helyes e-mail formátumot adjon meg!"
                          }
                    </span>
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
                    <span className={`${formData.password.valid ? "valid" : "invalid"}`}>
                        {(!formData.password.valid && !formData.password.value) 
                            ? null
                            : formData.password.valid  
                                ? <GiCheckMark />
                                : "Minimum 4 karakter"
                          }
                    </span>
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
                    <span className={`${formData.username.valid ? "valid" : "invalid"}`}>
                        {(!formData.username.valid && !formData.username.value) 
                            ? null
                            : formData.username.valid  
                                ? <GiCheckMark />
                                : "Minimum 2 karakter"
                          }
                    </span>
                </div>
                <button type='submit'>regisztráció</button>
            </form>
        </>
    )
}
