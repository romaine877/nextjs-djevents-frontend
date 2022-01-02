import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { getCookie } from "../../helpers";

export default function DashboardPage({events}) {
    return (
        <Layout title="Dashboard">
            <h1>Dashboard</h1>
            <div>
                {events.length==0 && <h2>No Events</h2>}
                {events.map((e)=>(
                    <EventItem key={e.id} event={e}/>
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