import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoData, sendTodoData } from "../store/todos-actions";
import { todoActions } from "../store/todos-slice";
import { uiActions } from "../store/ui-slice";
import Button from "../ui/Button";
import classes from "./TodoForm.module.css";

const TodoForm = (props) => {
  const dispatch = useDispatch();
  const todoRef = useRef();
  const [isValid, setIsValid] = useState(true);
  let notification = useSelector((state) => state.ui.notification);
  let loadingStatus = useSelector((state) => state.ui.loadingStatus);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (todoRef.current.value) {
      const newTodo = {
        id: Math.trunc(Math.random() * 2000),
        title: todoRef.current.value,
        checked: false,
      };
      // console.log(newTodo);
      dispatch(uiActions.setStatus("Sending..."));
      const response = await sendTodoData(newTodo);

      console.log(response);
      if (response === "success") {
        dispatch(todoActions.addItemtodo(newTodo));
        dispatch(uiActions.setStatus("Successfully sent"));
      } else {
        dispatch(uiActions.setStatus("Sending failed"));
      }
      dispatch(fetchTodoData());
      // console.log(notification);
      setIsValid(true);
      todoRef.current.value = "";
    } else {
      setIsValid(false);
    }
  };
  return (
    <div className={classes.formcontainer}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <input ref={todoRef} type="text" placeholder="new todo item" />

        <Button className={classes.button} type="submit" />
      </form>
      <div>{loadingStatus}</div>
      <span className={classes.errormsg}>
        {!isValid && "Please add a todo !"}
      </span>
    </div>
  );
};

export default TodoForm;
