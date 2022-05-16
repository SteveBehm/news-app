import styles from '../styles/EOM.module.css';
import { Toolbar } from '../components/toolbar';

export const EOM = ({employee}) => {

  return (
    <div className='page-container'>

    <Toolbar />

      <div className={styles.main}>
        <h1>Employee of The Month</h1>

        <div className={styles.employeeOfTheMonth}>
          <h3>{employee.name}</h3>
          <h6>{employee.position}</h6>
          <img src={employee.image} />
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  )
}
// this allows us to do server-side rendering and get data from the db
// and pass that data into our component function as props
// in this case our prop is {employee}
export const getServerSideProps = async pageContext => {
  const apiResponse = await fetch(
    'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth',
  )
  // this will convert the response into json
  const employee = await apiResponse.json();
  // we return it in such a way that the component is able to parse out the prop
  return {
    props: {
      employee: employee
    }
  }
}

export default EOM;
