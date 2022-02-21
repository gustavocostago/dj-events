import Link from "next/link";
import Layout from "../components/Layout"
import EventItem from "../components/EventItem";

export default function HomePage({events}) {
  return (
    <Layout>
        <h1>Top Rated Movies</h1>
        {events.length === 0 && <h3>No events</h3>}
        {events.map(item=>(
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
  const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=`+process.env.API_KEY+'&language=pt-BR&page=6')
  const events = await res.json();
  return{
    props: {events:events.results.slice(0,3)},
    revalidate: 1 
  }
}