
import Layout from "../../components/Layout"
import styles from '../../styles/Event.module.css'
import {FaStar} from 'react-icons/fa'

export default function EventPage({evt}) {
  return (
    <Layout>
        <div className={styles.event}>            
                {evt.data.map(item=>(
                    <div className={styles.info} key={item.key}>
                        <span>Data: {item.attributes.date.split('-').reverse().join('/')}</span>
                        <h2>{item.attributes.name}</h2>
                        <h3>Atrações: {item.attributes.performers}</h3>
                        <h4>{item.attributes.venue}</h4>
                        <h5>{item.attributes.address}</h5>
                        <p><FaStar/> {item.attributes.description}</p>
                    </div>
                ))}
            {console.log(evt)}
        </div>      
    </Layout>
  )
}

export async function getServerSideProps({query:{slug}}){
  const res = await fetch(`http://localhost:1337/api/events?filters[id][$eq]=${slug}`)
  const events = await res.json();
  console.log(events)
  return{
    props: {
        evt : events
    } 
  }
}