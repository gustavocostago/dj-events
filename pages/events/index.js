import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";

export default function EventsPage({events}) {
  return (
    <Layout>
        <h1>Movies</h1>
        {events.length === 0 && <h3>No events</h3>}
        {events.results.map(item=>(
            <EventItem key={item.key} evt={item}/>  
        ))}

    </Layout>
  )
}

export async function getStaticProps(){
  const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=`+process.env.API_KEY+'&language=pt-BR&page=3')
  const events = await res.json();
  console.log(events)
  return{
    props: {events},
    revalidate: 1 
  }
}