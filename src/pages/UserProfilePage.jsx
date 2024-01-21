import React from 'react'
import NavBar from '../components/NavBar'
import UserProfile from '../components/UserProfile'

const UserProfilePage = () => {
  return (
    <NavBar>
       <h1 className="text-3xl leading-7 text-center font-bold text-gray-900">My Profile</h1>
        <UserProfile></UserProfile>
    </NavBar>
  )
}

export default UserProfilePage
