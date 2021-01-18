import React from "react";
import { NavBar } from "../components/NavBar";
import { User } from "../components/Admin/User"; 
import styles from "../styles/admin.module.css";

export const AdminPage = () => {
    return (
        <>
            <NavBar/>
            <h1 className="title">admin</h1>
            <div className={styles.app}>
                <div className={styles.column_title}>
                    <div className={styles.column_title_login}>
                        <p>Login</p>
                    </div>
                    <div className={styles.column_title_status}>
                        <p>Status</p>
                    </div>
                    <div className={styles.column_title_role}>
                        <p>Role</p>
                    </div>
                    <div className={styles.column_title_none}></div>
                </div>
                <div className={styles.users}>
                    <User/>
                </div>
            </div>
        </>
    )
}