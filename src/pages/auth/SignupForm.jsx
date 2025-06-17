import styles from './SignupForm.module.css';
import logo from '../../assets/Logo.png';
import LoginInput from '../../component/input/LoginInput';
import { useState } from 'react';
import HoverEventButton from '../../component/button/HoverEventButton';
import { signup } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import InfoModal from '../../component/modal/InfoModal';
import { checkEmailDuplicate, sendVerificationEmail } from '../../api/email';
import { useSearchParams } from 'react-router-dom';

export default function SignupForm() {
  const [params] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(
    params.get('verified') === 'true'
  );

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
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해 주세요.');
      return;
    }
    const res = await signup({ name, email, password, phone });

    if (res.success) {
      const res = await signup({ name, email, password, phone });
      setSignupSuccessModal(true);
    } else {
      const { status, message } = res.error;
      handleError(status, message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailAvailable(false);
    setIsEmailVerified(false);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailDuplicateCheck = async () => {
    if (!email) return alert('이메일을 입력해 주세요.');
    if (!isValidEmail(email)) return alert('올바른 이메일 형식이 아닙니다.');

    try {
      const data = await checkEmailDuplicate(email);
      if (data.available) {
        alert('사용 가능한 이메일입니다.');
        setIsEmailAvailable(true);
      } else {
        alert('이미 사용 중인 이메일입니다.');
        setIsEmailAvailable(false);
      }
    } catch (error) {
      alert('이메일 중복 확인에 실패했습니다.');
    }
  };

  const handleSendVerificationEmail = async () => {
    const redirectUrl = `${window.location.origin}/verify-email`;
    try {
      await sendVerificationEmail(email, redirectUrl);
      alert('인증 메일이 발송되었습니다. 메일을 확인해 주세요.');
    } catch (error) {
      alert('인증 메일 발송에 실패했습니다.');
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
          onChange={handleEmailChange}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
          isFocused={focusedInput === 'email'}
        />

        {/* 이메일 관련 버튼 */}
        <div className={styles.emailButtonGroup}>
          <button
            className={styles.emailCheckBtn}
            onClick={() => handleEmailDuplicateCheck(email)}
          >
            이메일 중복확인
          </button>
          <button
            className={styles.emailVerifyBtn}
            onClick={() => handleSendVerificationEmail(email)}
            disabled={!isEmailAvailable}
            style={{
              opacity: isEmailAvailable ? 1 : 0.5,
              cursor: isEmailAvailable ? 'pointer' : 'not-allowed',
            }}
          >
            인증 메일 전송
          </button>
        </div>

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
          disabled={!isEmailVerified}
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
    </div>
  );
}
