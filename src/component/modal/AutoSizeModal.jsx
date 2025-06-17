import styles from './AutoSizeModal.module.css';

export default function AutoSizeModal({ onClose, children }) {
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
