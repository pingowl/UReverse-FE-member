import { useNavigate } from 'react-router-dom';
import styles from './HoverEventButton.module.css';

/**
 * 공통 버튼 컴포넌트
 *
 * @param {string} text - 버튼에 표시할 텍스트
 * @param {function} onClick - 클릭 시 실행할 콜백 함수 (link가 없을 경우에만 동작)
 * @param {string} link - 클릭 시 이동할 경로 (React Router 경로)
 * @param {string} color - 버튼 색상 (black, white, green, blocked)
 * @param {string} className - 선택적으로 외부에서 추가할 커스텀 클래스명
 *
 * @returns {JSX.Element} 버튼 요소 반환
 */
export default function HoverEventButton({
  text,
  onClick,
  link,
  color = 'black',
  className = '', // 선택: 외부에서 스타일 추가하고 싶을 경우
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={color === 'blocked' ? undefined : handleClick}
      className={`${styles.button} ${styles[color]} ${className}`}
    >
      {text}
    </button>
  );
}
