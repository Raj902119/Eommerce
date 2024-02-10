import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../app/authSlice'
import { Navigate } from 'react-router-dom'
import { SelectUserProfile } from '../app/UserSlice'
const ProtectedAdmin = ({children}) => {
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(SelectUserProfile);
    
    if(!user){
        return <Navigate to="/login" />
    }else if(user && userInfo.role!=='admin'){
        return <Navigate to='/' replace={true}></Navigate>
    }
    return children;
}

export default ProtectedAdmin
