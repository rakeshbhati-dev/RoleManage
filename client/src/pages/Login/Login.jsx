import React, { useContext, useState } from 'react'
import Input from '../../components/Input'
import { textValidation } from '../../utils/textValidation'
import Button from '../../components/Button'
import { login } from '../../services/user'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const {setToken}=useContext(AuthContext)
  const navigate=useNavigate()

  function inputHandler(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const [errorMessages, setErrorMessages] = useState({})

  function isValidate() {
          let err = {}
          if (textValidation(formData.email, 'Email ID', mailPattern, 10)) {
              err.mailError = textValidation(formData.email, 'Email ID', mailPattern, 10)
          }
          if (textValidation(formData.password, 'Password', '', 8)) {
              err.pswdError = textValidation(formData.password, 'Password', '', 8)
          }
          setErrorMessages(err)
          if (Object.keys(err).length > 0) {
              return false
          }
          else {
              return true
          }
      }

      async function submitHandler(e) {
        e.preventDefault()
        if (isValidate()) {
            try {
                const response=await login(formData)
                setToken(response.token)
                navigate('/')
                
                localStorage.setItem('token',response.token)
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <div className='h-screen flex justify-center items-center'>
      <form onSubmit={submitHandler} className='w-full md:w-1/2 lg:w-1/3 border border-stone-500 rounded p-5'>
      <h2 className='font-semibold text-lg mb-3'>Login</h2>
        <div className='mb-5'>
          <Input label="Email ID" name="email" id="mail" type="email" placeholder="Enter Email ID" onChange={inputHandler} errorMsg={errorMessages.mailError} divStyle='mb-3' inputStyle="py-2 " />
        </div>
        <div className='mb-5'>
          <Input label="Password" name="password" id="pswd" type="password" placeholder="Enter Password" onChange={inputHandler} errorMsg={errorMessages.pswdError} divStyle='mb-3' inputStyle="py-2" />
        </div>
        <Button value='Login' buttonStyle='mt-4'></Button>
      </form>
    </div>
  )
}

export default Login