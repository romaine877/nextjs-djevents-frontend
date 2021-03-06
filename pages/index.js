import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import styles from "../styles/Layout.module.css";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length == 0 && <h2>No Events</h2>}
      {events.map((e) => (
        <EventItem key={e.id} event={e}/>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
