import React from "react";
import styles from "../styles/todos.module.css";
import {Todo} from "../components/Todos/Todo";
import {useSelector} from "react-redux";
import {NavBar} from "../components/Todos/NavBar";
import {ButtonToggleAllTodo} from "../components/Todos/ButtonToggleAllTodo";
import {InputAddTodo} from "../components/Todos/InputAddTodo";
import {BottomMenu} from "../components/Todos/BottomMenu";
import {Redirect} from "react-router-dom";

export const TodosPage = () => {
  const {
    isAuth,
    userTab,
    viewTodos,
    countActiveTodos,
    countTodos,
    countCompletedTodos
  } = useSelector(state => {
    const idUser = state.currentUser.id;
    if(!idUser) {
      return { isAuth: false }
    }
    const userTab = state.currentTab[idUser];
    let viewTodos;
    const todos = state.todos[idUser];
    const countActiveTodos = todos.filter(todo => !todo.isCompleted).length;
    const countTodos = todos.length;
    const countCompletedTodos = countTodos - countActiveTodos;

    switch (userTab) {
      case "ALL":
        viewTodos = todos;
        break;
      case "ACTIVE":
        viewTodos = todos.filter(todo => !todo.isCompleted);
        break;
      case "COMPLETED":
        viewTodos = todos.filter(todo => todo.isCompleted);
        break;
      default:
        viewTodos = todos;
        break;
    }

    return {isAuth: true, userTab, viewTodos, countActiveTodos, countTodos, countCompletedTodos}
  });

  if(!isAuth) {
    return <Redirect to={"/login"}/>
  }

  return (
    <>
      <NavBar/>
      <h1 className={"title"}>todos</h1>
      <div className={styles.app}>
        <div className={styles.input_bar}>
          {!!countTodos && <ButtonToggleAllTodo IconColor={countTodos === countCompletedTodos? "black": "lightgray"}/>}
          <InputAddTodo/>
        </div>
        <div className={styles.main}>
          <div>
            {viewTodos.map(todo => <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              isCompleted={todo.isCompleted}
            />)}
          </div>
          {!!countTodos && <BottomMenu
            countActiveTodos={countActiveTodos}
            countCompletedTodos={countCompletedTodos}
            userTab={userTab}
          />}
        </div>
      </div>
    </>
  );
}
