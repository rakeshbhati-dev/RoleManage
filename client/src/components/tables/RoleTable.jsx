import React, { useEffect, useState } from 'react'
import { deleteRole, getAllRole } from '../../services/role'
import { useNavigate } from 'react-router-dom'

function RoleTable({token,canEdit,canDelete}) {
    const [roleList,setRoleList]=useState([])
    const navigate=useNavigate()

    async function fetchRoles() {
        try {
            const response=await getAllRole(token)
           let filterRole= response?.roleList.filter((role)=>role.name!=='Admin');
           setRoleList(filterRole);
        } catch (error) {
            console.log(error);
        }
    }

     function updateHandler(id){
        navigate('/role/form',{
            state:{canEdit:true, roleId:id}
        })
    }


    
    async function deleteHandler(id) {
        if(confirm("Delete Role")){
            let updatedRole=roleList.filter((role)=>role.id!==id)
            try {
                const response=await deleteRole(token,id)
                if(response){
                    setRoleList(updatedRole)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(()=>{
        fetchRoles()
    },[token])
  return (
      <>
    {
        roleList.length>0 ?
        <table className='data-table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                roleList.map((role)=>{
                    return(
                        <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>
                                {canEdit && <button className='edit' onClick={()=>updateHandler(role.id)}>Edit</button>}
                                {canDelete && <button className='delete' onClick={()=>deleteHandler(role.id)}>Delete</button>}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>:
    <h3>No Product Found</h3>
    }
    </>
  )
}

export default RoleTable