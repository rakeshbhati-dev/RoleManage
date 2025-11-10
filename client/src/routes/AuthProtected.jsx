import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

function AuthProtected({children}) {
    const {token,loading}=useContext(AuthContext)
    const location=useLocation()
    const loginPath=location.pathname
    
    if(loading){
        return(
            <>Loading...</>
        )
    }
    if(!token){
        return(<Navigate to='/login' />)
    }

  return (
    <>{children}</>
  )
}

export default AuthProtected