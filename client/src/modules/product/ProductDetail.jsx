import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { deleteProduct, getProduct } from '../../services/product'
import Details from '../../components/Details'
import { PermissionContext } from '../../contexts/PermissionContext'

function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { token, loading: authLoading } = useContext(AuthContext)
    const { permission, loading: permissionLoading } = useContext(PermissionContext)
    const navigate = useNavigate()

    const row = [
        { header: "Name", value: (row) => row?.name },
        { header: "Category", value: (row) => row?.category },
        { header: "Price", value: (row) => row?.price },
        { header: "Stocks", value: (row) => row?.stocks },
        { header: "SKU", value: (row) => row?.sku },
        { header: "Enterprise", value: (row) => row?.Enterprise?.name },
    ]

    async function fetchProduct() {
        try {
            const response = await getProduct(token, id)
            setProduct(response.product);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteHandler(id) {
        if (confirm("Delete Product")) {
            try {
                await deleteProduct(token, id)
                navigate('/product', { replace: true })
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
        <div className='flex items-center justify-center h-screen'>
            <Details data={product}
                rows={row} module="product"
                canEdit={permission?.product?.update}
                canDelete={permission?.product?.delete}
                onEdit={(id) => navigate('/product/form', { state: { canEdit: true, productId: id } })}
                onDelete={deleteHandler} />
        </div>
    )
}

export default ProductDetail