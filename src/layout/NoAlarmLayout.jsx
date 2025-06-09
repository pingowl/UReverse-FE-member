import { Outlet } from "react-router-dom";
import NoAlarmHeader from "../component/header/NoAlarmHeader";

export default function NoAlarmLayout(){
    return(
        <>
            <NoAlarmHeader></NoAlarmHeader>
            <Outlet></Outlet>
        </>
    )
}