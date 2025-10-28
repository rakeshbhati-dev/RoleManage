import React, { useContext, useEffect, useState } from 'react'
import DynamicForm from '../../components/form/DynamicForm'
import { AuthContext } from '../../contexts/AuthContext'
import { addEnterprise, getAllEnterprise, getEnterprise, updateEnterprise } from '../../services/enterprise'
import { useLocation, useNavigate } from 'react-router-dom'
import { addProduct, getProduct, updateProduct } from '../../services/product'
import { addRole, getRole, updateRole } from '../../services/role'

function RolePage() {
  const {token,loading,setLoading}=useContext(AuthContext)
  const [initialData,setInitialData]=useState({})
  const navigate=useNavigate()
  const location=useLocation()
  const {canEdit,roleId}=location.state||{}

  async function fetchRole() {
    setLoading(true)
    try {
      const response=await getRole(token,roleId)
      setInitialData(response.role);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  async function submitHandler(data){
    setLoading(true)
    try {
      if(!canEdit){
       await addRole(token,data)
      }
      else{
        await updateRole(token,enterpriseId,data)
      }
      navigate('/role')
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(roleId && canEdit){
      fetchRole()
    }
  },[roleId])
  if(loading){
    return(
      <>Loading...</>
    )
  }
  return (
    <div className='w-1/2 mx-auto mt-5 bg-white shadow-md rounded-xl'>
      <DynamicForm moduleName="role" onSubmit={submitHandler} isEdit={canEdit||false} initialData={initialData||{}}>
      </DynamicForm>
    </div>
  )
}

export default RolePage