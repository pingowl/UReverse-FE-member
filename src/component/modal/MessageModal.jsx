import React from 'react';
import styles from './MessageModal.module.css';
import HoverEventButton from '../button/HoverEventButton';

export default function MessageModal({
  visible,
  title = '알림',
  message,
  onClose,
  onConfirm,
  showPasswordInput = false,
  password = '',
  setPassword = () => {},
  confirmText = '확인',
  cancelText = '닫기',
}) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        {showPasswordInput && (
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        )}

        <div className={styles.buttonGroup}>
          <HoverEventButton
            text={cancelText}
            onClick={onClose}
            color="#eee"
            width="w-24"
          />
          {onConfirm && (
            <HoverEventButton
              text={confirmText}
              onClick={onConfirm}
              color="black"
              width="w-24"
            />
          )}
        </div>
      </div>
    </div>
  );
}
