import styles from "./LoginForm.module.css";
import logo from "../../assets/Logo.png"
import LoginInput from '../../component/input/LoginInput';
import { useState } from 'react';
import HoverEventButton from '../../component/button/HoverEventButton';
import { login } from '../../api/auth';
import { getMyInfo } from '../../api/member';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atoms/userState';
import { useNavigate } from 'react-router-dom';
import { getAuthStore, setAuthStore } from '../../api/axiosInstance';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);

    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { accessToken, role } = await login(email, password);

            // App.js 에서 등록한 setAuth 호출
            getAuthStore().setAuth({ accessToken, role });
            // const { accessToken } = await login(email, password);
            // localStorage.setItem('accessToken', accessToken);

            // 사용자 정보 다시 요청은 홈 페이지 이동 후 처리
            // const userInfo = await getMyInfo();
            // setUser({
            //     ...userInfo,
            //     isLoggedIn: true,
            // });

            navigate('/');
        } catch (error) {
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
            console.error('로그인 실패:', error);
        }
    };

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

                <div className={styles.findPassword}>
                    <span onClick={() => navigate("/recovery-password")} className={styles.link}>
                        비밀번호를 잊으셨나요?
                    </span>
                </div>

            </div>
            <div className={styles.buttonArea}>
                <HoverEventButton
                    text="로그인"
                    onClick={handleLogin}
                    width="w-full"
                    height="h-12"
                    color="black"
                />
            </div>
        </div>
    )
}