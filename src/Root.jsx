import { Outlet } from 'react-router-dom';
import Header from './component/common/Header';

export default function Root() {
    
    return (
        <div className="w-screen flex justify-center bg-white min-h-screen">
            <div className="w-full max-w-[500px] lg:w-[375px] bg-pink-50">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}