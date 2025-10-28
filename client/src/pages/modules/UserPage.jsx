import React, { useContext, useEffect, useState } from 'react'
import DynamicForm from '../../components/form/DynamicForm'
import { AuthContext } from '../../contexts/AuthContext'
import { getAllRole } from '../../services/role'
import { getAllEnterprise } from '../../services/enterprise'
import { useLocation, useNavigate } from 'react-router-dom'
import { addUser, particularUser, updateUser } from '../../services/user'

function UserPage() {
  const [roleList,setRoleList]=useState([])
  const {token,loading,setLoading}=useContext(AuthContext)
  const [selectedRole,setSelectedRole]=useState("")
  const [selectedEnterprise,setSelectedEnterprise]=useState("")
  const [enterpriseList,setEnterpriseList]=useState([])
  const [initialData,setInitialData]=useState({})

  const navigate=useNavigate()
  const location=useLocation()
  const {canEdit,userId}=location.state||{}

  async function fetchRoles() {
    setLoading(true)
    try {
      const response=await getAllRole(token)
      const filteredRole=response?.roleList.filter((role)=>role.name!=='Admin')
      setRoleList(filteredRole)
      setSelectedRole(filteredRole[0]?.id)
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  async function fetchEnterprise() {
    setLoading(true)
    try {
      const response=await getAllEnterprise(token)
      setEnterpriseList(response?.enterpriseList || []);
      setSelectedEnterprise(response?.enterpriseList[0].id)
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }
  
  async function fetchUser() {
    setLoading(true)
    try {
      const response=await particularUser(token,userId)
      setInitialData(response.user);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  async function submitHandler(data){
    const body={...data,roleId:selectedRole,enterpriseId:selectedEnterprise}
    setLoading(true)
    try {
      if(!canEdit){
       await addUser(token,body)
      }
      else{
        await updateUser(token,userId,body)
      }
      navigate('/user')
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(token){
      fetchRoles()
      fetchEnterprise()
    }
  },[])

  useEffect(()=>{
    if(userId && canEdit){
      fetchUser()
    }
  },[userId])
  if(loading){
    return(
      <>Loading...</>
    )
  }
  return (
    <div className='w-1/2 mx-auto mt-5 bg-white shadow-md rounded-xl'>
      <DynamicForm moduleName="user" onSubmit={submitHandler} isEdit={canEdit||false} initialData={initialData||{}}>
        <div className='my-2'>
          <p>Select Role</p>
      <select name="" id="role_id" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className='border block w-full md:w-1/2 lg:w-1/4  py-2'>
        {
          roleList.map((role) => {
            return (
              <option key={role.id} value={role.id}>{role.name}</option>
            )
          })
        }
      </select>
        </div>
        <div className='my-2'>
          <p>Select Enterprise</p>
      <select name="" id="enterprise_id" value={selectedEnterprise} onChange={(e) => setSelectedEnterprise(e.target.value)} className='border block w-full md:w-1/2 lg:w-1/4  py-2'>
        {
          enterpriseList.map((ent) => {
            return (
              <option key={ent.id} value={ent.id}>{ent.name}</option>
            )
          })
        }
      </select>
        </div>
      </DynamicForm>
    </div>
  )
}

export default UserPage