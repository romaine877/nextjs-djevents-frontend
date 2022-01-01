import { useContext, useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import Link from "next/link"
import Layout from "@/components/Layout"
import styles from "@/styles/Auth.module.css"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "@/context/AuthContext"


export default function RegisterPage() {
    const {register,error} = useContext(AuthContext)


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [username, setUsername] = useState()

    useEffect(()=> error && toast.error(error.message))

    

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(password!=confirmPassword){
            toast.error('Passwords do not match', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return
        }
        register({username, email, password})
    }


    return (
        <Layout>
           <div className={styles.auth}>
           <h1><FaUser/> Register</h1>
           <ToastContainer/>
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                <label htmlFor="Password">Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <label htmlFor="Password">Password Confirmation</label>
                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
                <input type="submit" value="Register" className="btn" />
                <p>Already a User? <Link href='/account/login'><a> Login</a></Link></p>

            </form>
           </div>
            
        </Layout>
    )
}
