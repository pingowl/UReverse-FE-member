import styles from './StatCard.module.css';

export default function StatCard({ label, value, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}