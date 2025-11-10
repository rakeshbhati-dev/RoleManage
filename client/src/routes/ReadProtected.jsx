import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { PermissionContext } from '../contexts/PermissionContext'

function ReadProtected({children,module}) {
  const {permission,loading:permissionLoading}=useContext(PermissionContext)
  const {token,loading:authLoading}=useContext(AuthContext)
  if(permissionLoading || authLoading){
    return(<div>Loading...</div>)
  }

  if(!token){
    return(<Navigate to='/login'></Navigate>)
  }
  
  if(!permission[module]?.read){
    return(<div>Access Denied</div>)
  }
  return (
    <>{children}</>
  )
}

export default ReadProtected