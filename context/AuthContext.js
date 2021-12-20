const { createContext, useState } = require("react");


const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState({name: 'romaine'})
    const [error, setError] = useState(null)

    const register = async(user)=>{
        console.table(user)
    }

    const login= async({email:identifier, password})=>{
        console.table({identifier, password})
    }

    const logout=()=>{
        setUser(null)
        console.log('Logged out')
    }

    const checkIsLoggedIn = async(user)=>{
        console.log('check')
    }

    return(
        <AuthContext.Provider value={{register, login, logout, user, error}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext