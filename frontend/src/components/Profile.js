import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile({ logout }) {

  return (
    <div className='navshop__profile--hover'>
        <ul>
            <li><Link to='/rendelesek'>rendeléseim</Link></li>
            <li><Link to='/profil'>profil</Link></li>
            <li onClick={logout}>kijelentkezés</li>
        </ul>
    </div>
  )
}

