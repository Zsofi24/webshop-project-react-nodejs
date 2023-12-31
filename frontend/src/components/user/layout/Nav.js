import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BiLogIn } from 'react-icons/bi';
import { BsCart } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { authService } from '../../../services/authService';
import Profile from '../profile/Profile';
import NavCartAmount from '../cart/NavCartAmount';
import { CartContext } from '../../../contexts/CartContext';
import logout from '../../../utils/logout';

export default function Nav({ handleMouseEnter, handleMouseLeave, isProfileVisible }) {

  const { user, setUser } = useContext(UserAuthContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  // function logout() {
  //   authService
  //     .userLogout()
  //     .then(() => {
  //       setUser({});
  //       setCart(null);
  //       navigate('/')
  //     })
  // }
  
  return (
    <nav className='navshop'>
      <div>
        <NavLink to='/' className='nav-logo'>F</NavLink>
      </div>
      <div className='navshop__elements'>
        <NavLink to='/termekek' className={({isActive}) => isActive ? 'active-navlink' : ''}>termékek</NavLink>
        <NavLink to='/' className={({isActive}) => isActive ? 'active-navlink' : ''}>kapcsolat</NavLink>
        <NavLink to='/admin' className={({isActive}) => isActive ? 'active-navlink' : ''}>admin</NavLink>
      </div>
      <div>
        { user?.email ?
        <>
          <div className='navshop__profile'>
            <NavLink to='/profile' className={({isActive}) => isActive ? 'active-navlink' : ''} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <AiOutlineUser />
            </NavLink>
            <Profile logout={() => logout(setUser, setCart, navigate)} username={user.username} />
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
