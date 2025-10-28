import axios from "axios";

const employeeAPI=import.meta.env.VITE_EMPLOYEE_API

async function getAllEmployee(token) {
    try {
        const response=await axios.get(`${employeeAPI}/`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function getEmployee(token,id) {
    try {
        const response=await axios.get(`${employeeAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function addEmployee(token,data) {
    try {
        const response=await axios.post(`${employeeAPI}/`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response
    } catch (error) {
        throw error
    }
}
async function updateEmployee(token,id,data) {
    try {
        const response=await axios.put(`${employeeAPI}/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function deleteEmployee(token,id) {
    try {
        const response=await axios.delete(`${employeeAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}
export {getAllEmployee,deleteEmployee,getEmployee,updateEmployee,addEmployee}