import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { deleteEnterprise, getEnterprise } from '../../services/enterprise'
import Details from '../../components/Details'
import { PermissionContext } from '../../contexts/PermissionContext'

function EnterpriseDetail() {
    const { id } = useParams()
    const [enterprise, setEnterprise] = useState(null)
    const { token, loading: authLoading } = useContext(AuthContext)
    const { permission, loading: permissionLoading } = useContext(PermissionContext)
    const navigate = useNavigate()

    const row = [
        { header: "Name", value: (obj) => obj?.name },
        { header: "Email ID", value: (obj) => obj?.email },
        { header: "Country", value: (obj) => obj?.country },
        { header: "State", value: (obj) => obj?.state },
        { header: "City", value: (obj) => obj?.city },
        { header: "Address", value: (obj) => obj?.address },
        { header: "Website URL", value: (obj) => obj?.website },
    ]

    async function fetchEnterprise() {
        try {
            const response = await getEnterprise(token, id)
            setEnterprise(response.enterprise);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteHandler(id) {
        if (confirm("Delete Enterprise")) {
            try {
                await deleteEnterprise(token, id)
                navigate('/enterprise', { replace: true })
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchEnterprise()
    }, [])

    if (authLoading || permissionLoading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <Details data={enterprise}
                rows={row} module="Enterprise"
                canEdit={permission?.enterprise?.update}
                canDelete={permission?.enterprise?.delete}
                onEdit={(id) => navigate('/enterprise/form', { state: { canEdit: true, enterpriseId: id } })}
                onDelete={deleteHandler} />
        </div>
    )
}

export default EnterpriseDetail