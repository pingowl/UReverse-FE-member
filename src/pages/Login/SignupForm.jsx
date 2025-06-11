import styles from "./SignupForm.module.css";
import logo from "../../assets/Logo.png"
import LoginInput from '../../component/input/LoginInput';
import { useState } from 'react';
import HoverEventButton from '../../component/button/HoverEventButton';

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>U:Reverse</h1>
                <img src={logo} alt="hpoint" className={styles.image} />
            </div>
            {/* 입력 영역 */}
            <div className={styles.inputGroup}>
                {/* 이름 */}
                <LoginInput
                    type="name"
                    id="name"
                    name="name"
                    label="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                    isFocused={focusedInput === "name"}
                />
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
                {/* 전화번호 */}
                <LoginInput
                    type="number"
                    id="number"
                    name="number"
                    label="전화번호"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onFocus={() => setFocusedInput("number")}
                    onBlur={() => setFocusedInput(null)}
                    isFocused={focusedInput === "number"}
                />

            </div>
            <div className={styles.buttonArea}>
                <HoverEventButton
                    text="가입하기"
                    link="/login/form"
                    width="w-full"
                    height="h-12"
                    color="black"
                />
            </div>
        </div>
    )
}