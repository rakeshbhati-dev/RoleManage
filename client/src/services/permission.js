import axios from "axios"

const permissionAPI=import.meta.env.VITE_PERMISSION_API

async function getPermission(token,roleId) {
    try {
        const response=await axios.get(`${permissionAPI}/${roleId}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

export {getPermission}