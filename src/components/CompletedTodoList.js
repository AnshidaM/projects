import React, { useMemo } from "react";
import TodoItem from "./TodoItem";
import classes from "./CompletedTodoList.module.css";
import { useSelector } from "react-redux";

const CompletedTodoList = ({ className }) => {
  const list = useSelector((state) =>
    state.todo.items.filter((todo) => todo.checked)
  );

  const completedTodos = useMemo(
    () =>
      list.map((todo) => (
        <TodoItem id={todo.id} title={todo.title} key={todo.id} check={todo.checked} />
      )),
    [list]
  );

  return (
    <div className={className}>
      {list.length ? completedTodos : <div className={classes.emptylist}>No completed todos</div>}
    </div>
  );
};

export default CompletedTodoList;
