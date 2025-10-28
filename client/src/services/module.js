import axios from "axios";

const moduleAPI=import.meta.env.VITE_MODULE_API

async function getAllModule(token) {
    try {
        const response=await axios.get(`${moduleAPI}/`,{headers:{Authorization:`Bearer ${token}`}})
        let filterModule=response?.data.moduleList.filter((module)=>module.name!=='Permission')
        return filterModule
    } catch (error) {
        throw error
    }
}


export {getAllModule}