import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`/api/auth/verify?token=${token}`);
        alert('이메일 인증이 완료되었습니다.');
        navigate('/signup?verified=true');
      } catch (err) {
        alert('이메일 인증 실패. 유효하지 않거나 만료된 링크입니다.');
        navigate('/signup?verified=false');
      }
    };
    if (token) verifyToken();
  }, [token, navigate]);

  return <div>이메일 인증 중...</div>;
}
