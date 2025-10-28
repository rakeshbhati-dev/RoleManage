import React, { Children, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function AuthProtected({children}) {
    const {token,loading}=useContext(AuthContext)
    if(loading){
        return(
            <>Loading...</>
        )
    }
    if(!token){
        return (children)
        }
  return (
    <Navigate to='/'></Navigate>
  )
}

export default AuthProtected