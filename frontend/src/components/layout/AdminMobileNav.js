import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import Button from '../button/Button';

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
                <NavLink to='/'>webshop</NavLink>
                <NavLink to='/admin'>dashboard</NavLink>
                <NavLink to='termekek'>termékek</NavLink>
                <NavLink to='kategoriak'>kategóriák</NavLink>
            </div>
          }      
        </div>
      </nav>
    </header>
  )
}
