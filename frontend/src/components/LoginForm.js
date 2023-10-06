import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLock } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillExclamationCircle } from 'react-icons/ai';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { formValidation } from '../utils/formValidation';
import { userService } from '../services/userServices';
import { UserAuthContext } from '../contexts/UserAuthContext';
import Button from '../components/Button';

export default function LoginForm() {

    const navigate = useNavigate();
    const [ errorMessage, setErrorMessage ] = useState(null);
    const { user, setUser } = useContext(UserAuthContext);
    const [ passwordVisible, setPasswordVisible ] = useState(false);

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
        userService.userLogin({email: formData.email.value, password: formData.password.value})
            .then(data => { 
                console.log(data, "data")
                setUser(data)
                // navigate('/')
            })
            .catch(err => setErrorMessage("Nem megfelelő email vagy jelszó!"))
    }

  return (
    <>
        {user?.name && <h1>{user.name}</h1>}
                <form className='login-form auth-form' onSubmit={(e) => loginSubmit(e)}>
                    <div className='auth-form__message--error'>{errorMessage ? ( <><AiFillExclamationCircle/> {errorMessage}</> ) : ""}</div>
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
        </>
  )
}
