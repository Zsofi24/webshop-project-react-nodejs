import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi';
import { BsCart } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { UserAuthContext } from '../contexts/UserAuthContext';
import { authService } from '../services/authService';
import Profile from './Profile';
import NavCartAmount from './user/cart/NavCartAmount';
import { CartContext } from '../contexts/CartContext';

export default function Nav({ handleMouseEnter, handleMouseLeave, isProfileVisible }) {

  const { user, setUser } = useContext(UserAuthContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  function logout() {
    authService
      .userLogout()
      .then(() => {
        setUser({});
        setCart(null);
        navigate('/')
      })
  }
  
  return (
    <nav className='navshop'>
      <div>
        <NavLink to='/'>F</NavLink>
      </div>
      <div className='navshop__elements'>
        <NavLink to='/termekek' className={({isActive}) => isActive ? 'active-navlink' : ''}>termékek</NavLink>
        <NavLink to='/admin' className={({isActive}) => isActive ? 'active-navlink' : ''}>admin</NavLink>
      </div>
      <div>
        { user?.email ?
        <>
          <div className='navshop__profile'>
            <NavLink to='/profile' className={({isActive}) => isActive ? 'active-navlink' : ''} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <AiOutlineUser />
            </NavLink>
            <Profile logout={logout} username={user.username} />
          </div>
        </>
          :
          <NavLink to='/belepes'><BiLogIn /></NavLink>
        }
        <NavLink to={`/kosar`} className={({isActive}) => isActive ? 'active-navlink' : ''}><BsCart/><NavCartAmount /></NavLink>
      </div>     
    </nav>
  )
}
