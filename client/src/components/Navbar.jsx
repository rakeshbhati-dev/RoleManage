import React, { useContext } from 'react'
import Button from './Button'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const {roleId,setRoleId,setToken}=useContext(AuthContext)
    const navigate=useNavigate()
    function logoutHandler(){
        setRoleId(null)
        setToken(null)
        navigate('/login')
    }
  return (
    <>
    <nav className='flex w-full items-center justify-between px-4 py-2 border border-stone-300'>
        <h3 className='font-semibold text-xl'>RoleManage</h3>
        {
            roleId?
            <>
            <Button value='Logout' onClick={logoutHandler}></Button>
            </>:<>
            <Button value='Login' onClick={()=>navigate('/login')}></Button>
            </>
        }
    </nav>
    </>
  )
}

export default Navbar