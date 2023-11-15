import React, { useState } from 'react';
import { BiLock } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import Button from './button/Button';

export default function LoginForm({handleChange, loginSubmit, formData}) {

    const [ passwordVisible, setPasswordVisible ] = useState(false);

  return (
    <form className='login-form auth-form' onSubmit={(e) => loginSubmit(e)}>
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
                >                    
                </input>
            </fieldset>
            {/* <span className={`${formData.email.valid ? "valid" : "invalid"}`}>{formData.email.valid ?  <GiCheckMark /> : "X"}</span> */}
        </div>

        <div className='input-container'>
            <fieldset>
                <span><BiLock /></span>
                <input
                    type={passwordVisible ? 'text' : 'password'}
                    name='password'
                    placeholder='password'
                    value={formData.password.value}
                    onChange={(e) => handleChange(e)}
                />
                <span onClick={() => setPasswordVisible(prev => !prev)}>{passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }</span>
            </fieldset>
            {/* <span className={`${formData.password.valid ? "valid" : "invalid"}`}>{formData.password.valid ? <GiCheckMark /> : "X"}</span> */}
        </div>
        
        <Button type="login-regist">bejelentkezés</Button>
    </form>
  )
}
