import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/login'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
    </Routes>
    </>
  )
}

export default App