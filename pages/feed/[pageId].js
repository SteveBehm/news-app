import styles from '../../styles/Feed.module.css';
import { useRouter } from 'next/router';
import { Toolbar } from '../../components/toolbar';
import Head from 'next/head';

export const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();

  return (
    <>
    <Head>
      <meta property="og:image" content={articles[0]?.urlToImage} />
      <meta property="og:description" content={articles[0]?.description} />
      <meta property="og:title" content={articles[0]?.title + ' and more!'} />
    </Head>
      <div className='page-container'>
        <Toolbar />
        <div className={styles.main}>
          {
            articles.map((article, index) => (
              <div key={index} className={styles.post}>
                <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                <p>{article.description}</p>
                {!!article.urlToImage && <img src={article.urlToImage} />}
              </div>
            ))
          }
        </div>

        <div className={styles.paginator}>

          <div
            onClick={() => {
              if (pageNumber > 1) {
                router.push(`/feed/${pageNumber - 1}`)
              }
            }}
            className={pageNumber === 1 ? styles.disabled : styles.active}>
            Previous Page
          </div>

          <div>#{pageNumber}</div>

          <div
            onClick={() => {
              if (pageNumber < 5) {
                router.push(`/feed/${pageNumber + 1}`)
              }
            }}
            className={pageNumber === 5 ? styles.disabled : styles.active}>
            Next Page
          </div>

        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async pageContext => {
  // we can get the page number from the pageContext automatically given to us by Next.js
  const pageNumber = pageContext.query.pageId;

  // if the pageNumber is falsy, less than 1 or greater than 5
  // the props for the function will render the first page
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1
      }
    }
  }

  // if the pageNumber is something in the realm of possibility then
  // we need to set up the api response to get the appropriate data for our props
  const apiResponse = await fetch (
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    },
  );

  const apiJson = await apiResponse.json();
  // if you console.log(apiJson) you will see that there is an articles property that is an
  // array of objects. These are the articles we want to story and display
  const { articles } = apiJson;
  // now we want to return articles from th function so that they can be used in the props
  // in our component
  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber)
    }
  }
}

export default Feed;
