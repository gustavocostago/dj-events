import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout"
import EventItem from "../../components/EventItem";

export default function SearchPage({events}) {
  const router =useRouter()
  return (
    <Layout>
        <Link href='/'>Go back Home</Link>
        <h1>Search for results for {router.query.term}</h1>
        {events.length === 0 && <h3>No events</h3>}
        {events.data.map(item=>(
            <EventItem key={item.attributes.id} evt={item}/>  
        ))}
    </Layout>
  )
}

export async function getServerSideProps({query:{term}}){
  const res = await fetch(`http://localhost:1337/api/events?filters[name][$containsi]=${term}&populate=*`)
  const events = await res.json();
  return{
    props: {events}
  }
}