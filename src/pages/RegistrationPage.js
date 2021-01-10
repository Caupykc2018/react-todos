import React from "react";
import {Link, Redirect} from "react-router-dom";
import styles from "../styles/registration.module.css";
import {FormAddUser} from "../components/Registration/FormAddUser";
import {useSelector} from "react-redux";

export const RegistrationPage = () => {
  const isAuth = useSelector(state => !!state.currentUser.id);

  if(isAuth) {
    return <Redirect to={"/todos"}/>
  }

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
