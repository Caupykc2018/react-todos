import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/registration.module.css";
import {FormAddUser} from "../components/Registration/FormAddUser";

export const RegistrationPage = () => {
  return (
    <>
      <h1 className={"title"}>registration</h1>
      <div className={styles.app}>
        <FormAddUser/>
        <Link className={styles.href_login} to="/login">Login</Link>
      </div>
    </>
  );
}
