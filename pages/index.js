import Link from "next/link";
import Layout from "../components/Layout"
import EventItem from "../components/EventItem";

export default function HomePage({events}) {
  return (
    <Layout>
        <h1>UpComing Events</h1>
        {events.length === 0 && <h3>No events</h3>}
        {events.map(item=>(
            <EventItem key={item.id} evt={item}/>  
        ))}
        {events.length > 0 && (
            <Link href='/events'>
                <a className='btn-secondary'>View All Events</a>
            </Link>
        )}
    </Layout>
  )
}

export async function getStaticProps(){
  const res = await fetch('http://localhost:1337/api/events')
  const events = await res.json();
  return{
    props: {events: events.data.slice(0,3)},
    revalidate: 1 
  }
}