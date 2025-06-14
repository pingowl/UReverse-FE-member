import React from 'react';
import styles from './ConfirmModal.module.css';
import HoverEventButton from '../button/HoverEventButton';

export default function ConfirmModal({
  visible, onClose, onConfirm,
  password, setPassword,
  isErrorOnly = false,
  message
}) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{isErrorOnly ? '오류' : '회원 탈퇴'}</h2>
        <p>{message || '정말로 탈퇴하시겠습니까?'}</p>

        {!isErrorOnly && (
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
            text="닫기"
            onClick={onClose}
            color="#eee"
            width="w-24"
          />
          {!isErrorOnly && (
            <HoverEventButton
              text="탈퇴하기"
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
