import styles from "./SignupForm.module.css";
import logo from "../../assets/Logo.png"
import BlackButton from "../../component/button/BlackButton";
import LoginInput from '../../component/input/LoginInput';
import { useState } from 'react';

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");

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
                />
                {/* 이메일 */}
                <LoginInput
                    type="email"
                    id="email"
                    name="email"
                    label="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* 비밀번호 */}
                <LoginInput
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* 전화번호 */}
                <LoginInput
                    type="number"
                    id="number"
                    name="number"
                    label="전화번호"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />

            </div>
            <div className={styles.buttonArea}>
                <BlackButton
                    text="가입하기"
                    link="/login/form"
                    width="w-full"
                    height="h-12"
                />
            </div>
        </div>
    )
}