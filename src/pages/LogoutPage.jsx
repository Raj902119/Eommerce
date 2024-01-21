import React from 'react'
import { selectLoggedInUser } from '../app/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutAsync } from '../app/authSlice'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const LogoutPage = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(LogoutAsync());
  },[])

  return (
    <div>
      {!user && <Navigate to='/login' replace={true} />}
    </div>
  )
}

export default LogoutPage
