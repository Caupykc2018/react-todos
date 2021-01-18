import React, {useState} from "react";
import styles from "../../styles/todos.module.css";
import {useDispatch} from "react-redux";
import {removeUserTodo, toggleUserTodo} from "../../actions";
import { FaTimes } from "react-icons/fa";
import {InputEditTodo} from "./InputEditTodo";

export const Todo = ({id, title, isCompleted}) => {
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const dispatch = useDispatch();

  return (
    <div
      className={styles.todo}
      onMouseOver={() => setVisibleDelete(true)}
      onMouseOut={() => setVisibleDelete(false)}
      onDoubleClick={() => setIsEdit(true)}
    >
      <div className={styles.todo_left_flexbox}>
        <div className={styles.todo_checkbox_container}>
          <input
            className={styles.checkbox_status}
            type="checkbox"
            style={{visibility: isEdit? "hidden": "visible"}}
            onChange={() => dispatch(toggleUserTodo(id))}
            checked={isCompleted}
          />
        </div>
        {isEdit? <div className={styles.input_edit_container}>
          <InputEditTodo id={id} title={title} setIsEdit={setIsEdit}/>
        </div>
        :<div
          className={styles.todo_title_container}
          style={{textDecoration: isCompleted? "line-through": "none", color: isCompleted? "lightgray": "black"}}>
          <p className={styles.todo_title}>{title}</p>
        </div>}
      </div>
      {!isEdit && <div className={styles.todo_right_flexbox}>
        <div className={styles.btn_delete_container} style={{display: visibleDelete? "flex": "none"}}>
          <button className={styles.btn_delete} onClick={() => dispatch(removeUserTodo(id))}><FaTimes/></button>
        </div>
      </div>}
    </div>
  )
}
