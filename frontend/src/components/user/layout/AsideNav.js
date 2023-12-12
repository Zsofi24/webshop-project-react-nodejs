import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { CartContext } from '../../../contexts/CartContext';
import logout from '../../../utils/logout';

export default function AsideNav() {

  const { user, setUser } = useContext(UserAuthContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

    return (
    <aside className='aside-nav-profile'>
      <NavLink to='/rendelesek'>rendeléseim</NavLink>
      <NavLink to='/profil'>profil</NavLink>
      <Link end onClick={() => logout(setUser, setCart, navigate)}>kilejentkezés</Link>
    </aside>
  )
}
