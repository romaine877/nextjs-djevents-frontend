import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'
import {FaExclamationTriangle} from 'react-icons/fa'

export default function NotFound() {
    return (
        <Layout>
            <div className={styles.error}>
                <h1> <FaExclamationTriangle/>  404</h1>
                <h4>Sorry page not found</h4>
                <Link href='/'>Go back home</Link>
            </div>
            
        </Layout>
    )
}
