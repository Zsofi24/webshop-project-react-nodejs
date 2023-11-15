import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'

export default function AdminLayout() {
  return (
    <>
    <div className='admin-wrapper'>
        <aside className='admin-aside'>
            <AdminNav/>
        </aside>
        <main>
            <Outlet/>
        </main>
    </div>
    </>
  )
}
