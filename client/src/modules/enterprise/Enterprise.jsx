import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { deleteEnterprise, getAllEnterprise } from '../../services/enterprise'
import ModuleBar from '../../components/ModuleBar'
import Table from '../../components/Table'
import ListCard from '../../components/ListCard'
import { PermissionContext } from '../../contexts/PermissionContext'

function Enterprise() {
    const [enterpriseList, setEnterpriseList] = useState([])
    const [query, setQuery] = useState("")
    const { token, loading: authLoading } = useContext(AuthContext)
    const { permission, loading: permissionLoading } = useContext(PermissionContext)
    const navigate = useNavigate()
    const isLargeDevice = useMediaQuery({ query: `(min-width:767px)` })

    const column = [
        { title: "Name", value: (row) => row?.name },
        { title: "Email", value: (row) => row?.email },
        { title: "Country", value: (row) => row?.country },
        { title: "State", value: (row) => row?.state },
        { title: "Website URL", value: (row) => row?.website }
    ]
    const filteredEnterprise = enterpriseList.filter((ent) => ent?.name.toLowerCase().includes(query.toLowerCase()))

    async function fetchEnterprise() {
        try {
            const response = await getAllEnterprise(token)
            setEnterpriseList(response.enterpriseList)
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteHandler(id) {
        if (confirm("Delete Enterprise")) {
            let updatedList = enterpriseList.filter((ent) => ent.id !== id)
            try {
                const response = await deleteEnterprise(token, id)
                if (response) {
                    setEnterpriseList(updatedList)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if (token) {
            fetchEnterprise()
        }
    }, [])

    if (authLoading || permissionLoading) {
        return (<>Loading...</>)
    }


    return (
    <>
      <ModuleBar canAdd={permission?.enterprise?.create} onSearch={(e)=>setQuery(e.target.value)} onAdd={()=>navigate('/enterprise/form')} module="Enterprise"></ModuleBar>
      {
        enterpriseList.length > 0 ?
          <div>
            {
              isLargeDevice ?
                <Table 
                data={filteredEnterprise} 
                column={column} 
                canEdit={permission?.enterprise?.update} 
                canDelete={permission?.enterprise?.delete} 
                onEdit={(id)=>navigate('/enterprise/form',{state:{canEdit:true,enterpriseId:id}})} 
                onDelete={deleteHandler}
                onNavigate={(id)=>navigate(`/enterprise/${id}`)} />  
                 :
                <div>
                  {
                    filteredEnterprise.map((ent) => {
                      return (
                        <Link to={`/enterprise/${ent.id}`} key={`${ent.id}-card`}>
                          <ListCard title={ent?.name} data={[ent?.country,ent?.email]}></ListCard>
                        </Link>
                      )
                    })
                  }
                </div>
            }
          </div> :
          <div>No Enterprise founds</div>
      }
    </>
  )
}

export default Enterprise