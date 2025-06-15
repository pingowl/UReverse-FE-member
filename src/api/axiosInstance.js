import axios from 'axios';
import { createBrowserHistory } from 'history';

// history.push용
const history = createBrowserHistory();

// accessToken 저장용 임시 변수
let store;
// 전역에서 setRecoilState 접근을 위한 init 함수
export const setAuthStore = (recoilSetter) => {
    store = recoilSetter;
};

// 등록된 store를 가져오는 함수 (LoginForm 등에서 사용)
export const getAuthStore = () => store;

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true, // 쿠키 포함 (Spring Security + HTTPS 인증 시 필요)
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
    const token = store?.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 응답 에러 시 재발급 → 재시도 or 로그아웃 처리
api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        // accessToken 만료, 인증 실패 && 요청이 재시도 된 적 없는 최초의 실패일 경우
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.get('/api/v1/auth/refresh', {
                    baseURL: process.env.REACT_APP_BASE_URL,
                    withCredentials: true
                });

                const { accessToken, role } = res.data.response;
                store?.setAuth({ accessToken, role });

                // 재요청 실행
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // refreshToken 만료 시 로그인으로 보내기
                store?.resetAuth();
                history.push('/login');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(err);
    }
);

export default api;
