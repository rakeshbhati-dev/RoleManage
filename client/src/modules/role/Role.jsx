import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { PermissionContext } from '../../contexts/PermissionContext'
import { Link, useNavigate } from 'react-router-dom'
import { deleteRole, getAllRole } from '../../services/role'
import ModuleBar from '../../components/ModuleBar'
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table'
import ListCard from '../../components/ListCard'

function Role() {
  const [roleList, setRoleList] = useState([])
  const [query,setQuery]=useState("")
  const { token, loading: authLoading } = useContext(AuthContext)
  const { permission, loading: permissionLoading } = useContext(PermissionContext)
  const navigate = useNavigate()
  const isLargeDevice = useMediaQuery({ query: `(min-width:767px)` })

  const column = [
    { title: "Name", value: (row) => row.name }
  ]

  const filteredRole=roleList.filter((role)=>role?.name.toLowerCase().includes(query.toLowerCase()))

  async function fetchRole() {
    try {
      const response = await getAllRole(token)
      const filterResponse = response?.roleList.filter((role) => role.name !== 'Admin')
      setRoleList(filterResponse)
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteHandler(id) {
    if(confirm("Delete Role")){
            let updatedList=roleList.filter((role)=>role.id!==id)
            try {
                const response=await deleteRole(token,id)
                if(response){
                    setRoleList(updatedList)
                }
            } catch (error) {
                console.log(error);
            }
        }
  }

  useEffect(() => {
    if (token) {
      fetchRole()
    }
  }, [])

  if (authLoading || permissionLoading) {
    return (<>Loading...</>)
  }
  return (
    <>
      <ModuleBar canAdd={permission?.role?.create} onSearch={(e)=>setQuery(e.target.value)} onAdd={()=>navigate('/role/form')} module="Role"></ModuleBar>
      {
        roleList.length > 0 ?
          <div>
            {
              isLargeDevice ?
                <Table 
                data={filteredRole} 
                column={column} 
                canEdit={permission.role.update} 
                canDelete={permission.role.delete} 
                onEdit={(id)=>navigate('/role/form',{state:{canEdit:true,roleId:id}})} 
                onDelete={deleteHandler}
                onNavigate={(id)=>navigate(`/role/${id}`)} />  
                 :
                <div>
                  {
                    filteredRole.map((role) => {
                      return (
                        <Link to={`/role/${role.id}`} key={`${role.id}-card`}>
                          <ListCard title={role.name}></ListCard>
                        </Link>
                      )
                    })
                  }
                </div>
            }
          </div> :
          <div>No Role founds</div>
      }
    </>
  )
}

export default Role