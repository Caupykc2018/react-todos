import React, {useState} from "react";
import styles from "../../styles/login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../actions";

export const FormLogin = () => {
  const [valueLogin, setValueLogin] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  const users = useSelector(state => state.users);

  const dispatch = useDispatch();

  const handlerSubmit = () => {
    if(!valueLogin) {
      return alert("Login field is empty");
    }

    if(!valuePassword) {
      return alert("Password field is empty");
    }

    let currentUser;

    users.forEach(user => {
      if(user.login === valueLogin) {
        if(user.password === valuePassword) {
          currentUser = user;
        }
      }
    });

    if(!currentUser) {
      return alert("Incorrect login or password");
    }

    dispatch(logIn(currentUser));
  }

  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder="Login"
        value={valueLogin}
        onChange={(e) => setValueLogin(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Password"
        value={valuePassword}
        onChange={(e) => setValuePassword(e.target.value)}
      />
      <button className={styles.submit} onClick={handlerSubmit}>Submit</button>
    </>
  )
}
