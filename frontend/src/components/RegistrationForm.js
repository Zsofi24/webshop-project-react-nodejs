import { useState } from 'react'
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { BiLock } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { AiFillExclamationCircle, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { GiCheckMark } from 'react-icons/gi';
import Button from './button/Button';

export default function RegistrationForm({formData, handleChange, submitRegistration}) {

    const [ passwordVisible, setPasswordVisible ] = useState(false);

    return (
        <>
            <form className='registration-form auth-form' onSubmit={(e) => submitRegistration(e)}>
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
                        <span>{formData.email.valid && <GiCheckMark />}</span>
                    </fieldset>
                    <div className={`${formData.email.valid ? "valid" : formData.email.value ? "invalid" : ""} input-container__message`}>
                        {(!formData.email.valid && !formData.email.value) 
                            ? ""
                            : !formData.email.valid  
                                && <><AiFillExclamationCircle /> Helyes e-mail formátumot adjon meg!</>
                          }
                    </div>
                </div>
            
                <div className='input-container'>
                    <fieldset>
                        <span><BiLock /></span>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            name='password'
                            placeholder='jelszó'
                            value={formData.password.value}
                            onChange={(e) => handleChange(e)}
                        />
                        <span onClick={() => setPasswordVisible(prev => !prev)}>{passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }</span>
                        <span>{formData.password.valid && <GiCheckMark />}</span>
                    </fieldset>
                    <div className={`${formData.password.valid ? "valid" : formData.password.value ? "invalid" : ""} input-container__message`}>
                        {(!formData.password.valid && !formData.password.value) 
                            ? null
                            : !formData.password.valid  
                                && <><AiFillExclamationCircle /> Minimum 4 karakter</>
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
                        <span>{formData.username.valid && <GiCheckMark />}</span>
                    </fieldset>
                    <div className={`${formData.username.valid ? "valid" : formData.username.value ? "invalid" : ""} input-container__message`}>
                        {(!formData.username.valid && !formData.username.value) 
                            ? null
                            : !formData.username.valid  
                                && <><AiFillExclamationCircle /> Minimum 2 karakter</>
                          }
                    </div>
                </div>
                <Button type="login-regist">regisztráció</Button>
            </form>
        </>
    )
}
