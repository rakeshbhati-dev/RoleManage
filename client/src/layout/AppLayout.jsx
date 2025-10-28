import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <>
    <Navbar></Navbar>
    <div className='p-5'>
        <Outlet></Outlet>
    </div>
    </>
  )
}

export default AppLayout