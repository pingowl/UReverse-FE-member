import { Outlet } from "react-router-dom";
import NoAlarmHeader from "../component/header/NoAlarmHeader";
import styles from "./Layout.module.css";

export default function NoAlarmLayout(){
    return(
        <div className={styles.container}>
            <NoAlarmHeader></NoAlarmHeader>
            <div className={styles.outletArea}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}