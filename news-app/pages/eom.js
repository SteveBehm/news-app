export const EOM = ({employee}) => {
  console.log(employee);
  return (
    <div className='page-container'>
      <div>
        <h1>Employee of The Month</h1>
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
