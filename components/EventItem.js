import Link from 'next/link'
import {FaStar} from 'react-icons/fa';
import styles from '../styles/EventItem.module.css'

export default function EventItem({evt}) { 
  return (
    <div className={styles.event} key={evt.id}>
        <div className={styles.info}>
            <span>Data: {new Date(evt.attributes.date).toISOString().substring(0,10).split("-").reverse().join("/")}</span>
            <h2>{evt.attributes.name}</h2>
            <h3>Atrações: {evt.attributes.performers}</h3>
            <h4>{evt.attributes.venue}</h4>
            <h5>{evt.attributes.address}</h5>
            <p><FaStar/> {evt.attributes.description}</p>
        </div>
        <div className={styles.link}>
            <Link href={`/events/${evt.attributes.slug}`}>
                <a className='btn'>Details</a>
            </Link>
        </div>
    </div>
  )
}
