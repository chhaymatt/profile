import styles from './Tag.module.css'

interface TagListProps {
  items: string[]
  label: string
}

// A quiet, dot-separated line of technologies. Still a list, so screen readers
// announce how many there are.
export function TagList({ items, label }: TagListProps) {
  return (
    <ul aria-label={label} className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  )
}
