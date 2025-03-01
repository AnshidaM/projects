import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewTodoList from "./NewTodoList";
import CompletedTodoList from "./CompletedTodoList";
import { fetchTodoData } from "../store/todos-actions";
import classes from "./TodosContainer.module.css";

const TodosContainer = () => {
  const dispatch = useDispatch();
  const todoLoadingStatus = useSelector((state) => state.ui.todosLoadingStatus);
  const todosChanged = useSelector((state) => state.todo.changed);
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      dispatch(fetchTodoData());
      return;
    }
    if (todosChanged) {
      dispatch(fetchTodoData());
    }
  }, [dispatch, todosChanged]);

  return (
    <div className={classes.todos}>
      {todoLoadingStatus === "Loaded" ? (
        <div className={classes.container}>
          <NewTodoList className={classes.new_todos} />
          <div className={classes.seperator} />
          <CompletedTodoList className={classes.completed_todos} />
        </div>
      ) : (
        <div className={classes.loading}>{todoLoadingStatus}</div>
      )}
    </div>
  );
};

export default TodosContainer;
