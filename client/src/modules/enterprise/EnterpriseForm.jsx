import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { addEnterprise, getEnterprise, updateEnterprise } from '../../services/enterprise'
import Form from '../../components/Form'

function EnterpriseForm() {
  const {token,loading}=useContext(AuthContext)
  const [initialData,setInitialData]=useState({})
  const navigate=useNavigate()
  const location=useLocation()
  const {canEdit,enterpriseId}=location.state||{}
  const [pageLoading,setPageLoading]=useState(true)

  
  async function fetchEnterprise() {
    setPageLoading(true)
    try {
      const response=await getEnterprise(token,enterpriseId)
      setInitialData(response.enterprise);
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
       await addEnterprise(token,data)
      }
      else{
        await updateEnterprise(token,enterpriseId,data)
      }
      navigate('/enterprise',{replace:true})
    } catch (error) {
      console.log(error);
    }
    finally{
      setPageLoading(false)
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
    <div className='w-full md:w-1/2 mx-auto mt-5 bg-white md:shadow-md rounded-xl'>
      <Form moduleName="enterprise" onSubmit={submitHandler} isEdit={canEdit||false} initialData={initialData||{}}>
      </Form>
    </div>
  )
}

export default EnterpriseForm