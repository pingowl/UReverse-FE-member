import { useNavigate } from 'react-router-dom';
import styles from './WhiteButton.module.css';

export default function WhiteButton({
  text,
  onClick,
  link,
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
      onClick={handleClick}
      className={`${styles.button} ${className}`}
    >
      {text}
    </button>
  );
}
