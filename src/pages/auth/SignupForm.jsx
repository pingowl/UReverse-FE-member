import styles from './SignupForm.module.css';
import logo from '../../assets/Logo.png';
import LoginInput from '../../component/input/LoginInput';
import { useState } from 'react';
import HoverEventButton from '../../component/button/HoverEventButton';
import { signup } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import InfoModal from '../../component/modal/InfoModal';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [signupSuccessModalOpen, setSignupSuccessModal] = useState(false);
  // const [showKakaoInfoModal, setShowKakaoInfoModal] = useState(false);
  const navigate = useNavigate();

  // 공통 에러 메시지 처리 함수
  const handleError = (status, message) => {
    if (status === 400) {
      setErrorMessage(message);
    } else {
      setErrorMessage('회원가입에 실패했습니다.');
    }
    setErrorModalOpen(true);
  };

  const handleSignup = async () => {
    const res = await signup({ name, email, password, phone });

    if (res.success) {
      setSignupSuccessModal(true);
      // setShowKakaoInfoModal(true);
    } else {
      const { status, message } = res.error;
      handleError(status, message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>U:Reverse</h1>
        <img src={logo} alt="hpoint" className={styles.image} />
      </div>

      <div className={styles.inputGroup}>
        <LoginInput
          type="name"
          id="name"
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocusedInput('name')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'name'}
        />
        <LoginInput
          type="email"
          id="email"
          label="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'email'}
        />
        <LoginInput
          type="password"
          id="password"
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'password'}
        />
        <LoginInput
          type="phone"
          id="phone"
          label="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onFocus={() => setFocusedInput('phone')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'phone'}
        />
      </div>

      <div className={styles.buttonArea}>
        <HoverEventButton
          text="가입하기"
          onClick={handleSignup}
          width="w-full"
          height="h-12"
          color="black"
        />
      </div>

      {errorModalOpen && (
        <InfoModal
          title="회원가입 실패"
          message={errorMessage}
          onClose={() => setErrorModalOpen(false)}
        />
      )}

      {signupSuccessModalOpen && (
        <InfoModal
          title="회원가입 성공"
          message={'로그인 화면으로 이동합니다'}
          onClose={() => {
            setSignupSuccessModal(false);
            navigate('/login/form');
          }}
        />
      )}

      {/* {showKakaoInfoModal && (
        <InfoModal
          title="카카오 계정 연동 안내"
          message={`마이페이지에서 카카오 계정을 연동하시면\n카카오톡으로 알림을 받을 수 있어요!`}
          onClose={() => setShowKakaoInfoModal(false)}
          buttonText="확인"
          onButtonClick={() => {
            setShowKakaoInfoModal(false);
            navigate('/login/form');
          }}
        />
      )} */}
    </div>
  );
}
