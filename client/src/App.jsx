import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthProtected from './routes/AuthProtected'
import ReadProtected from './routes/ReadProtected'
import WriteProtected from './routes/WriteProtected'
import Employee from './modules/employee/Employee'
import EmployeeDetail from './modules/employee/EmployeeDetail'
import EmployeeForm from './modules/employee/EmployeeForm'
import Dashboard from './modules/dashboard/Dashboard'
import Login from './modules/login/Login'
import Enterprise from './modules/enterprise/Enterprise'
import EnterpriseDetail from './modules/enterprise/EnterpriseDetail'
import EnterpriseForm from './modules/enterprise/EnterpriseForm'
import Product from './modules/product/Product'
import ProductDetail from './modules/product/ProductDetail'
import ProductForm from './modules/product/ProductForm'
import Role from './modules/role/Role'
import RoleDetail from './modules/role/RoleDetail'
import RoleForm from './modules/role/RoleForm'
import User from './modules/user/User'
import UserDetail from './modules/user/UserDetail'
import UserForm from './modules/user/UserForm'
import Permission from './modules/permission/Permission'
import Navbar from './components/Navbar'

function App() {
  return(
    <>
        <Navbar></Navbar>
          <Routes>
            <Route path='/' element={ <AuthProtected> <Dashboard /> </AuthProtected> } />
            <Route path='/login' element={<Login />} />
    
            <Route path='employee'>
              <Route index element={ <ReadProtected module='employee'> <Employee /> </ReadProtected> } />
              <Route path=':id' element={ <ReadProtected module='employee'> <EmployeeDetail /> </ReadProtected>} />
              <Route path='form' element={ <WriteProtected module='employee'> <EmployeeForm /> </WriteProtected> } />
            </Route>
    
            <Route path='enterprise'>
              <Route index element={ <ReadProtected module='enterprise'> <Enterprise /> </ReadProtected> } />
              <Route path=':id' element={ <ReadProtected module='enterprise'> <EnterpriseDetail /> </ReadProtected>} />
              <Route path='form' element={ <WriteProtected module='enterprise'> <EnterpriseForm /> </WriteProtected> } />
            </Route>
    
            <Route path='product'>
              <Route index element={ <ReadProtected module='product'> <Product /> </ReadProtected> } />
              <Route path=':id' element={ <ReadProtected module='product'> <ProductDetail /> </ReadProtected>} />
              <Route path='form' element={ <WriteProtected module='product'> <ProductForm /> </WriteProtected> } />
            </Route>
    
            <Route path='role'>
              <Route index element={ <ReadProtected module='role'> <Role /> </ReadProtected> } />
              <Route path=':id' element={ <ReadProtected module='role'> <RoleDetail /> </ReadProtected>} />
              <Route path='form' element={ <WriteProtected module='role'> <RoleForm /> </WriteProtected> } />
            </Route>
    
            <Route path='user'>
              <Route index element={ <ReadProtected module='user'> <User /> </ReadProtected> } />
              <Route path=':id' element={ <ReadProtected module='user'> <UserDetail /> </ReadProtected>} />
              <Route path='form' element={ <WriteProtected module='user'> <UserForm /> </WriteProtected> } />
            </Route>
    
            <Route path='permission' element={<WriteProtected module='permission'><Permission /></WriteProtected>} />
          </Routes>
        </>
  )
}

export default App