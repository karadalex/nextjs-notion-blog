import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import { dateIsoStringToReadable } from '../utils/date'
import { getPosts } from './api/posts'
import styles from '../styles/Home.module.css'


export default function Home({ posts }) {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my <a href="#">Blog</a>
        </h1>

        <p className={styles.description}>
          Powered by the
          <code className={styles.code}>Notion API</code>
        </p>

        <div className={styles.grid}>
          {posts.map((post, index) => (
            <a href={`/blog/${post.slug}`} className={styles.card} key={`post-${index}`}>
              <h3>{post.title}</h3>
              <Image 
                src={post.image}
                width="200"
                height="120"
              /><br/>
              <small>{dateIsoStringToReadable(post.date)}</small>
              <p>{post.description}</p>
            </a>
          ))}
        </div>
      </main>

      <Footer/>
    </div>
  )
}

export async function getStaticProps(context) {
  const posts = await getPosts()
  
  return {
    props: {
      posts
    },
    revalidate: 60
  }
}
