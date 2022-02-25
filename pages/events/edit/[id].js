import moment from 'moment'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import Modal from '../../../components/Modal'
import styles from '../../../styles/Form.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {FaImage} from 'react-icons/fa'
import slugify from 'slugify';
import ImageUpload from '../../../components/ImageUpload'


export default function EditEventPage({evt}) {
    const [imagePreview,setImagePreview] = useState(
        evt.attributes.image.data ? evt.attributes.image.data[0].attributes.formats.thumbnail.url : null 
    )
    const [showModal, setShowModal] = useState(false)
    const [values,setValues] = useState({
        name: evt.attributes.name,
        performers: evt.attributes.performers,
        venue:evt.attributes.venue,
        address:evt.attributes.address,
        date:evt.attributes.date,
        slug:evt.attributes.slug,
        description:evt.attributes.description
    })
    const router = useRouter();
    const handleSubmit = async (e)=>{
        e.preventDefault()
        //Validação
        const hasEmptyFiels = Object.values(values).some((element)=> element === '')
        if(hasEmptyFiels){
            toast.error('Please fill in all fields')
        }
        const res = await fetch(`http://localhost:1337/api/events/${evt.id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({data:values})
        })
        if(!res.ok){
            toast.error('Something Went Wrong')
        }
        else{
            const evt = await res.json();
            toast.success('Update sucess')
            router.push(`/events/${evt.data.attributes.slug}`)
        }
    }    
    const slug = slugify(values.name,{lower:true})
    const handleInputChange = (e) =>{        
        const {name,value} = e.target
        let updatedValue = {};    
        updatedValue = {"slug":slug};            
        setValues({...values,
            ...updatedValue,
            [name]:value})                 
    }
    const imageUploaded = async (e) =>{
        const res = await fetch(`http://localhost:3000/api/events/${evt.id}`)
        const data = await res.json()
        setImagePreview(data.attributes.image.data[0].attributes.formats.large.url)
        setShowModal(false)
    }    
  return (
    <Layout title='Update Event'>
        <Link href='/events'>Go Back Home</Link>
        <h1>Edit Event</h1>
        <ToastContainer position='top-center'/>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
            <div>
                <label htmlFor='name'>Event Name</label>
                <input
                type='text'
                id='name'
                name='name'
                value={values.name || ''}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='performers'>Performers</label>
                <input
                type='text'
                name='performers'
                id='performers'
                value={values.performers || ''}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='venue'>Venue</label>
                <input
                type='text'
                name='venue'
                id='venue'
                value={values.venue || ''}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='address'>Address</label>
                <input
                type='text'
                name='address'
                id='address'
                value={values.address || ''}
                onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor='date'>Date</label>
                <input
                type='date'
                name='date'
                id='date'
                value={moment(values.date).format('yyyy-MM-DD') || ''}
                onChange={handleInputChange}
                />
            </div>
            </div>
            <div>
            <label htmlFor='description'>Event Description</label>
            <textarea
                type='text'
                name='description'
                id='description'
                value={values.description || ''}
                onChange={handleInputChange}
            ></textarea>
            </div>
            <button className='btn' type='submit'>Update Event</button>
        </form>
        <div className={styles.img}>
            <h4>Event Image</h4>
            {imagePreview?(
            <Image src={imagePreview} width={170} height={100} alt='image'/>)
                :<div>
                    <p>No image upload</p>
                </div>
            }             
        </div>
        <button onClick={()=>{setShowModal(true)}} className='btn-secondary btn-icon'>
            <FaImage/> Set Image
        </button>
        <Modal show={showModal} onClose={()=>{setShowModal(false)}}>
            <ImageUpload evtId={evt.id} imageUploaded={imageUploaded}/>
        </Modal>
    </Layout>
  )
}
export async function getServerSideProps({params:{id}}){
    const res = await fetch(`http://localhost:1337/api/events/${id}?populate=*`)
    const evt = await res.json()
    return{
        props:{
            evt: evt.data
        }
    }
}