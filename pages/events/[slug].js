
import Layout from "../../components/Layout"
import Link from 'next/link'
import Image from "next/image"
import { useState } from "react"
import {useRouter} from 'next/router'
import styles from '../../styles/Event.module.css'
import {FaStar, FaPencilAlt,FaTimes} from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({evt}) {
    const [imagePreview,setImagePreview] = useState(
        evt.attributes.image.data ? evt.attributes.image.data[0].attributes.formats.thumbnail.url : null 
    )
    const router= useRouter();
    const deleteEvent = async(e)=>{
        if(confirm('Are you sure?')){
            const res = await fetch(`http://localhost:1337/api/events/${evt.id}`,{
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
        <div className={styles.event} key={evt.id}>
            <div className={styles.controls}>
                <Link href={`/events/edit/${evt.id}`}>
                    <a><FaPencilAlt/>Edit Event</a>
                </Link>
                <Link href='#'>
                    <a className={styles.delete} onClick={deleteEvent}><FaTimes/>Delete Event</a>
                </Link>
            </div>            
                <div className={styles.img}>
                    {imagePreview?(
                    <Image src={imagePreview} width={400} height={300} alt='image'/>)
                        :<div>
                            <p>No image upload</p>
                        </div>
                    } 
                </div>
                <div className={styles.info} key={evt.id}>
                    <span>
                        Data: 
                            {new Date(evt.attributes.date)
                            .toISOString()
                            .substring(0,10)
                            .split("-")
                            .reverse()
                            .join("/")}
                    </span>
                    <ToastContainer position='top-center'/>
                    <h2>{evt.attributes.name}</h2>
                    <h3>Atrações: {evt.attributes.performers}</h3>
                    <h4>{evt.attributes.venue}</h4>
                    <h5>{evt.attributes.address}</h5>
                    <p><FaStar/> {evt.attributes.description}</p>
            </div> 
        </div>     
    </Layout>
  )
}

export async function getServerSideProps({query:{slug}}){
  const res = await fetch(`http://localhost:1337/api/events?filters[slug][$eq]=${slug}&populate=*`)
  const events = await res.json();
  return{
    props: {
        evt : events.data[0]
    } 
  }
}