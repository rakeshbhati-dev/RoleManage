import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteEmployee, getEmployee } from '../../services/employee'
import Details from '../../components/Details'
import { AuthContext } from '../../contexts/AuthContext'
import { PermissionContext } from '../../contexts/PermissionContext'

function EmployeeDetail() {
    const { id } = useParams()
    const [employee, setEmployee] = useState(null)
    const { token, loading:authLoading } = useContext(AuthContext)
    const {permission,loading:permissionLoading}=useContext(PermissionContext)
    const navigate = useNavigate()

    const row = [
        { header: "Name", value: (obj) => obj?.name },
        { header: "Email ID", value: (obj) => obj?.email },
        { header: "Role", value: (obj) => obj.Role?.name },
        { header: "Enterprise", value: (obj) => obj.Enterprise?.name },
        { header: "Salary", value: (obj) => obj?.salary },
        { header: "Department", value: (obj) => obj?.department },
        { header: "Status", value: (obj) => obj?.status }
    ]

    async function fetchEmployee() {
        try {
            const response = await getEmployee(token, id)
            setEmployee(response.employee);
            
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteHandler(id) {
        if(confirm("Delete Employee")){
            try {
                await deleteEmployee(token,id)
                navigate('/employee',{replace:true})
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchEmployee()
    }, [])

    if(authLoading || permissionLoading){
        return(
            <>Loading...</>
        )
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <Details data={employee} 
            rows={row} module="employee" 
            canEdit={permission?.employee?.update}
            canDelete={permission?.employee?.delete}
            onEdit={(id)=>navigate('/employee/form',{state:{canEdit:true,employeeId:id}})}
            onDelete={deleteHandler}
             />
        </div>
    )
}

export default EmployeeDetail