import styles from "./LoginForm.module.css";
import logo from "../../assets/Logo.png"
import BlackButton from "../../component/button/BlackButton";
import LoginInput from '../../component/input/LoginInput';
import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>U:Reverse</h1>
                <img src={logo} alt="hpoint" className={styles.image} />
            </div>
            {/* 입력 영역 */}
            <div className={styles.inputGroup}>
                {/* 이메일 */}
                <LoginInput
                    type="email"
                    id="email"
                    name="email"
                    label="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    isFocused={focusedInput === "email"}
                />

                {/* 비밀번호 */}
                <LoginInput
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    isFocused={focusedInput === "password"}
                />

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