import { NEXT_LOGIN_API_URL, NEXT_CHECK_LOGIN_API_URL, NEXT_LOGOUT_API_URL, NEXT_REGISTRATION_API_URL } from "@/config/index";
import { useRouter } from "next/router";

const { createContext, useState, useEffect } = require("react");

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter()
  useEffect(() => checkIsLoggedIn() , []);

  const register = async (user) => {
    
    const res = await fetch(NEXT_REGISTRATION_API_URL, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
   
    const data = await res.json()
    if(res.ok){
      setUser(data.user)
      router.push('/')
    }else{
      setError(data)
      setError(null)
    }
  };

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(NEXT_LOGIN_API_URL, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await res.json()
    if(res.ok){
        setUser(data.user)
    }else{
        setError(data.message)
        setError(null)
    }
    
    
  };

  const logout = async () => {
    const res = await fetch(NEXT_LOGOUT_API_URL, { 
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if(res.ok){
      setUser(null);
      console.log("Logged out");
    }
    
  };

  const checkIsLoggedIn = async () => {
    const res = await fetch(NEXT_CHECK_LOGIN_API_URL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      
  })
  const data = await res.json()
  if(res.ok){
      setUser(data.user)
  }else{
      setError(data.message)
      setError(null)
  }
}

  return (
    <AuthContext.Provider value={{ register, login, logout, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
