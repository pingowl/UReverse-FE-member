import styles from './InfoModal.module.css';
import AutoSizeModal from './AutoSizeModal';

export default function InfoModal({
  title,
  message,
  onClose,
  buttonText = '닫기',
  onButtonClick,
}) {
  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  return (
    <AutoSizeModal onClose={onClose}>
      <div className={styles.modalTitle}>{title}</div>
      <div className={styles.modalMessage}>{message}</div>
      <button onClick={handleClick} className={styles.modalButton}>
        {buttonText}
      </button>
    </AutoSizeModal>
  );
}
