import React, { useContext, useEffect, useState } from 'react'
import DynamicForm from '../../components/form/DynamicForm'
import { AuthContext } from '../../contexts/AuthContext'
import { addEnterprise, getAllEnterprise, getEnterprise, updateEnterprise } from '../../services/enterprise'
import { useLocation, useNavigate } from 'react-router-dom'
import { addProduct, getProduct, updateProduct } from '../../services/product'

function EnterprisePage() {
  const {token,loading,setLoading}=useContext(AuthContext)
  const [initialData,setInitialData]=useState({})
  const navigate=useNavigate()
  const location=useLocation()
  const {canEdit,enterpriseId}=location.state||{}

  
  async function fetchEnterprise() {
    setLoading(true)
    try {
      const response=await getEnterprise(token,enterpriseId)
      setInitialData(response.enterprise);
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
       await addEnterprise(token,data)
      }
      else{
        await updateEnterprise(token,enterpriseId,data)
      }
      navigate('/enterprise')
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(enterpriseId && canEdit){
      fetchEnterprise()
    }
  },[enterpriseId])
  if(loading){
    return(
      <>Loading...</>
    )
  }
  return (
    <div className='w-1/2 mx-auto mt-5 bg-white shadow-md rounded-xl'>
      <DynamicForm moduleName="enterprise" onSubmit={submitHandler} isEdit={canEdit||false} initialData={initialData||{}}>
      </DynamicForm>
    </div>
  )
}

export default EnterprisePage