import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import classes from "./NewTodoList.module.css";
import TodoItem from "./TodoItem";

const NewTodoList = ({ className }) => {
  const todos = useSelector((state) =>
    state.todo.items.filter((todo) => !todo.checked)
  );

  const newTodos = useMemo(
    () =>
      todos.map((todo) => (
        <TodoItem id={todo.id} title={todo.title} key={todo.id} check={todo.checked} />
      )),
    [todos]
  );

  return (
    <div className={className}>
      {todos.length ? newTodos : <div className={classes.emptylist}>Add a todo</div>}
    </div>
  );
};

export default NewTodoList;
