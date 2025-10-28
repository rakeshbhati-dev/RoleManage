import React, { useEffect, useState } from 'react'
import { deleteEmployee, getAllEmployee } from '../../services/employee'
import { useNavigate } from 'react-router-dom'

function EmployeeTable({token,canEdit=false,canDelete=false}) {
    const [employeeList,setEmployeeList]=useState([])
    const navigate=useNavigate()

    async function fetchEmployee() {
        try {
            const response=await getAllEmployee(token)
            setEmployeeList(response.employeeList||[]);
        } catch (error) {
            console.log(error);  
        }
    }

    function updateHandler(id){
        navigate('/employee/form',{
            state:{canEdit:true, employeeId:id}
        })
    }

    async function deleteHandler(id) {
        if(confirm("Delete Employee")){
            let updatedEmployee=employeeList.filter((emp)=>emp.id!==id)
            try {
                const response=await deleteEmployee(token,id)
                if(response){
                    setEmployeeList(updatedEmployee)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(()=>{
        fetchEmployee()
    },[token])
  return (
    <>
    {
        employeeList.length>0 &&
        <table className='data-table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
                <th>Enterprise</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                employeeList.map((employee)=>{
                    return(
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.Role.name}</td>
                            <td>{employee.Enterprise.name}</td>
                            <td>{employee.status}</td>
                            <td>
                                {canEdit && <button className='edit' onClick={()=>updateHandler(employee.id)}>Edit</button>}
                                {canDelete && <button className='delete' onClick={()=>deleteHandler(employee.id)}>Delete</button>}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
    }
    </>
  )
}

export default EmployeeTable