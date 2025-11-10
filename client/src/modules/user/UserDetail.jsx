import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { deleteUser, particularUser } from '../../services/user'
import Details from '../../components/Details'
import { PermissionContext } from '../../contexts/PermissionContext'

function UserDetail() {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const { token, loading: authLoading } = useContext(AuthContext)
    const { permission, loading: permissionLoading } = useContext(PermissionContext)
    const navigate=useNavigate()

    const row = [
        { header: "Name", value: (obj) => obj?.name },
        { header: "Email ID", value: (obj) => obj?.email },
        { header: "Role", value: (obj) => obj.Role?.name },
        { header: "Enterprise", value: (obj) => obj.Enterprise?.name }
    ]

    async function fetchUser() {
        try {
            const response = await particularUser(token, id)
            setUser(response.user);
        } catch (error) {
            console.log(error);
        }
    }

    function editHandler(id) {
        navigate('/user/form', { state: { canEdit: true, userId: id } })
    }

     async function deleteHandler(id) {
        if(confirm("Delete User")){
            try {
                await deleteUser(token,id)
                navigate('/user')
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (authLoading || permissionLoading) {
        return (
            <>Loading...</>
        )
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <Details data={user}
             rows={row} 
             module="User" 
             canEdit={permission?.user?.update}
             canDelete={permission?.user?.delete}
             onEdit={editHandler} 
             onDelete={deleteHandler}></Details>
        </div>
    )
}

export default UserDetail