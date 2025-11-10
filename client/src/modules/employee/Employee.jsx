import React, { useContext, useEffect, useState } from 'react'
import { deleteEmployee, getAllEmployee } from '../../services/employee'
import ModuleBar from '../../components/ModuleBar'
import { useMediaQuery } from 'react-responsive'
import Table from '../../components/Table'
import ListCard from '../../components/ListCard'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { PermissionContext } from '../../contexts/PermissionContext'

function Employee() {
    const [employeeList, setEmployeeList] = useState([])
    const [query, setQuery] = useState('')
    const navigate=useNavigate()
    const { token, loading: authLoading } = useContext(AuthContext)
    const { permission, loading: permissionLoading } = useContext(PermissionContext)
    const isLargeDevice = useMediaQuery({ query: `(min-width:767px)` })
    const column = [
        { title: "Name", value: (row) => row?.name },
        { title: "Email", value: (row) => row?.email },
        { title: "Department", value: (row) => row?.department },
        { title: "Role", value: (row) => row?.Role?.name },
        { title: "Status", value: (row) => row?.status },
    ]

    const filteredEmployee = employeeList.filter((emp) => emp?.name.toLowerCase().includes(query.toLowerCase()))


    async function fetchEmployee() {
        try {
            const response = await getAllEmployee(token)
            setEmployeeList(response.employeeList);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteHandler(id) {
        if(confirm("Delete Employee")){
            let updatedList=employeeList.filter((emp)=>emp.id!==id)
            try {
                const response=await deleteEmployee(token,id)
                if(response){
                    setEmployeeList(updatedList)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchEmployee()
    }, [])

    if (authLoading || permissionLoading) {
        return (
            <>Loading...</>
        )
    }
    return (
        <>
            <ModuleBar canAdd={permission?.employee?.create} module='Employee' onSearch={(e) => setQuery(e.target.value)} onAdd={()=>navigate('/employee/form')}></ModuleBar>
            {
                employeeList.length > 0 ?
                    <div>
                        {
                            isLargeDevice ?
                                <Table
                                    data={filteredEmployee}
                                    column={column}
                                    canEdit={permission?.employee?.update}
                                    canDelete={permission?.employee?.delete}
                                    onEdit={(id)=>navigate('/employee/form',{state:{canEdit:true,employeeId:id}})}
                                    onDelete={deleteHandler}
                                    onNavigate={(id)=>navigate(`/employee/${id}`)}
                                /> :
                                <div>
                                    {
                                        filteredEmployee.map((emp) => {
                                            return (
                                                <Link to={`/employee/${emp.id}`} key={`${emp.id}-card`}>
                                                    <ListCard title={emp?.name} data={[emp?.email, emp?.Role?.name]}></ListCard>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div> :
                    <div>No Employee found</div>
            }
        </>
    )
}

export default Employee