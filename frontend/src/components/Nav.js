import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi';
import { BsCart } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { UserAuthContext } from '../contexts/UserAuthContext';
import { authService } from '../services/authService';
import Profile from './Profile';

export default function Nav({ handleMouseEnter, handleMouseLeave, isProfileVisible }) {

  const { user, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();

  function logout() {
    authService
      .userLogout()
      .then(() => {
        setUser({});
        navigate('/')
      })
  }
  
  return (
    <nav className='navshop'>
      <div>
        <NavLink to='/'>F</NavLink>
      </div>
      <div className='navshop__elements'>
        <NavLink to='/termekek'>termékek</NavLink>
        <NavLink to='/admin'>admin</NavLink>
      </div>
      <div>
        { user?.email ?
        <>
          <div className='navshop__profile'>
            <NavLink to='/profile' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <AiOutlineUser />
            </NavLink>
            <Profile logout={logout} username={user.username} />
          </div>
        </>
          :
          <NavLink to='/belepes'><BiLogIn /></NavLink>
        }
        <NavLink to={`/kosar`}><BsCart/></NavLink>
      </div>     
    </nav>
  )
}
