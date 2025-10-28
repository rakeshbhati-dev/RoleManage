import React, { useContext, useEffect, useState } from 'react'
import DynamicForm from '../../components/form/DynamicForm'
import { AuthContext } from '../../contexts/AuthContext'
import { getAllEnterprise } from '../../services/enterprise'
import { useLocation, useNavigate } from 'react-router-dom'
import { addProduct, getProduct, updateProduct } from '../../services/product'

function ProductPage() {
  const {token,loading,setLoading}=useContext(AuthContext)
  const [selectedEnterprise,setSelectedEnterprise]=useState("")
  const [enterpriseList,setEnterpriseList]=useState([])
  const [initialData,setInitialData]=useState({})

  const navigate=useNavigate()
  const location=useLocation()
  const {canEdit,productId}=location.state||{}

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
  
  async function fetchProduct() {
    setLoading(true)
    try {
      const response=await getProduct(token,productId)
      console.log(response.product);
      setInitialData(response.product);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  async function submitHandler(data){
    const body={...data,enterpriseId:selectedEnterprise}
    setLoading(true)
    try {
      if(!canEdit){
       await addProduct(token,body)
       console.log(body);
       
      }
      else{
        await updateProduct(token,productId,body)
      }
      navigate('/product')
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(token){
      fetchEnterprise()
    }
  },[])

  useEffect(()=>{
    if(productId && canEdit){
      fetchProduct()
    }
  },[productId])
  if(loading){
    return(
      <>Loading...</>
    )
  }
  return (
    <div className='w-1/2 mx-auto mt-5 bg-white shadow-md rounded-xl'>
      <DynamicForm moduleName="product" onSubmit={submitHandler} isEdit={canEdit||false} initialData={initialData||{}}>
        <div className='my-2'>
          <p>Select Enterprise</p>
      <select name="" id="" value={selectedEnterprise} onChange={(e) => setSelectedEnterprise(e.target.value)} className='border block w-full md:w-1/2 lg:w-1/4  py-2'>
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

export default ProductPage