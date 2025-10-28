import axios from "axios";

const productAPI=import.meta.env.VITE_PRODUCT_API

async function getAllProduct(token) {
    try {
        const response=await axios.get(`${productAPI}/`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function deleteProduct(token,id) {
    try {
        const response=await axios.delete(`${productAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function getProduct(token,id) {
    try {
        const response=await axios.get(`${productAPI}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}

async function addProduct(token,data) {
    try {
        const response=await axios.post(`${productAPI}/`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}


async function updateProduct(token,id,data) {
    try {
        const response=await axios.put(`${productAPI}/${id}`,data,{headers:{Authorization:`Bearer ${token}`}})
        return response.data
    } catch (error) {
        throw error
    }
}
export {getAllProduct,deleteProduct,addProduct,updateProduct,getProduct}