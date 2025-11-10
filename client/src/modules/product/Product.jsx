import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../src/contexts/AuthContext'
import { PermissionContext } from '../../contexts/PermissionContext'
import { useMediaQuery } from 'react-responsive'
import { deleteProduct, getAllProduct } from '../../services/product'
import ModuleBar from '../../components/ModuleBar'
import Table from '../../components/Table'
import ListCard from '../../components/ListCard'

function Product() {
    const [productList, setProductList] = useState([])
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const { token, loading: authLoading } = useContext(AuthContext)
    const { permission, loading: permissionLoading } = useContext(PermissionContext)
    const isLargeDevice = useMediaQuery({ query: `(min-width:767px)` })
    const filteredProduct = productList.filter((prod) => prod?.name.toLowerCase().includes(query.toLowerCase()))

    const column = [
        { title: "Name", value: (row) => row?.name },
        { title: "Category", value: (row) => row?.category },
        { title: "Price", value: (row) => row?.price },
        { title: "Stocks", value: (row) => row?.stocks },
    ]

    async function fetchProduct() {
        try {
            const response = await getAllProduct(token)
            setProductList(response.productList);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteHandler(id) {
        if (confirm("Delete Product")) {
            let updatedList = productList.filter((emp) => emp.id !== id)
            try {
                const response = await deleteProduct(token, id)
                if (response) {
                    setProductList(updatedList)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    if (authLoading || permissionLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <>
            <ModuleBar module='Product' onSearch={(e) => setQuery(e.target.value)} onAdd={()=>navigate('/product/form')}></ModuleBar>
            {
                productList.length > 0 ?
                    <div>
                        {
                            isLargeDevice ?
                                <Table
                                    data={filteredProduct}
                                    column={column}
                                    canEdit={permission?.product?.update}
                                    canDelete={permission?.product?.delete}
                                    onEdit={(id)=>navigate('/product/form',{state:{canEdit:true,productId:id}})}
                                    onDelete={deleteHandler}
                                    onNavigate={(id)=>navigate(`/product/${id}`)}
                                /> :
                                <div>
                                    {
                                        filteredProduct.map((prod) => {
                                            return (
                                                <Link to={`/product/${prod.id}`} key={`${prod.id}-card`}>
                                                    <ListCard title={prod?.name} data={[prod?.category,prod?.price]}></ListCard>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div> :
                    <div>No Product found</div>
            }
        </>
    )
}

export default Product