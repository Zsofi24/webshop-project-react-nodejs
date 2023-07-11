import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsCart } from 'react-icons/bs'
import { UserAuthContext } from '../contexts/UserAuthProvider';
import { userService } from '../services/userServices';

export default function Nav() {

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
          <NavLink  ><button onClick={logout}>kijelentkezés</button></NavLink>
          <NavLink to='/profile'>profil</NavLink>
        </>
          :
          <NavLink to='/belepes'>bejelentkezés</NavLink>
        }
      </div>
        

    </nav>
  )
}