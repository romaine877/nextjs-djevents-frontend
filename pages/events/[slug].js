import styles from "@/styles/Event.module.css";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import router, { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter()
  

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <ToastContainer/>
         
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={(evt.image.formats.large) ? evt.image.formats.large.url : evt.image.formats.medium.url} width={960} height={600} />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>{evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   const paths = events.map((evt) => ({
//     params: { slug: evt.slug },
//   }));
//   return {
//     paths,
//     fallback: true
//   };
// }
// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/events?slug=${slug}`);
//   const events = await res.json();
//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 5,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`)
    
    const events = await res.json()
    if(events.length === 0){
      return{
        redirect:{
          destination: '/404',
          permanent: false
        }
      }
    }

    return{props:{evt: events[0]}}
}
