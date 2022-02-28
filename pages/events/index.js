import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";
import Pagination from "../../components/Pagination";
const PER_PAGE = 1

export default function EventsPage({events,page,total}) {
  
  return (
    <Layout>
        <h1>All Events</h1>
        {events.length === 0 && <h3>No events</h3>}
        {events.data.map(item=>(
            <EventItem key={item.id} evt={item}/>  
        ))}
      <Pagination page={page} total={total} PER_PAGE={PER_PAGE}/>
    </Layout>
  )
}

export async function getServerSideProps({query:{page= 1}}){
  const start = +page  === 1 ? 0 : (+page -1) * PER_PAGE
  //fetch total
  const totalRes = await fetch('http://localhost:1337/api/events?pagination[withCount]=t')
  const total = await totalRes.json();
  //fetch limit
  const eventRes = await fetch(`http://localhost:1337/api/events?populate=*&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`)
  const events = await eventRes.json();
  return{
    props: {events, page:+page,total},
  }
}