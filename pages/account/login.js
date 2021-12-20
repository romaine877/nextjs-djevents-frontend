import { useContext, useState } from "react"
import { FaUser } from "react-icons/fa"
import Link from "next/link"
import Layout from "@/components/Layout"
import styles from "@/styles/Auth.module.css"
import AuthContext from "@/context/AuthContext"


export default function LoginPage() {
    const {login, error} = useContext(AuthContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) =>{
        e.preventDefault()
        login({email, password})
    }
    return (
        <Layout>
           <div className={styles.auth}>
           <h1><FaUser/> Login</h1>
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <label htmlFor="Password">Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <input type="submit" value="Login" className="btn" />
                <p>Not a User? <Link href='/account/register'><a> Register</a></Link></p>

            </form>
           </div>
            
        </Layout>
    )
}
