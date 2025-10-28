import axios from 'axios'
const userAPI=import.meta.env.VITE_USER_API

async function login(formData) {
    try{
         const response = await axios.post(`${userAPI}/login`,formData)
         return response.data
    }
    catch(error){
        throw error
    }
}

async function particularUser(token,id) {
    try {
        const response=await axios.get(`${userAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function getAllUser(token) {
    try {
        const response=await axios.get(`${userAPI}/`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function deleteUser(token,id) {
    try {
        const response=await axios.delete(`${userAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function addUser(token,data) {
    try {
        const response=await axios.post(`${userAPI}/`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function updateUser(token,id,data) {
    try {
        const response=await axios.put(`${userAPI}/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

export {login,particularUser,getAllUser,deleteUser,addUser,updateUser}