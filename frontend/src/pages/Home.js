import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Home() {

  const location = useLocation()
  const message = location.state?.message

  return (
    <>
      <div>Home</div>
      { message && <h2>{message}</h2>}
    </>
  )
}