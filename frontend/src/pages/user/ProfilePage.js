import React, { useContext } from 'react'
import { UserAuthContext } from '../../contexts/UserAuthContext'

export default function ProfilePage() {

  const { user, setUser } = useContext(UserAuthContext)

  return (
    <>
    <div>Profile</div>
    <p>{user.username}</p>
    <p>{user.email}</p>
    </>

  )
}
