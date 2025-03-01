// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTodoData, sendTodoData } from "../store/todos-actions";
// import { todoActions } from "../store/todos-slice";
// import { uiActions } from "../store/ui-slice";
// import Button from "../ui/Button";
// import classes from "./TodoForm.module.css";

// const TodoForm = (props) => {
//   const dispatch = useDispatch();
//   const todoRef = useRef();
//   const [isValid, setIsValid] = useState(true);
//   let notification = useSelector((state) => state.ui.notification);
//   let loadingStatus = useSelector((state) => state.ui.loadingStatus);
//   const[addTodoMsg,setAddTodoMsg]= useState("Please Add a todo")


//   const formSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (todoRef.current.value) {
//       const newTodo = {
//         id: Math.trunc(Math.random() * 2000),
//         title: todoRef.current.value,
//         checked: false,
//       };
  
//       dispatch(uiActions.setStatus("Sending..."));
//       const response = await sendTodoData(newTodo);

      
//       if (response === "success") {
//         dispatch(todoActions.addItemtodo(newTodo));
//         dispatch(uiActions.setStatus("Successfully sent"));
//       } else {
//         dispatch(uiActions.setStatus("Sending failed"));
//       }
     
//       setIsValid(true);
//       todoRef.current.value = "";
      
//     } else {
//       setIsValid(false);
//       setTimeout(() => {
      
//         setAddTodoMsg("")
        
//       }, 3000); 
//     }
//     setTimeout(() => {
      
//       dispatch(uiActions.clearStatus());
      
//     }, 3000); 
//   };


//   return (
//     <div className={classes.formcontainer}>
//       <form className={classes.form} onSubmit={formSubmitHandler}>
//         <input ref={todoRef} type="text"  placeholder="new todo item" />

//         <Button className={classes.button} type="submit" />
//       </form>
//       <div className={classes.loadingStatus}>{loadingStatus}</div>
//       <span className={classes.errormsg}>
//         {!isValid && addTodoMsg}
//       </span>
//     </div>
//   );
// };

// export default TodoForm;




//testing
//optimization


import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodoData, sendTodoData } from "../store/todos-actions";
import { todoActions } from "../store/todos-slice";
import { uiActions } from "../store/ui-slice";
import Button from "../ui/Button";
import classes from "./TodoForm.module.css";
import { useCallback } from "react";

const TodoForm = () => {
  const dispatch = useDispatch();
  const todoRef = useRef();
  const [isValid, setIsValid] = useState(true);
  
  const loadingStatus = useSelector((state) => state.ui.loadingStatus);

  const formSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const enteredText = todoRef.current.value.trim();

      if (!enteredText) {
        setIsValid(false);
        setTimeout(() => setIsValid(true), 3000);
        return;
      }

      const newTodo = {
        id: Math.trunc(Math.random() * 2000),
        title: enteredText,
        checked: false,
      };

      dispatch(uiActions.setStatus("Sending..."));
      const response = await sendTodoData(newTodo);

      if (response === "success") {
        dispatch(todoActions.addItemtodo(newTodo));
        dispatch(uiActions.setStatus("Successfully sent"));
      } else {
        dispatch(uiActions.setStatus("Sending failed"));
      }

      todoRef.current.value = ""; 
      setTimeout(() => dispatch(uiActions.clearStatus()), 3000);
    },
    [dispatch]
  );



  return (
    <div className={classes.formcontainer}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <input ref={todoRef} type="text" placeholder="New todo item" />
        <Button className={classes.button} type="submit" />
      </form>
           <div className={classes.loadingStatus}>{loadingStatus}</div>
       <span className={classes.errormsg}>
        {!isValid && <span>Please add a Todo</span>   } </span>
     </div>
  );
};

export default TodoForm;





