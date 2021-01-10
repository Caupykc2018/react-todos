import React, {useState} from "react";
import styles from "../../styles/todos.module.css";
import {useDispatch} from "react-redux";
import {addUserTodo} from "../../actions";

export const InputAddTodo = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className={styles.inputTitle}
      placeholder="What needs to be done?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={(e) => {
        if(!value.trim()) return;
        if(e.key === "Enter") {
          dispatch(addUserTodo(value));
          setValue("");
        }
      }}
    />
  )
}
