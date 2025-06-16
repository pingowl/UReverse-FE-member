import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../auth/LoginForm.module.css';
import logo from '../../assets/Logo.png';
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
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>U:Reverse</h1>
                <img src={logo} alt="logo" className={styles.image} />
            </div>

            <div className={styles.inputGroup}>
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

                <div
                    className={styles.buttonArea}
                    style={{ position: 'static', margin: '0', padding: '0' }}
                >
                    <HoverEventButton
                        text="임시 비밀번호 전송"
                        onClick={handleSubmit}
                        width="w-full"
                        height="h-12"
                        color="black"

                    />
                </div>
            </div>

            {modal.open && (
                <MessageModal
                    visible={modal.open} 
                    message={modal.message}
                    onClose={() => {
                        setModal({ open: false, message: '' });
                        navigate('/login/form');
                    }}
                />
            )}
        </div>
    );
};

export default RecoveryPasswordPage;