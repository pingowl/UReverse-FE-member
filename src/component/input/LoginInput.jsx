import styles from "./LoginInput.module.css";

export default function LoginInput({ type, id, name, value, onChange, label, onFocus, onBlur, isFocused }) {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={id}
                className={`${styles.floatingLabel} ${isFocused ? styles.labelFocused : styles.labelUnfocused}`}>
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
                className={`${styles.inputField} ${isFocused ? styles.focused : styles.unfocused}`}
            />
        </div>
    )
}