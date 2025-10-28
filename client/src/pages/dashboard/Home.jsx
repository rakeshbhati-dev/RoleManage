import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PermissionContext } from '../../contexts/PermissionContext'
import Button from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'
import EmployeeTable from '../../components/tables/EmployeeTable'
import '../../css/table.css'
import ProductTable from '../../components/tables/ProductTable'
import RoleTable from '../../components/tables/RoleTable'
import Permission from '../../components/permission/Permission'
import UserTable from '../../components/tables/UserTable'
import EnterpriseTable from '../../components/tables/EnterpriseTable'

function Home() {
    const {model}=useParams()
    const {permission,loading}=useContext(PermissionContext)
    const {token}=useContext(AuthContext)
    const modelList=Object.keys(permission)
    const navigate=useNavigate()
    if(loading){
        return(
            <>loading...</>
        )
    }

    if(!modelList.includes(model)){
        return(
            <>No Page Found</>
        )
    }

    if(!permission[model].read || !token){
        return(
            <>Access Denies</>
        )
    }

    if(model==='permission' && permission[model].read){
        return(
            <>
            <Permission token={token}></Permission>
            </>
        )
    }

  return (
    <>
    {
        permission[model].create && model!=="permission" && 
        <Button value={`Add ${model}`} onClick={()=>navigate(`/${model}/form`)}></Button>
    }

    <div className='mt-6'>
        {
            model=='employee' && <EmployeeTable token={token} canEdit={permission[model].update} canDelete={permission[model].delete}></EmployeeTable>
        }
        {
            model=='product' && <ProductTable token={token} canEdit={permission[model].update} canDelete={permission[model].delete}></ProductTable>
        }
        {
            model=='role' && <RoleTable token={token} canEdit={permission[model].update} canDelete={permission[model].delete}></RoleTable>
        }
        {
            model=='user' && <UserTable token={token} canEdit={permission[model].update} canDelete={permission[model].delete}></UserTable>
        }
        {
            model=='enterprise' && <EnterpriseTable token={token} canEdit={permission[model].update} canDelete={permission[model].delete}></EnterpriseTable>
        }
    </div>
    </>
  )
}

export default Home