import axios from "axios";

const enterpriseAPI=import.meta.env.VITE_ENTERPRISE_API

async function getAllEnterprise(token) {
    try {
        const response=await axios.get(`${enterpriseAPI}/`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function getEnterprise(token,id) {
    try {
        const response=await axios.get(`${enterpriseAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function deleteEnterprise(token,id) {
    try {
        const response=await axios.delete(`${enterpriseAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function addEnterprise(token,data) {
    try {
        const response=await axios.post(`${enterpriseAPI}/`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function updateEnterprise(token,id,data) {
    try {
        const response=await axios.put(`${enterpriseAPI}/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

export {getAllEnterprise,deleteEnterprise,addEnterprise,updateEnterprise,getEnterprise}