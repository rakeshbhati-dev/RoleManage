import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';
import { particularUser } from '../services/user';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [roleId, setRoleId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  async function fetchUser() {
    if (token) {
      const decode = jwtDecode(token)
      setRoleId(decode.role)
      const userId = decode.userId;
      try {
        const response = await particularUser(token,userId)
        setUser(response.user);
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    }
    else{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [token])
  return (
    <AuthContext.Provider value={{ token, setToken, roleId,loading,user,setRoleId,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
