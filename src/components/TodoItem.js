import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoData, updateTodoData } from "../store/todos-actions";
import { todoActions } from "../store/todos-slice";
import { uiActions } from "../store/ui-slice";
import classes from "./TodoItem.module.css";

const TodoItem = ({ id, title, check }) => {
  const dispatch = useDispatch();

  const clearStatusAfterDelay = useCallback(() => {
    setTimeout(() => dispatch(uiActions.clearStatus()), 3000);
  }, [dispatch]);

  const removeTodoHandler = useCallback(async () => {
    dispatch(uiActions.setStatus("Deleting..."));
    const response = await deleteTodoData(id);

    if (response === "success") {
      dispatch(todoActions.removeItemFromTodos(id));
      dispatch(uiActions.setStatus("Successfully deleted"));
    } else {
      dispatch(uiActions.setStatus("Deletion failed"));
    }
    
    clearStatusAfterDelay();
  }, [dispatch, id, clearStatusAfterDelay]);

  const checkboxHandler = useCallback(async () => {
    dispatch(uiActions.setStatus("Updating..."));
    const response = await updateTodoData(id);

    if (response === "success") {
      dispatch(todoActions.addCheckHandler(id));
      dispatch(uiActions.setStatus("Successfully updated"));
    } else {
      dispatch(uiActions.setStatus("Updation failed"));
    }

    clearStatusAfterDelay();
  }, [dispatch, id, clearStatusAfterDelay]);

  return (
    <div className={classes.todo}>
      <input type="checkbox" checked={check} id={id} name={title} onChange={checkboxHandler} />
      <div className={classes.title}>{title}</div>
      {!check && <i className={`fa fa-remove ${classes.remove}`} onClick={removeTodoHandler}></i>}
    </div>
  );
};

export default TodoItem;
