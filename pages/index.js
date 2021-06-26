import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import posts from "../data/posts"

export default function Home() {
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
          {posts.map(post => (
            <a href={post.slug} className={styles.card}>
              <h3>{post.title}</h3>
              <Image 
                src={post.image}
                width="200"
                height="120"
              /><br/>
              <small>{post.date}</small>
              <p>{post.description}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        My blog made with <a href="https://developers.notion.com/" target="_blank" rel="noopener noreferrer">Notio.so API</a>
      </footer>
    </div>
  )
}
