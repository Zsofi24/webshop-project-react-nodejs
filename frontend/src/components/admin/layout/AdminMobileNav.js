import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import Button from '../../button/Button';

export default function AdminMobileNav() {

  const [ open, setOpen ] = useState(false);

  return (
    <header className='mobile-header'>
      <nav>
        <div>
          <NavLink to='/'>F</NavLink>
        </div>
        <div className='mobile-menu-wrapper'>
          <Button handleClick={() => setOpen(prev => !prev)}>{ open ? <MdOutlineClose /> : <MdMenu />}</Button>    
          {
            open &&
            <div className="mobile-menu-container">
                <NavLink to='/' onClick={() => setOpen(prev => !prev)}>webshop</NavLink>
                <NavLink to='/admin' end className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>dashboard</NavLink>
                <NavLink to='termekek' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>termékek</NavLink>
                <NavLink to='kategoriak' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>kategóriák</NavLink>
                <NavLink to='felhasznalok' className={({isActive}) => isActive ? 'active-navlink' : ''} onClick={() => setOpen(prev => !prev)}>felhasználók</NavLink>
            </div>
          }      
        </div>
      </nav>
    </header>
  )
}
