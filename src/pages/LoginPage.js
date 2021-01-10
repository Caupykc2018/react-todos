import React from "react";
import {Link, Redirect} from "react-router-dom";
import styles from "../styles/login.module.css";
import {FormLogin} from "../components/Login/FormLogin";
import {useSelector} from "react-redux";

export const LoginPage = () => {
  const isAuth = useSelector(state => !!state.currentUser.id);

  if(isAuth) {
    return <Redirect to={"/todos"}/>
  }

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
