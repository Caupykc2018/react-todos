import React from "react";
import { FaAngleDown } from "react-icons/fa";
import styles from "../../styles/admin.module.css"; 

export const User = () => {
    return (
        <div className={styles.user_container}>
            <div className={styles.user_login_container}>
                <p>{"login"}</p>
            </div>
            <div className={styles.user_status_container}>
                <input type={"checkbox"} id={"id"} className={styles.user_status_checkbox}/>
                <label htmlFor={"id"} className={styles.user_status_label}/>
            </div>
            <div className={styles.user_role_container}>
                <div className={styles.user_role}>
                    <p className={styles.current_role}>{"admin"}</p>
                    <FaAngleDown className={styles.icon_down}/>
                    <div className={styles.list_user_role}>
                        <button className={styles.role}>{"user"}</button>
                        <button className={styles.role}>{"admin"}</button>
                    </div>
                </div>
            </div>
            <div className={styles.user_delete_container}>
                <button className={styles.user_delete}>Delete</button>
            </div>
        </div>
    )
}