import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { PermissionContext } from '../contexts/PermissionContext'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

function ProtectedRoutes() {
    const { token, loading: authLoading } = useContext(AuthContext)
    const { permission, loading: permLoading } = useContext(PermissionContext)
    const location = useLocation()

    if (authLoading || permLoading) {
        return (
            <>Loading...</>
        )
    }
    if (!token) {
        return(
            <Navigate to='/login'></Navigate>
        )
    }

    const pathParts = location.pathname.split("/");
    const module = pathParts[1]?.toLowerCase();
    const currentPerm = permission[module];

    if(!currentPerm){
        return (
            <>Access Denied</>
        )
    }

    if(!currentPerm.create){
        return(
            <>Access Denied</>
        )
    }

    return (
        <Outlet></Outlet>
    )
}

export default ProtectedRoutes