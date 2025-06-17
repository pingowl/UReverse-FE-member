
import styles from './LoginForm.module.css';
import LoginInput from '../../component/input/LoginInput';
import HoverEventButton from '../../component/button/HoverEventButton';

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { login } from '../../api/auth';
import { getAuthStore } from '../../api/axiosInstance';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async () => {
        try {
            const { accessToken, role } = await login(email, password);
            getAuthStore().setAuth({ accessToken, role });

            const redirectTo = location.state?.from || '/home';
            navigate(redirectTo);
        } catch (error) {
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginBox}>
                <h1 className={styles.brand}>U:REVERSE</h1>
                <p className={styles.sub}>당신의 옷, 다시 가치 있게</p>

                <div className={styles.form}>
                    <LoginInput
                        type="email"
                        id="email"
                        label="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        isFocused={focusedInput === "email"}
                    />
                    <LoginInput
                        type="password"
                        id="password"
                        label="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        isFocused={focusedInput === "password"}
                    />

                    <div className={styles.forgot}>
                        <span onClick={() => navigate('/recovery-password')}>
                            비밀번호를 잊으셨나요?
                        </span>
                    </div>

                    <HoverEventButton
                        text="로그인"
                        onClick={handleLogin}
                        color="green"
                    />

                    <div className={styles.signupLink}>
                        아직 회원이 아니신가요?&nbsp;
                        <span onClick={() => navigate('/signup')}>회원가입</span>
                    </div>
                </div>
            </div>
        </div>
    );
}