import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import InfoModal from '../../component/modal/InfoModal';

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();
  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: '',
    message: '',
    redirect: '',
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`/api/auth/verify?token=${token}`);
        setModalInfo({
          show: true,
          title: '인증 완료',
          message: '이메일 인증이 완료되었습니다.',
          redirect: '/signup?verified=true',
        });
      } catch (err) {
        setModalInfo({
          show: true,
          title: '인증 실패',
          message: '유효하지 않거나 만료된 링크입니다.',
          redirect: '/signup?verified=false',
        });
      }
    };
    if (token) verifyToken();
  }, [token]);

  const handleModalClose = () => {
    navigate(modalInfo.redirect);
  };

  return (
    <div>
      이메일 인증 중...
      {modalInfo.show && (
        <InfoModal
          title={modalInfo.title}
          message={modalInfo.message}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
