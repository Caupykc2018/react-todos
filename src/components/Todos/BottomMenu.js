import React from "react";
import styles from "../../styles/todos.module.css";
import {useDispatch} from "react-redux";
import {clearCompletedUserTodo, setUserTab} from "../../actions";

export const BottomMenu = ({countActiveTodos, countCompletedTodos, userTab}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.bottom_menu}>
      <div className={styles.text_counting}>
        <div>{countActiveTodos}</div>
        <div className={styles.desc_counter}>left items</div>
      </div>
      <div>
        <button
          className={[styles.btn, userTab === "ALL" && styles.current_btn].join(" ")}
          onClick={() => dispatch(setUserTab("ALL"))}
        >All</button>
        <button
          className={[styles.btn, userTab === "ACTIVE" && styles.current_btn].join(" ")}
          onClick={() => dispatch(setUserTab("ACTIVE"))}
        >Active</button>
        <button
          className={[styles.btn, userTab === "COMPLETED" && styles.current_btn].join(" ")}
          onClick={() => dispatch(setUserTab("COMPLETED"))}
        >Completed</button>
      </div>
      <div>
        <button
          className={[styles.btn, styles.btn_complete].join(" ")}
          style={{visibility: !!countCompletedTodos? "visible": "hidden"}}
          onClick={() => dispatch(clearCompletedUserTodo())}
        >Clear completed</button>
      </div>
    </div>
  )
}
