import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Custom404() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          404 - Page Not Found
        </h1>

        <div className={styles.grid}>
          <img src="/undraw_not_found_60pq.svg" height="500"/>
          Illustration from&nbsp;<a href="https://undraw.co/">undraw.co/</a>
        </div>
      </main>

      <footer className={styles.footer}>
        My blog made with&nbsp;<a href="https://developers.notion.com/" target="_blank" rel="noopener noreferrer">Notio.so API</a>
      </footer>
    </div>
  )
}