import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getPermission } from '../../services/permission'
import Card from '../../components/Card'
import Navbar from '../../components/Navbar'
import Button from '../../components/Button'

function Dashboard() {
    const {roleId,token,loading}=useContext(AuthContext)
    const [permissionList,setPermissionList]=useState([])

    async function fetchPermission() {
      try {
        const response=await getPermission(token,roleId)
        setPermissionList(response.permissionList);
        console.log(response.permissionList);
        
      } catch (error) {
        console.log(error);
      }
    }
    

    useEffect(()=>{
      fetchPermission()
    },[roleId])

    if(loading){
      return(
        <>Loading...</>
      )
    }
  return (
    <>
    <Navbar></Navbar>
    {
      permissionList &&
      <div>
        {
          permissionList.map((permission)=>{
        return(
          <>
          {
            permission.can_read==true &&
            <Button value={`Add ${permission.Module.name}`}></Button>
          }
          </>
        )
      })
        }
      </div>
    }
    </>
  )
}

export default Dashboard