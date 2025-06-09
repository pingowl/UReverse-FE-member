import { Outlet } from "react-router-dom";
import Header from "../component/header/MainHeader";

export default function MainLayout(){
    return(
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>
    )
}