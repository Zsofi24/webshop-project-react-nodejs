import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi';
import { BsCart } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { UserAuthContext } from '../contexts/UserAuthContext';
import { userService } from '../services/userServices';
import Profile from './Profile';
import '../assets/css/Profile.css';

export default function Nav({ handleMouseEnter, handleMouseLeave, isProfileVisible }) {

  const { user, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();

  function logout() {
    userService
      .userLogout()
      .then(() => {
        setUser({});
        navigate('/')
      })
  }
  
  return (
    <nav className='shop-nav'>
      <div>
        <NavLink to='/'>F</NavLink>
      </div>
      <div>
        <NavLink to='/termekek'>termékek</NavLink>
        <NavLink to='/admin'>admin</NavLink>
      </div>
      <div className='nav-profile'>
        <NavLink to={`/kosar`}><BsCart/></NavLink>
        {/* { !user.email && <NavLink to='/belepes'><CgProfile/></NavLink> } */}
        { user.email ?
        <>
          <div className='profile-hover-container'>
            <NavLink to='/profile' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <AiOutlineUser />
            </NavLink>
            <Profile logout={logout} />
          </div>
        </>
          :
          <NavLink to='/belepes'><BiLogIn /></NavLink>
        }
      </div>
        

    </nav>
  )
}