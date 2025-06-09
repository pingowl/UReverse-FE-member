import styles from "./LoginInput.module.css";

export default function LoginInput({ type, id, name, value, onChange, label }) {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={id} className={styles.floatingLabel}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={styles.inputField}
            />
        </div>
    )
}