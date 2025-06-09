import styles from "./LoginForm.module.css";
import logo from "../../assets/Logo.png"
import BlackButton from "../../component/button/BlackButton";

export default function LoginForm(){
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>U:Reverse</h1>
                <img src={logo} alt="hpoint" className={styles.image} />
            </div>
            {/* 입력 영역 */}
            <div className={styles.inputGroup}>
                {/* 이메일 */}
                <div className={styles.inputWrapper}>
                    <label htmlFor="email" className={styles.floatingLabel}>이메일</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.inputField}
                    />
                </div>

                {/* 비밀번호 */}
                <div className={styles.inputWrapper}>
                    <label htmlFor="password" className={styles.floatingLabel}>비밀번호</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    className={styles.inputField}
                    />
                </div>
            </div>
            <div className={styles.buttonArea}>
                <BlackButton
                    text="로그인"
                    link="/"
                    width="w-full"
                    height="h-12"
                />
            </div>
        </div>
    )
}