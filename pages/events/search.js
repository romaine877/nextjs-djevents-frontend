import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import QueryString from "qs";
import { useRouter } from "next/router";
import Link from 'next/link'
export default function SearchPage({ events }) {
    const router = useRouter()
  return (
    <Layout title='Search Results'>
        <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length == 0 && <h2>No Events</h2>}
      {events.map((e) => (
        <EventItem key={e.id} event={e}/>
      ))}
    </Layout>
  );
}

export async function getServerSideProps({query: {term}}) {

    const query = QueryString.stringify({
        _where: {
            _or:[
                {name_contains:term},
                {venue_contains:term},
                {performers_contains:term},
                {description_contains:term},
            ]
        }
    })


  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
