
import Layout from "../../components/Layout"
import Image from "next/image"
import styles from '../../styles/Event.module.css'
import {FaStar} from 'react-icons/fa'

export default function EventPage({evt}) {
  return (
    <Layout>
        <div className={styles.event}>
            <div className={styles.img}>
                <Image src={`https://image.tmdb.org/t/p/original/`+evt.poster_path} width={960} height={900}/>
            </div>
            <div className={styles.info}>           
                <h2>{evt.title}</h2>                
                <p>{evt.overview}</p>
                <div className={styles.production}>
                    <h4>Produção:</h4>
                    {evt.production_companies.map(item=>(
                        <span key={item.key} style={{marginLeft:'1rem'}}>
                            <Image src={`https://image.tmdb.org/t/p/original/`+item.logo_path} 
                            width={50} height={50}/>
                        </span>
                    ))}
                </div>
                <div className={styles.production}>
                    <h4>Gênero:</h4>
                    {evt.genres.map(item=>(
                        <span key={item.id} style={{marginLeft:'0.5rem'}}>
                            <p>{item.name},</p>                        
                        </span>                    
                    ))}
                </div>
                <span><h4 style={{marginRight:'0.5rem'}}>Data Lançamento: </h4>{evt.release_date.split('-').reverse().join('/')}</span>                               
                <p><FaStar/> {evt.vote_average}</p>
            </div>
        </div>      
    </Layout>
  )
}

export async function getServerSideProps({query:{slug}}){
  const res = await fetch(`https://api.themoviedb.org/3/movie/${slug}+?api_key=`+process.env.API_KEY+'&language=pt-BR&page=3')
  const events = await res.json();
  return{
    props: {
        evt : events
    } 
  }
}