import Head from 'next/head'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
import Tags from '../../components/Tags'
import { dateIsoStringToReadable } from '../../utils/date'
import styles from '../../styles/Home.module.css'


export default function Post({ post }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {post.title}
        </h1>

        <h2 className={styles.description}>
          {post.description}
        </h2>

        <Author author={post.author}/>
        <small>{dateIsoStringToReadable(post.date)}</small>
        <Tags tags={post.tags}/>

        <img src={post.image}/>

        <div className={styles.grid}>
          {post.body.map((paragraph, index) => (
            <p key={`paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      </main>

      <Footer/>
    </div>
  )
}


export async function getServerSideProps(context) {
  const slug = context.query.slug
  const response = await fetch(`http://localhost:3000/api/posts/get-by-slug/${slug}`)

  if (response.ok) {
    const post = await response.json()
    return {
      props: {
        post
      }
    }

  } else {
    return {
      notFound: true
    }
  }
}