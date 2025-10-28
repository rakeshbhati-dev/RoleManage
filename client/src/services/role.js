import axios from "axios";

const roleAPI=import.meta.env.VITE_ROLE_API

async function getAllRole(token) {
    try {
        const response=await axios.get(`${roleAPI}/`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function getRole(token,id) {
    try {
        const response=await axios.get(`${roleAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}


async function deleteRole(token,id) {
    try {
        const response=await axios.delete(`${roleAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function addRole(token,data) {
    try {
        const response=await axios.post(`${roleAPI}/`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function updateRole(token,id,data) {
    try {
        const response=await axios.put(`${roleAPI}/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}
export {getAllRole,deleteRole,addRole,updateRole,getRole}