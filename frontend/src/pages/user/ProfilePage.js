import React, { useContext } from 'react'
import { UserAuthContext } from '../../contexts/UserAuthContext'
import AsideNav from '../../components/user/layout/AsideNav'
import ProfileDetails from '../../components/user/profile/ProfileDetails'

export default function ProfilePage() {

  const { user, setUser } = useContext(UserAuthContext)

  return (
    <section>
      <div className='profile-wrapper padding-helper'>
        <AsideNav/>
        <ProfileDetails/>      
      </div>
    </section>
  )
}
