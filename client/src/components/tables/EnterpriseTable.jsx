import React, { useEffect, useState } from 'react'
import { deleteEnterprise, getAllEnterprise } from '../../services/enterprise';
import { useNavigate } from 'react-router-dom';

function EnterpriseTable({token,canEdit,canDelete}) {
    const [enterpriseList,setEnterpriseList]=useState([])
    const navigate=useNavigate()
    async function fetchEnterprise() {
        try {
            const response=await getAllEnterprise(token)
            setEnterpriseList(response.enterpriseList);
        } catch (error) {
            console.log(error);  
        }
    }

    function updateHandler(id){
        navigate('/enterprise/form',{
            state:{canEdit:true, enterpriseId:id}
        })
    }


    async function deleteHandler(id) {
        if(confirm("Delete Enterprise")){
            let updatedEnterprise=enterpriseList.filter((ent)=>ent.id!==id)
            try {
                const response=await deleteEnterprise(token,id)
                if(response){
                    setEnterpriseList(updatedEnterprise)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    

    useEffect(()=>{
        fetchEnterprise()
    },[token])
  return (
    <>
    {
        enterpriseList.length>0 ?
        <table className='data-table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Country</th>
                <th>City</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                enterpriseList.map((enterprise)=>{
                    return(
                        <tr key={enterprise.id}>
                            <td>{enterprise.name}</td>
                            <td>{enterprise.address}</td>
                            <td>{enterprise.country}</td>
                            <td>{enterprise.city}</td>
                            <td>{enterprise.email}</td>
                            <td>
                                 {canEdit && <button className='edit' onClick={()=>updateHandler(enterprise.id)}>Edit</button>}
                                {canDelete && <button className='delete' onClick={()=>deleteHandler(enterprise.id)}>Delete</button>}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>:
    <>
    <h3>No Enterprise Found</h3>
    </>
    }
    </>
  )
}

export default EnterpriseTable