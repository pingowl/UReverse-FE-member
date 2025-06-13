import { Outlet } from "react-router-dom";
import CommonHeader from "../component/header/CommonHeader";
import styles from "./CommonLayout.module.css";

export default function CommonLayout(){
    return(
        <div className={styles.container}>
            <CommonHeader></CommonHeader>
            <div className={styles.headerSpacer}></div>
            <div className={styles.outletArea}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}