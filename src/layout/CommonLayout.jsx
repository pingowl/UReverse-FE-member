import { Outlet } from "react-router-dom";
import CommonHeader from "../component/header/CommonHeader";

export default function CommonLayout(){
    return(
        <>
            <CommonHeader></CommonHeader>
            <Outlet></Outlet>
        </>
    )
}