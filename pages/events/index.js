import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";

export default function EventsPage({events}) {
  return (
    <Layout>
        <h1>All Events</h1>
        {events.length === 0 && <h3>No events</h3>}
        {events.data.map(item=>(
            <EventItem key={item.id} evt={item}/>  
        ))}

    </Layout>
  )
}

export async function getStaticProps(){
  const res = await fetch('http://localhost:1337/api/events?populate=*')
  const events = await res.json();
  return{
    props: {events},
    revalidate: 1 
  }
}