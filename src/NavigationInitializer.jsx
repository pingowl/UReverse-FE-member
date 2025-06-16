import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigateHandler } from './api/axiosInstance';

export default function NavigationInitializer() {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigateHandler(navigate);
    }, [navigate]);

    return null; // 아무 것도 렌더링하지 않음
}
