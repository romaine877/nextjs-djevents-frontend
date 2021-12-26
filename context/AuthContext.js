import { NEXT_LOGIN_API_URL } from "@/config/index";

const { createContext, useState } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const register = async (user) => {
    console.table(user);
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

  const logout = () => {
    setUser(null);
    console.log("Logged out");
  };

  const checkIsLoggedIn = async (user) => {
    console.log("check");
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
