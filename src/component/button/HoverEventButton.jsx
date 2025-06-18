import { useNavigate } from 'react-router-dom';
import styles from './HoverEventButton.module.css';
import { useState } from 'react';

/**
 * 공통 버튼 컴포넌트
 *
 * @param {string} text - 버튼에 표시할 텍스트
 * @param {function} onClick - 클릭 시 실행할 콜백 함수 (link가 없을 경우에만 동작)
 * @param {string} link - 클릭 시 이동할 경로 (React Router 경로)
 * @param {string} color - 버튼 색상 (black, white, green, blocked)
 * @param {string} className - 선택적으로 외부에서 추가할 커스텀 클래스명
 * @param {boolean} disabled - 비활성화 버튼이면 true
 *
 * @returns {JSX.Element} 버튼 요소 반환
 */
export default function HoverEventButton({
  text,
  onClick,
  link,
  className = '',
  color,
  disabled = false,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (link) {
      navigate(link);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${styles.button} 
        ${color === 'white' ? styles.white : ''} 
        ${disabled ? styles.disabled : ''} 
        ${className}`}
    >
      {text}
    </button>
  );
}