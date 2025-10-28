import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/login'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/dashboard/Home'
import EmployeePage from './pages/modules/EmployeePage'
import ProductPage from './pages/modules/ProductPage'
import EnterprisePage from './pages/modules/EnterprisePage'
import RolePage from './pages/modules/RolePage'
import UserPage from './pages/modules/UserPage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import AuthProtected from './utils/AuthProtected'
import AppLayout from './layout/AppLayout'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<AuthProtected>
        <Login></Login>
      </AuthProtected>}></Route>
      <Route path='/' element={<Dashboard></Dashboard>}></Route>
      <Route element={<AppLayout></AppLayout>}>
      <Route path='/:model' element={<Home></Home>}></Route>
        <Route element={<ProtectedRoutes></ProtectedRoutes>}>
          <Route path='/employee/form' element={<EmployeePage></EmployeePage>}></Route>
          <Route path='/product/form' element={<ProductPage></ProductPage>}></Route>
          <Route path='/enterprise/form' element={<EnterprisePage></EnterprisePage>}></Route>
          <Route path='/role/form' element={<RolePage></RolePage>}></Route>
          <Route path='/user/form' element={<UserPage></UserPage>}></Route>
        </Route>
      </Route>
      

    </Routes>
  )
}

export default App