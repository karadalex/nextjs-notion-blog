import styles from '../styles/Tags.module.css'

export default function Tags({ tags }) {
  return (
    <div className={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <span key={`tag-${index}`} className={styles.tagBox}>
          {tag}
        </span>
      ))}
    </div>
  )
}
