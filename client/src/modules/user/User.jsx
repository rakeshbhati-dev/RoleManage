import React, { useContext, useEffect, useState } from 'react'
import { deleteUser, getAllUser } from '../../services/user'
import { AuthContext } from '../../contexts/AuthContext'
import Table from '../../components/Table'
import { PermissionContext } from '../../contexts/PermissionContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import ListCard from '../../components/ListCard'
import ModuleBar from '../../components/ModuleBar'

function User() {
  const [userList, setUserList] = useState([])
  const [query,setQuery]=useState("")
  const { token, loading:authLoading } = useContext(AuthContext)
  const {permission,loading:permissionLoading}=useContext(PermissionContext)
  const navigate=useNavigate()
  const location=useLocation()

  console.log(location.pathname);
  
  const column=[
    {title:"Name",value:(row)=>row.name},
    {title:"Email",value:(row)=>row.email},
    {title:"Role",value:(row)=>row.Role?.name},
    {title:"Enterprise",value:(row)=>row.Enterprise?.name},
  ]

  const filteredUser=userList.filter((user)=>user?.name.toLowerCase().includes(query.toLowerCase()))

  const isLargeDevice=useMediaQuery({query:`(min-width:767px)`})

  async function fetchUser() {
    try {
      const response = await getAllUser(token)
      const updatedList = response?.userList.filter((user) => user.Role?.name !== "Admin")
      setUserList(updatedList);
    } catch (error) {
      setUserList([])
      console.log(error);
    }
  }

  function editHandler(id){
    navigate('/user/form',{state:{canEdit:true,userId:id}})
  }

  function searchHandler(e){
    setQuery(e.target.value)
    
  }

  async function deleteHandler(id) {
        if(confirm("Delete User")){
            let updatedList=userList.filter((user)=>user.id!==id)
            try {
                const response=await deleteUser(token,id)
                if(response){
                    setUserList(updatedList)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    function navigateHandler(id){
      navigate(`/user/${id}`)
    }

  useEffect(()=>{
    fetchUser()
  },[])

  if(authLoading || permissionLoading){
    return(
      <>Loading...</>
    )
  }

  return (
    <>
    <ModuleBar canAdd={permission?.user?.create} onAdd={()=>navigate('/user/form')} onSearch={searchHandler} module='User'></ModuleBar>
    {
      userList.length>0 ?
      <div className='px-5'>
       {
        isLargeDevice?
         <Table data={filteredUser} column={column} canEdit={permission?.user?.update} canDelete={permission?.user?.delete} onEdit={editHandler} onDelete={deleteHandler} onNavigate={navigateHandler}/>:
         <div>
          {
            filteredUser.map((user)=>{
              return(
                <Link to={`/user/${user.id}`} key={`${user.id}-card`}>
                <ListCard  title={user.name} data={[user.email,user.Role.name]}></ListCard>
                </Link>
              )
            })
          }
         </div>
       }
      </div>:
      <div>No User Found</div>
    }
    </>
  )
}

export default User