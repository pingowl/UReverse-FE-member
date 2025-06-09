import { Outlet } from 'react-router-dom';

export default function Root() {
    
    return (
        <div className="w-screen flex justify-center bg-white min-h-screen">
            <div className="w-full max-w-[500px] lg:w-[375px] bg-pink-50">
                <Outlet />
            </div>
        </div>
    )
}