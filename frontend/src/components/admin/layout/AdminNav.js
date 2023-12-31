import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminNav() {
  return (    
    <nav>
        <NavLink to='/'>webshop</NavLink>
        <NavLink to='/admin' end>dasboard</NavLink>
        <NavLink to='/admin/termekek'>termékek</NavLink>
        <NavLink to='/admin/kategoriak'>kategóriák</NavLink>
        <NavLink to='/admin/felhasznalok'>felhasználók</NavLink>
    </nav>
  )
}
