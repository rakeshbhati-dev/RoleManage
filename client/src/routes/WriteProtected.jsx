import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { PermissionContext } from '../contexts/PermissionContext'
import { Navigate } from 'react-router-dom'

function WriteProtected({children,module}) {
  const {permission,loading:permissionLoading}=useContext(PermissionContext)
  const {token,loading:authLoading}=useContext(AuthContext)
  if(permissionLoading || authLoading){
    return(<>Loading...</>)
  }

  if(!token){
    return(<Navigate to='/login'></Navigate>)
  }
  
  if(!permission[module]?.create){
    return(<>Access Denied</>)
  }
  return (
    <>{children}</>
  )
}

export default WriteProtected