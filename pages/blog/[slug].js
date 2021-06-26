import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import posts from "../../data/posts"


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

        <p className={styles.description}>
          {post.description}
        </p>

        <img src={post.image}/>

        <div className={styles.grid}>
          <p>{post.body}</p>
        </div>
      </main>

      <footer className={styles.footer}>
        My blog made with&nbsp;<a href="https://developers.notion.com/" target="_blank" rel="noopener noreferrer">Notio.so API</a>
      </footer>
    </div>
  )
}


export async function getServerSideProps(context) {
  const slug = context.query.slug
  // find post from data source
  const post = posts.find(_post => _post.slug === slug)
  if (post) {
    return {
      props: {
        post
      },
    }
  } else {
    return {
      notFound: true
    }
  }
}