import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const posts = [
  {
    title: "First blog post",
    description: "this is a description",
    tags: ["tag1", "tag2", "tag3"],
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
    slug: "first-blog-post",
    date: "23/06/2021"
  },
  {
    title: "Second blog post",
    description: "this is a description",
    tags: ["tag1", "tag2", "tag3"],
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
    slug: "second-blog-post",
    date: "23/06/2021"
  },
  {
    title: "Third blog post",
    description: "this is a description",
    tags: ["tag1", "tag2", "tag3"],
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
    slug: "third-blog-post",
    date: "23/06/2021"
  },
  {
    title: "Fourth blog post",
    description: "this is a description",
    tags: ["tag1", "tag2", "tag3"],
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
    slug: "fourth-blog-post",
    date: "23/06/2021"
  }
]

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
