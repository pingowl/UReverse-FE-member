import { useLocation, useNavigate } from "react-router-dom"

export default function NoAlarmHeader () {
    const location = useLocation();
    const navigate = useNavigate();
    // 경로에 따른 페이지 이름 매핑
    const titleMap = {
        '/mypage': '마이페이지',
        '/login': '로그인',
        '/signup': '회원가입',
        '/sell': '판매',
    };

    // location.pathname이 포함된 key를 찾는 로직
    const matchedKey = Object.keys(titleMap).find(key =>
        location.pathname.includes(key)
    );

    const title = titleMap[matchedKey] || '페이지';

    return (
        <header className="w-full flex items-center justify-between py-4 border-b border-gray-200 bg-gray-50 px-4">
           {/* 왼쪽: 뒤로가기 버튼 */}
            <button
                onClick={() => navigate(-1)}
                className="text-xl text-gray-600 hover:text-blue-500"
                aria-label="뒤로가기"
            >
                &lt;
            </button>

            {/* 가운데: 페이지 제목 */}
            <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

            {/* 오른쪽: 공간 유지를 위해 빈 div */}
            <div className="w-6" /> {/* 아이콘 공간 대체용 */}
        </header>
    )
}