import React, {useState} from "react";
import styles from "../../styles/registration.module.css";

export const FormAddUser = () => {
  const [valueLogin, setValueLogin] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [valueRepeatPassword, setValueRepeatPassword] = useState("");

  const handlerSubmit = () => {
    if(!valueLogin) {
      return alert("Login field is empty");
    }

    if(!valuePassword) {
      return alert("Password field is empty");
    }

    if(!valueRepeatPassword) {
      return alert("Repeat password field is empty");
    }

    if(valuePassword !== valueRepeatPassword) {
      return alert("Passwords don't match");
    }
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
        type="password"
        placeholder="Password"
        value={valuePassword}
        onChange={(e) => setValuePassword(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="Repeat password"
        value={valueRepeatPassword}
        onChange={(e) => setValueRepeatPassword(e.target.value)}
      />
      <button className={styles.submit} onClick={handlerSubmit}>Submit</button>
    </>
  )
}
