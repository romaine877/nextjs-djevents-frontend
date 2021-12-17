import Head from "next/head"
import { useRouter } from "next/router"
import styles from '../styles/Layout.module.css'
import Footer from "./Footer"
import Header from "./header"
import Showcase from "./Showcase"

export default function Layout({title, keywords, description, children}) {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description}/>
                <meta name='keywords' content={keywords}/>
            </Head>
            <Header/>
            {router.pathname === '/' && <Showcase/>}
            <div className={styles.container}>{children}</div>
            <Footer/>
        </div>
    )
}


Layout.defaultProps={
    title: 'Hottest parties in a panorama',
    description: 'Find the latest and hotest parties in  a panorama',
    keywords: 'music, party, parties, events'
}