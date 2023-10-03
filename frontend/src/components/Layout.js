import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
// import '../assets/css/Layout.css'

export default function Layout() {

  return (
    <>
    <header>
        <Nav />
    </header>
    <main>
        <Outlet/>
    </main>
    </>
  )
}