import React, {useState, useRef, useEffect} from "react";
import styles from "../../styles/todos.module.css";
import {editUserTodo} from "../../actions";
import {useDispatch} from "react-redux";

export const InputEditTodo = ({id, title, setIsEdit}) => {
  const inputEdit = useRef();
  const [value, setValue] = useState(title);

  const dispatch = useDispatch();

  useEffect(() => {
    inputEdit.current.focus();
  }, [])

  return (
    <input
      className={styles.input_edit}
      type="text"
      value={value}
      ref={inputEdit}
      onBlur={() => setIsEdit(false)}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={(e) => {
        if(!value.trim()) return;
        if(e.key === "Enter") {
          dispatch(editUserTodo(id, value.trim()));
          setIsEdit(false);
        }
      }}
    />
  );
}
