import React from "react";
import styles from "../../styles/todos.module.css";
import { FaAngleDown } from "react-icons/fa";
import {useDispatch} from "react-redux";
import {toggleAllUserTodo} from "../../actions";

export const ButtonToggleAllTodo = ({IconColor}) => {
  const dispatch = useDispatch();

  return (
    <button className={styles.btnToggleAll} onClick={() => dispatch(toggleAllUserTodo())}>
      <FaAngleDown className={styles.icon_toggle} color={IconColor}/>
    </button>
  )
}
