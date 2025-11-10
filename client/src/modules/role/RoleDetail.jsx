import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { deleteRole, getRole } from '../../services/role'
import Details from '../../components/Details'
import { PermissionContext } from '../../contexts/PermissionContext'

function RoleDetail() {
    const { id } = useParams()
    const [role, setRole] = useState()
    const { token, loading: authLoading } = useContext(AuthContext)
    const { permission, loading: permissionLoading } = useContext(PermissionContext)
    const navigate = useNavigate()

    const row = [
        { header: "Name", value: (obj) => obj.name }
    ]

    async function fetchRole() {
        try {
            const response = await getRole(token, id)
            setRole(response.role);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteHandler(id) {
        if(confirm("Delete Role")){
            try {
                await deleteRole(token,id)
                navigate('/role')
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchRole()
    })
    if(authLoading || permissionLoading){
        return(
            <>Loading...</>
        )
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <Details data={role} rows={row} module="Role" 
            canEdit={permission?.role?.update}
            canDelete={permission?.role?.delete}
            onEdit={(id)=>navigate('/role/form',{state:{canEdit:true,roleId:id}})}
            onDelete={deleteHandler}
            />
        </div>
    )
}

export default RoleDetail