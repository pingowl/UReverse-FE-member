import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../auth/LoginForm.module.css';
import LoginInput from '../../component/input/LoginInput';
import HoverEventButton from '../../component/button/HoverEventButton';
import MessageModal from '../../component/modal/MessageModal';
import { recoverPassword } from '../../api/auth';

const RecoveryPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [modal, setModal] = useState({ open: false, message: '' });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await recoverPassword(email);
            setModal({
                open: true,
                message: '임시 비밀번호가 이메일로 발송되었습니다.',
            });
        } catch (error) {
            const msg =
                error.response?.data?.errorMessage || '비밀번호 재발급에 실패했습니다.';
            setModal({ open: true, message: msg });
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
                        name="email"
                        label="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        isFocused={focusedInput === 'email'}
                    />

                    <HoverEventButton
                        text="임시 비밀번호 전송"
                        onClick={handleSubmit}
                        color="green"
                    />
                </div>
            </div>

            {modal.open && (
                <MessageModal
                    visible={modal.open}
                    message={modal.message}
                    onClose={() => {
                        setModal({ open: false, message: '' });
                        navigate('/login');
                    }}
                />
            )}
        </div>
    );

};

export default RecoveryPasswordPage;