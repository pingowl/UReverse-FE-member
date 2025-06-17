import styles from "./LoginInput.module.css";

/**
 * 로그인 입력 필드 컴포넌트
 *
 * @param {string} type - input 요소의 타입 (예: 'text', 'password', 'email' 등)
 * @param {string} id - input 및 label 요소의 고유 ID
 * @param {string} name - input의 name 속성
 * @param {string} value - input의 현재 값 (controlled component로 사용)
 * @param {function} onChange - input 값이 변경될 때 실행되는 콜백 함수
 * @param {string} label - 입력 필드 위에 표시되는 레이블 텍스트
 * @param {function} onFocus - input이 focus 되었을 때 실행되는 콜백
 * @param {function} onBlur - input이 blur 되었을 때 실행되는 콜백
 * @param {boolean} isFocused - 현재 input이 focus 상태인지 여부에 따라 스타일 적용
 *
 * @returns {JSX.Element} 로그인 또는 일반 입력 필드를 위한 JSX
 */
export default function LoginInput({ type, id, name, value, onChange, label, onFocus, onBlur, isFocused }) {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={id}
                className={`${styles.floatingLabel} ${isFocused ? styles.labelFocused : ''}`}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                className={`${styles.inputField} ${isFocused ? styles.focused : ''}`}
            />
        </div>
    );
}