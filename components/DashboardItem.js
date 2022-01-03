import Link from "next/link"
import { FaPencilAlt, FaTimes } from "react-icons/fa"
import styles from "@/styles/Dashboard.module.css"

export default function DashboardItem({event, handleDelete}) {
    return (
        <div className={styles.event}>
            <Link href={`/events/${event.slug}`}>
            <a>
                <h4>{event.name}</h4>
            </a>
            </Link>
            <div>
               

                
                <Link href={`/events/edit/${event.id}`}>
                <a className={styles.edit}>
                <FaPencilAlt/>
                <span>Edit</span>
                </a>

                </Link>
               
                <a href="#" className={styles.delete} onClick={()=>handleDelete(event.id)}>
                <FaTimes/>
                <span>Delete</span>
                </a>

                

            </div>
        </div>
    )
}
