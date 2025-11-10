import React, { useContext } from 'react'
import { AuthContext } from '../../../src/contexts/AuthContext'
import { PermissionContext } from '../../../src/contexts/PermissionContext'
import ModuleCard from '../../components/ModuleCard'

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
      <div className='p-3'>
        <h2 className='font-semibold text-2xl'>Welcome, {user?.name}!</h2>
        {
          allowedModules.length>0 &&
          <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-4'>
            {
              allowedModules.map((item)=>{
                return(
                  <ModuleCard model={item} key={item} link={`/${item}`}></ModuleCard>
                )
              })
            }
        </div>}
      </div>
    </>
  )
}

export default Dashboard