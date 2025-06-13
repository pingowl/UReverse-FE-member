import styles from './CommonInput.module.css';

export default function CommonInput({
        value,
        onChange,
        placeholder,
        type = 'text',
        disabled = false
      }){
    return (
        <input
            className={styles.input}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
        />
    )
}