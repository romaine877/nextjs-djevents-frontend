import DashboardItem from "@/components/DashboardItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { getCookie } from "../../helpers";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "@/context/AuthContext"
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";


export default function DashboardPage({events, token}) {

    const router = useRouter()

    const {user} = useContext(AuthContext)

    const deleteItem = async (id) => {
        
            const res = await toast.promise(
              fetch(`${API_URL}/events/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              }),
              {
                pending: 'Deleting item',
                success: 'Item Deleted',
                error: 'error',
              },
              {
                onClose: () => router.reload(),
                autoClose: 700,
                hideProgressBar: true,
                position: "top-center",
              }
          )
        
        if(res.ok){
            console.log(`item id: ${id} deleted`)
        }
           
          
    }


    return (
        <Layout title="Dashboard">
            <ToastContainer/>
            <h1>Dashboard</h1>
            <div>
                {events.length==0 && <h2>No Events</h2>}
                {events.map((e)=>(
                    <DashboardItem key={e.id} event={e} handleDelete={deleteItem}/>
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({req}){

    const {token} = getCookie(req)
    const response = token || null
    
    
    
    const res = await fetch(`${API_URL}/events/me`,{
        method: 'GET',
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const events = await res.json()
    if(!response){
        return{
            redirect:{
                destination: '/account/login',
                permanent: false,
            }
        }
    }
    return{
        props: {events, token}
    }
}