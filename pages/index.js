import Link from "next/link";
import Layout from "../components/Layout"
import EventItem from "../components/EventItem";

export default function HomePage({events}) {
  return (
    <Layout>
        <h1>UpComing Events</h1>
        {events.length === 0 && <h3>No events</h3>}
        {events.data.map(item=>(
            <EventItem key={item.key} evt={item}/>  
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
    props: {events},
    revalidate: 1 
  }
}