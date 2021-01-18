import React from "react";
import styles from "../styles/todos.module.css";
import {Todo} from "../components/Todos/Todo";
import {NavBar} from "../components/NavBar";
import {ButtonToggleAllTodo} from "../components/Todos/ButtonToggleAllTodo";
import {InputAddTodo} from "../components/Todos/InputAddTodo";
import {BottomMenu} from "../components/Todos/BottomMenu";

export const TodosPage = () => {
  return (
    <>
      <NavBar/>
      <h1 className={"title"}>todos</h1>
      <div className={styles.app}>
        <div className={styles.input_bar}>
          <ButtonToggleAllTodo IconColor={"lightgray"}/>
          <InputAddTodo/>
        </div>
        <div className={styles.main}>
          <div>
            {/* {viewTodos.map(todo => <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              isCompleted={todo.isCompleted}
            />)} */}
          </div>
          <BottomMenu/>
        </div>
      </div>
    </>
  );
}
