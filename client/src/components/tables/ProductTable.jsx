import React, { useEffect, useState } from 'react'
import { deleteProduct, getAllProduct } from '../../services/product';
import { useNavigate } from 'react-router-dom';

function ProductTable({token,canEdit=false,canDelete=false}) {
  const [productList,setProductList]=useState([])
  const navigate=useNavigate()
    async function fetchProduct() {
        try {
            const response=await getAllProduct(token)
            setProductList(response?.productList || []);
        } catch (error) {
            console.log(error);  
        }
    }

    function updateHandler(id){
        navigate('/product/form',{
            state:{canEdit:true, productId:id}
        })
    }

    
    async function deleteHandler(id) {
        if(confirm("Delete Product")){
            let updatedList=productList.filter((prod)=>prod.id!==id)
            try {
                const response=await deleteProduct(token,id)
                if(response){
                    setProductList(updatedList)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(()=>{
        fetchProduct()
    },[token])
  return (
    <>
    {
        productList.length>0 ?
        <table className='data-table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Category</th>
                <th>Enterprise</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                productList.map((product)=>{
                    return(
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.sku}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.Enterprise?.name}</td>
                            <td>
                                {canEdit && <button className='edit' onClick={()=>updateHandler(product.id)}>Edit</button>}
                                {canDelete && <button className='delete' onClick={()=>deleteHandler(product.id)}>Delete</button>}
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>:
    <h3>No Product Found</h3>
    }
    </>
  )
}

export default ProductTable