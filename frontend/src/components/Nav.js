import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
// import { UserAuthContext } from '../context/UserAuthContext'
import { CgProfile } from 'react-icons/cg'
import { BsCart } from 'react-icons/bs'

export default function Nav() {

  // const { user } = useContext(UserAuthContext);
  const user = false
  
  return (
    <nav>
      <div>
        <NavLink to='/'>F</NavLink>
      </div>
      <div>
        <NavLink to='/termekek'>termékek</NavLink>
        <NavLink to='/admin'>admin</NavLink>
        { user &&
        <>
          <NavLink to='/megrendeleseim'>rendeléseim</NavLink>
        </> 
        }
      </div>
      <div>
        { !user && <NavLink to='/regisztracio'><CgProfile/></NavLink> }
        <NavLink to='/kosar'><BsCart/></NavLink>
        { user ? 
          <NavLink to='/kijelentkezes'>kijelentkezés</NavLink>
          :
          <NavLink to='/belepes'>bejelentkezés</NavLink>
        }
      </div>
        

    </nav>
  )
}