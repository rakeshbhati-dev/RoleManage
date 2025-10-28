import axios from "axios"

const permissionAPI = import.meta.env.VITE_PERMISSION_API

async function getPermission(token, roleId) {
    try {
        const response = await axios.get(`${permissionAPI}/${roleId}`, { headers: { Authorization: `Bearer ${token}` } })
        const permissionList = response.data.permissionList || []

        const permission = {}
        permissionList.forEach((per) => {
            const key = per.Module.name.toLowerCase()
            permission[key] = {
                create: !!per.can_create,
                read: !!per.can_read,
                update: !!per.can_update,
                delete: !!per.can_delete,
            } 
        })
        return permission
    } catch (error) {
        throw error
    }
}

async function updatePermission(token,body) {
    try {
        const response=await axios.post(`${permissionAPI}/`,body,{headers:{Authorization:`Bearer ${token}`}})
        return response
    } catch (error) {
        throw error
    }
}

export { getPermission,updatePermission }