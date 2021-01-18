import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/login.module.css";
import {FormLogin} from "../components/Login/FormLogin";

export const LoginPage = () => {
  return (
    <>
      <h1 className={"title"}>login</h1>
      <div className={styles.app}>
        <FormLogin/>
        <Link className={styles.href_register} to="/register">Create account</Link>
      </div>
    </>
  );
}
