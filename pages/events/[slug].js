
import Layout from "../../components/Layout"
import Link from 'next/link'
import {useRouter} from 'next/router'
import styles from '../../styles/Event.module.css'
import {FaStar, FaPencilAlt,FaTimes} from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({evt}) {
    const router= useRouter();
    const deleteEvent = async(e)=>{
        if(confirm('Are you sure?')){
            const res = await fetch(`http://localhost:1337/api/events/${evt.data[0].id}`,{
                method:'DELETE'
            })
            const data = await res.json()
            if(!res.ok){
                toast.error("Something Went Wrong!")
            }else{
                toast.success('Delete sucess')  
                router.push('/events')        
            }
        }
    }
  return (
    <Layout>
        <div className={styles.event}>
            <div className={styles.controls}>
                <Link href={`/events/edit/${evt.data[0].id}`}>
                    <a><FaPencilAlt/>Edit Event</a>
                </Link>
                <Link href='#'>
                    <a className={styles.delete} onClick={deleteEvent}><FaTimes/>Delete Event</a>
                </Link>
            </div>            
            {evt.data.map(item=>(
                <div className={styles.info} key={item.id}>
                    <span>
                        Data: 
                            {new Date(item.attributes.date)
                            .toISOString()
                            .substring(0,10)
                            .split("-")
                            .reverse()
                            .join("/")}
                    </span>
                    <ToastContainer position='top-center'/>
                    <h2>{item.attributes.name}</h2>
                    <h3>Atrações: {item.attributes.performers}</h3>
                    <h4>{item.attributes.venue}</h4>
                    <h5>{item.attributes.address}</h5>
                    <p><FaStar/> {item.attributes.description}</p>
                </div>
            ))}
        </div>      
    </Layout>
  )
}

export async function getServerSideProps({query:{slug}}){
  const res = await fetch(`http://localhost:1337/api/events?filters[slug][$eq]=${slug}`)
  const events = await res.json();
  return{
    props: {
        evt : events
    } 
  }
}