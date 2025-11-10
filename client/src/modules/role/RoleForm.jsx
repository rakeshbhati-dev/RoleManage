import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { addRole, getRole, updateRole } from '../../services/role'
import Form from '../../components/Form'

function RoleForm() {
  const {token,loading}=useContext(AuthContext)
  const [pageLoading,setPageLoading]=useState(false)
  const [initialData,setInitialData]=useState({})
  const navigate=useNavigate()
  const location=useLocation()
  const {canEdit,roleId}=location.state||{}

  async function fetchRole() {
    setPageLoading(true)
    try {
      const response=await getRole(token,roleId)
      setInitialData(response.role);
    } catch (error) {
      console.log(error);
    }
    finally{
      setPageLoading(false)
    }
  }

  async function submitHandler(data){
    setPageLoading(true)
    try {
      if(!canEdit){
       await addRole(token,data)
      }
      else{
        await updateRole(token,roleId,data)
      }
      navigate('/role')
    } catch (error) {
      console.log(error);
    }
    finally{
      setPageLoading(false)
    }
  }

  useEffect(()=>{
    if(roleId && canEdit){
      fetchRole()
    }
  },[roleId])
  if(loading || pageLoading){
    return(
      <>Loading...</>
    )
  }
  return (
    <div className='w-1/2 mx-auto mt-5 bg-white shadow-md rounded-xl'>
      <Form moduleName="role" onSubmit={submitHandler} isEdit={canEdit||false} initialData={initialData||{}}>
      </Form>
    </div>
  )
}

export default RoleForm