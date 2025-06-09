import { Outlet } from "react-router-dom";
import Header from "../component/header/MainHeader";
import styles from "./Layout.module.css";

export default function MainLayout(){
    return(
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.outletArea}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}