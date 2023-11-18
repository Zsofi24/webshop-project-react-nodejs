import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import Button from '../button/Button';
import { BsCart } from "react-icons/bs";
import NavCartAmount from "../user/cart/NavCartAmount";

export default function MobileNav() {

  const [ open, setOpen ] = useState(false);

  return (
    <header className='mobile-header'>
      <nav>
        <div>
          <NavLink to='/'>F</NavLink>
        </div>
        <div className='mobile-menu-wrapper'>
          <NavLink to={`/kosar`} className={({isActive}) => isActive ? 'active-navlink' : ''}><BsCart/><NavCartAmount /></NavLink>
          <Button handleClick={() => setOpen(prev => !prev)}>{ open ? <MdOutlineClose /> : <MdMenu />}</Button>  
          {
            open &&
            <div className="mobile-menu-container">
                <NavLink to='/'>főoldal</NavLink>
                <NavLink to='belepes'>belépés</NavLink>
                <NavLink to='regisztracio'>regisztráció</NavLink>
                <NavLink to='termekek'>termékek</NavLink>
                <NavLink to='profil'>profil</NavLink>
                <NavLink to='admin'>admin</NavLink>
            </div>
          }      
        </div>
      </nav>
    </header>
  )
}