import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../src2/modules/dashboard/Dashboard'
import Login from '../src2/modules/login/Login'
import Employee from '../src2/modules/employee/Employee'
import AuthProtected from '../src2/routes/AuthProtected'
import ReadProtected from '../src2/routes/ReadProtected'
import EmployeeDetail from '../src2/modules/employee/EmployeeDetail'
import WriteProtected from '../src2/routes/WriteProtected'
import EmployeeForm from '../src2/modules/employee/EmployeeForm'
import Enterprise from '../src2/modules/enterprise/Enterprise'
import EnterpriseDetail from '../src2/modules/enterprise/EnterpriseDetail'
import EnterpriseForm from '../src2/modules/enterprise/EnterpriseForm'
import Product from '../src2/modules/product/Product'
import ProductDetail from '../src2/modules/product/ProductDetail'
import ProductForm from '../src2/modules/product/ProductForm'
import Role from '../src2/modules/role/Role'
import RoleDetail from '../src2/modules/role/RoleDetail'
import RoleForm from '../src2/modules/role/RoleForm'
import User from '../src2/modules/user/User'
import UserDetail from '../src2/modules/user/UserDetail'
import UserForm from '../src2/modules/user/UserForm'
import Permission from '../src2/modules/permission/Permission'
import Navbar from '../src2/components/Navbar'

function App2() {
  return (
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

export default App2