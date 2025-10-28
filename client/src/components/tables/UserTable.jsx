import React, { useEffect, useState } from 'react'
import { deleteUser, getAllUser } from '../../services/user';
import { useNavigate } from 'react-router-dom';

function UserTable({token,canEdit,canDelete}) {
    const [userList,setUserList]=useState([])
    const navigate=useNavigate()

    async function fetchUser() {
        try {
            const response=await getAllUser(token)
            const updatedList=response?.userList.filter((user)=>user.Role.name!=="Admin")
            setUserList(updatedList);
            
        } catch (error) {
            console.log(error);  
        }
    }

    function updateHandler(id){
        navigate('/user/form',{
            state:{canEdit:true, userId:id}
        })
    }

    async function deleteHandler(id) {
        if(confirm("Delete User")){
            let updatedList=userList.filter((user)=>user.id!==id)
            try {
                const response=await deleteUser(token,id)
                if(response){
                    setUserList(updatedList)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(()=>{
        fetchUser()
    },[token])
  return (
    <>
    {
        userList.length>0 ?
        <table className='data-table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Enterprise</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                userList.map((user)=>{
                    return(
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.Role?.name}</td>
                            <td>{user.Enterprise?.name}</td>
                            <td>
                                {canEdit && <button className='edit' onClick={()=>updateHandler(user.id)}>Edit</button>}
                                {canDelete && <button className='delete' onClick={()=>deleteHandler(user.id)}>Delete</button>}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>:
    <>
    <h3>No User Found</h3>
    </>
    }
    </>
  )
}

export default UserTable