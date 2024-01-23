import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import Button from '../../button/Button';
import { BsCart } from "react-icons/bs";
import NavCartAmount from "../cart/NavCartAmount";
import { UserAuthContext } from '../../../contexts/UserAuthContext';
import { CartContext } from '../../../contexts/CartContext';
import { authService } from "../../../services/authService";

export default function MobileNav() {

  const [ open, setOpen ] = useState(false);
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
    <header className='mobile-header'>
      <nav>
        <div>
          <NavLink to='/' className='nav-logo'>F</NavLink>
        </div>
        <div className='mobile-menu-wrapper'>
          <NavLink to={`/kosar`} className={({isActive}) => isActive ? 'active-navlink' : ''}><BsCart/><NavCartAmount /></NavLink>
          <Button handleClick={() => setOpen(prev => !prev)}>{ open ? <MdOutlineClose /> : <MdMenu />}</Button>  
          {
            open &&
            <div className="mobile-menu-container">
                <NavLink to='/' onClick={() => setOpen(prev => !prev)}>főoldal</NavLink>
                <NavLink to='termekek' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>termékek</NavLink>
                <NavLink to='admin' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>admin</NavLink>
                {
                  user.localId ?
                  <>
                  <NavLink to='rendelesek' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>rendeléseim</NavLink>
                  <NavLink to='profil' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>profil</NavLink>
                  <NavLink onClick={() => {setOpen(prev => !prev); logout()}}>kijelentkezés</NavLink>
                  </>
                  :
                  <>
                  <NavLink to='belepes' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>belépés</NavLink>
                  <NavLink to='regisztracio' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>regisztráció</NavLink>
                  </>
                }
            </div>
          }      
        </div>
      </nav>
    </header>
  )
}