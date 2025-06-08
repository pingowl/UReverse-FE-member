export default function Header () {
    return (
        <header className="w-full flex items-center justify-between py-4 border-b border-gray-200 bg-gray-50 px-4">
            {/* 왼쪽: 프로젝트명 */}
            <h1 className="text-lg font-semibold text-gray-800">UReverse</h1>

            {/* 오른쪽: 아이콘 영역 */}
            <div className="flex items-center gap-4 text-xl text-gray-600">
                <button className="hover:text-blue-500" aria-label="검색">🔍</button>
                <button className="hover:text-blue-500" aria-label="설정">⚙️</button>
            </div>
        </header>
    )
}