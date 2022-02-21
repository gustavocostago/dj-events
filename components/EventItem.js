import Link from 'next/link'
import Image from 'next/image'
import {FaStar} from 'react-icons/fa';
import styles from '../styles/EventItem.module.css'

export default function EventItem({evt}) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image src={`https://image.tmdb.org/t/p/original/`+evt.poster_path} width={170} height={200}/>
      </div>
      <div className={styles.info}>
        <span>Data Lançamento: {evt.release_date.split('-').reverse().join('/')}</span>
        <h2>{evt.title}</h2>
        <p><FaStar/> {evt.vote_average}</p>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.id}`}>
            <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}
