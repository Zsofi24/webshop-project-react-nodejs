import React, { useContext } from 'react'
import { UserAuthContext } from '../../../contexts/UserAuthContext'

export default function ProfileDetails() {

    const { user, setUser } = useContext(UserAuthContext)

  return (
    <div >
        <h3 className='heading-3 text-center'>Profilom</h3>

        <p>{user.username}</p>
        <p>{user.email}</p>

    </div>
  )
}
