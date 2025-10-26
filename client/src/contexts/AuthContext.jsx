import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token,setToken]=useState(localStorage.getItem('token')||null)
  const [roleId,setRoleId]=useState(null)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    if(token){
      const decode=jwtDecode(token)
      setRoleId(decode.role)
    }
    setLoading(false)
  },[token])
  return (
    <AuthContext.Provider value={{token,setToken,roleId }}>
      {children}
    </AuthContext.Provider>
  );
};
