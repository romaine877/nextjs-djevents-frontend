import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";


export default function EventsPage({ events, page, count }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length == 0 && <h2>No Events</h2>}
      {events.map((e) => (
        <EventItem key={e.id} event={e}/>
      ))}
      <Pagination page={page} total={count}/>
    </Layout>
  );
}

export async function getServerSideProps({query:{page=1}}) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch events
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await res.json();

  // Fetch amount
  const countRes = await fetch(`${API_URL}/events/count`)
  const count = await countRes.json()
  return {
    props: { events, page: +page, count },
  };
}
