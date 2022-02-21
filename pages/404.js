import Layout from "../components/Layout"
import styles from '../styles/404.module.css'
import Link from 'next/link'
import {FaExclamation} from 'react-icons/fa'

export default function NotFoundPage() {
  return (
      <Layout>
        <div className={styles.error}>
            <h1><FaExclamation/>404</h1>
            <h4>Sorry, there is nothing here</h4>
            <Link href='/'>Go Back Home</Link>
       </div>
      </Layout>

  )
}
