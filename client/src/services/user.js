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

export {login}