import Image from 'next/image';
import Link from 'next/link'
import { useState } from 'react';
import {FaStar} from 'react-icons/fa';
import styles from '../styles/EventItem.module.css'

export default function EventItem({evt}) { 
    const [imagePreview,setImagePreview] =useState(
        evt.attributes.image.data ? evt.attributes.image.data[0].attributes.formats.thumbnail.url : null 
    )
  return (
    <div className={styles.event} key={evt.id}>
        <div className={styles.img}>
            {imagePreview?(
                <Image src={imagePreview} width={400} height={300} alt='image'/>
            ): <div>
                    <p>No image upload</p>
                </div>}    
        </div>
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
