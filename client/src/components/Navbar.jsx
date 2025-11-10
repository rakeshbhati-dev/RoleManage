import React, { useContext } from 'react'
import Button from './Button'
import { AuthContext } from '../../src/contexts/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

function Navbar() {
    const {setRoleId,setToken,token}=useContext(AuthContext)
    const location=useLocation()
    const isMobile=useMediaQuery({ query: `(max-width:767px)` })
    const isDashboard=location.pathname==='/'

    const navigate=useNavigate()
    function logoutHandler(){
        setRoleId(null)
        setToken(null)
        navigate('/login')
        localStorage.removeItem('token')
    }

    if(!token) return null
    if(isMobile && !isDashboard) return null


  return (
    <>
    <nav className='flex w-full items-center justify-between px-4 py-2 border border-stone-300'>
        <Link to='/' className='font-semibold text-xl'>RoleManage</Link>
         <Button value='Logout' onClick={logoutHandler}></Button>
    </nav>
    </>
  )
}

export default Navbar