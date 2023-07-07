import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
// import { UserAuthContext } from '../context/UserAuthContext'
import { CgProfile } from 'react-icons/cg'
import { BsCart } from 'react-icons/bs'
import { UserAuthContext } from '../contexts/UserAuthProvider';

export default function Nav() {

  const { user } = useContext(UserAuthContext);
  
  return (
    <nav>
      <div>
        <NavLink to='/'>F</NavLink>
      </div>
      <div>
        <NavLink to='/termekek'>termékek</NavLink>
        <NavLink to='/admin'>admin</NavLink>
        { user.email &&
        <>
          <NavLink to='/megrendeleseim'>rendeléseim</NavLink>
        </> 
        }
      </div>
      <div>
        { !user.email && <NavLink to='/regisztracio'><CgProfile/></NavLink> }
        <NavLink to='/kosar'><BsCart/></NavLink>
        { user.email ? 
        <>
          <NavLink to='/kijelentkezes'>kijelentkezés</NavLink>
          <NavLink to='/profile'>profil</NavLink>
        </>
          :
          <NavLink to='/belepes'>bejelentkezés</NavLink>
        }
      </div>
        

    </nav>
  )
}