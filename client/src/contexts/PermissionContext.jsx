import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getPermission } from "../services/permission";

export const PermissionContext=createContext()

export const PermissionProvider=({children})=>{
    const {roleId,token}=useContext(AuthContext)
    const [permission,setPermission]=useState({})
    const [loading,setLoading]=useState(true)

    async function fetchPermission() {
        if(roleId && token){
            try {
                const response=await getPermission(token,roleId)
                setPermission(response);
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false)
            }
        }
        else{
            setLoading(false)
            setPermission({})
        }
    }

    useEffect(()=>{
        fetchPermission()
    },[roleId,token])

    return(
        <PermissionContext.Provider value={{permission,loading,fetchPermission,setLoading}}>
            {children}
        </PermissionContext.Provider>
    )
}