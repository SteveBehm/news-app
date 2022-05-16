import styles from '../styles/Home.module.css';
import { Toolbar } from '../components/toolbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faHome } from "@fortawesome/free-solid-svg-icons"; // import the icons you need
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
   <div className='page-container'>

   <Toolbar />

     <div className={styles.main}>
       <h1> Next.js News App</h1>
       <h3>Your one stop shop for the latest news articles</h3>
       <FontAwesomeIcon onClick={() => {
          router.push('/feed/1')
       }} style={{fontSize: '5rem', color: 'limegreen', cursor: 'pointer'}} icon={faHome}></FontAwesomeIcon>
     </div>
   </div>
  )
}
