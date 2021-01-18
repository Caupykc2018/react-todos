import React from "react";
import styles from "../styles/navbar.module.css";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../actions";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const login = useSelector(state => state.currentUser.login);

  const dispatch = useDispatch();

  return (
    <div className={styles.menu}>
      <div className={styles.menu_left}>
        <div className={styles.logo}>
          <img
            className={styles.logo_img}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Frente_de_Todos_logo.svg"
            alt="logo"
          />
        </div>
        <div className={styles.navigation}>
          <NavLink to="/todos">Todos</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </div>
      </div>
      
      <div className={styles.account}>
        <div>Hi,</div>
        <div className={styles.login}>{login}</div>
        <button className={styles.log_out} onClick={() => dispatch(logOut())}>Log Out</button>
      </div>
    </div>
  )
}
