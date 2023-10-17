import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiLogOut } from 'react-icons/fi';
import { LiaUserEditSolid } from 'react-icons/lia';

export default function Profile({ logout, username }) {

  return (
    <div className='navshop__profile--hover'>
        <p>{username}, </p>
        <p>jó újra látni</p>
        <hr/>
        <ul>
            <li><Link to='/rendelesek'><FiPackage /> rendeléseim</Link></li>
            <li><Link to='/profil'><LiaUserEditSolid /> profil</Link></li>
            <hr></hr>
            <li onClick={logout}><FiLogOut /> kijelentkezés</li>
        </ul>
    </div>
  )
}

