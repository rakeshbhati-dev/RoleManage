import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import { PermissionContext } from '../../contexts/PermissionContext'

function Dashboard() {
  const {user}=useContext(AuthContext)
  const {permission,loading}=useContext(PermissionContext)
  const modules=Object.keys(permission)
  const allowedModules = modules.filter((m) => permission[m]?.read)
  if(loading){
    return(
      <>Loading....</>
    )
  }
  return (
    <>
      <Navbar></Navbar>
      <div className='p-3'>
        <h2 className='font-semibold text-2xl'>Welcome, {user?.name}!</h2>
        {
          allowedModules.length>0 &&
          <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-4'>
            {
              allowedModules.map((item)=>{
                return(
                  <Card model={item} key={item} link={`/${item}`}></Card>
                )
              })
            }
        </div>}
      </div>
    </>
  )
}

export default Dashboard