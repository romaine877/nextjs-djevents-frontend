import DashboardItem from "@/components/DashboardItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { getCookie } from "../../helpers";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

export default function DashboardPage({events}) {

    const router = useRouter()

    const deleteItem = async (id) => {
        

        

            const res = await toast.promise(
              fetch(`${API_URL}/events/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json",
                }
              }),
              {
                pending: 'Deleting item',
                success: 'Item Deleted',
                error: 'error',
              },
              {
                onClose: () => router.push('/account/dashboard'),
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
    
    const res = await fetch(`${API_URL}/events/me`,{
        method: 'GET',
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const events = await res.json()
    return{
        props: {events}
    }
}