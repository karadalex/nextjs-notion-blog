import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import posts from "../data/posts"


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
          {posts.map(post => (
            <a href={`/blog/${post.slug}`} className={styles.card}>
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
        My blog made with&nbsp;<a href="https://developers.notion.com/" target="_blank" rel="noopener noreferrer">Notio.so API</a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const secret = process.env.NOTION_API_KEY
  const database_id = process.env.NOTION_DATABASE_ID

  let headers = new Headers();
  headers.append("Authorization", `Bearer ${secret}`);
  headers.append("Notion-Version", "2021-05-13");
  headers.append("Content-Type", "application/json");

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      page_size: 10,
      sorts: [
        {
          timestamp: "last_edited_time",
          direction: "descending"
        }
      ]
    }),
  };

  const response = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, options)
  const responseData = await response.json()
  // TODO: Filter posts by the published boolean field
  const posts = responseData.results.map(pageObj => {
    return {
      id: pageObj.id,
      title: pageObj.properties.title.title[0].plain_text,
      description: pageObj.properties.description.rich_text[0].plain_text,
      tags: pageObj.properties.tags.multi_select.map(notionTag => notionTag.name),
      image: pageObj.properties.image.url,
      slug: pageObj.properties.slug.rich_text[0].plain_text,
      date: pageObj.properties.date.last_edited_time,
    }
  })
  
  return {
    props: {
      posts
    }
  }
}
