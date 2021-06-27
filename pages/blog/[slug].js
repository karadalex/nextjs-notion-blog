import Head from 'next/head'
import Footer from '../../components/Footer'
import Author from '../../components/Author'
import Tags from '../../components/Tags'
import { dateIsoStringToReadable } from '../../utils/date'
import { getPosts } from '../api/posts'
import { getPostBySlug } from '../api/posts/get-by-slug/[slug]'
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


export async function getStaticPaths() {
  const posts = await getPosts()
  const paths = posts.map(post => {
    return {
      params: { slug: post.slug }
    }
  })

  return {
    paths,
    fallback: false
  };
}


export async function getStaticProps(context) {
  const slug = context.params.slug
  const response = await getPostBySlug(slug)

  if (response.ok) {
    return {
      props: {
        post: response.post
      },
      revalidate: 60
    }

  } else {
    return {
      notFound: true
    }
  }
}