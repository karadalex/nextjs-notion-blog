import Head from 'next/head'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
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

        <img src={post.image}/>

        <div className={styles.grid}>
          {post.body.map(paragraph => (
            <p>{paragraph}</p>
          ))}
        </div>
      </main>

      <Footer/>
    </div>
  )
}


export async function getServerSideProps(context) {
  const slug = context.query.slug
  let post = {}

  const secret = process.env.NOTION_API_KEY
  const database_id = process.env.NOTION_DATABASE_ID

  let headers = new Headers();
  headers.append("Authorization", `Bearer ${secret}`);
  headers.append("Notion-Version", "2021-05-13");
  headers.append("Content-Type", "application/json");

  let options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      filter: {
        property: "slug",
        text: {
          equals: slug
        }
      }
    }),
  };
  // Query database to find an entry with this slug
  let response = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, options)
  let responseData = await response.json()
  
  if (responseData.results.length > 0) {
    const pageObj = responseData.results[0]
    const page_id = pageObj.id

    // Check if post is published. If not then show 404 page
    const isPublished = pageObj.properties.published.checkbox
    if (!isPublished) {
      return {
        notFound: true
      }
    }

    // Get page metadata
    post = {
      id: pageObj.id,
      title: pageObj.properties.title.title[0].plain_text,
      description: pageObj.properties.description.rich_text[0].plain_text,
      tags: pageObj.properties.tags.multi_select.map(notionTag => notionTag.name),
      image: pageObj.properties.image.url,
      slug: pageObj.properties.slug.rich_text[0].plain_text,
      date: pageObj.properties.date.last_edited_time,
      author: {
        name: pageObj.properties.author.created_by.name,
        avatar: pageObj.properties.author.created_by.avatar_url,
      }
    }

    // Get page content
    options.method = 'GET'
    options.body = null
    response = await fetch(`https://api.notion.com/v1/blocks/${page_id}/children`, options)
    responseData = await response.json()
    
    // Parse content of response: Assume a list of paragraphs with simple text
    post.body = responseData.results.map(block => {
      return block.paragraph.text[0].plain_text
    })

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