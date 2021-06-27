import styles from '../styles/Author.module.css'

export default function Author({ author }) {
  return (
    <div className={styles.avatarContainer}>
      <img src={author.avatar} className={styles.avatar}/> 
      <span className={styles.authorName}>{author.name}</span>
    </div>
  )
}
