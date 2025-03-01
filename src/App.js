import { useState, useReducer, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodosContainer from "./components/TodosContainer";
import Notification from "../src/ui/Notification";
import Card from "./ui/Card";
import React from "react";
import { sendTodoData, fetchTodoData } from "./store/todos-actions";
import { useDispatch, useSelector } from "react-redux";
import Registration from "./components/Registration";
import { authActions } from "./store/auth-slice";
import AuthListener from "./components/AuthListener";
import { getAuth, signOut } from "firebase/auth";
import logout from './images/logout.svg'

// let isInitial = true;
function App() {
  const todos = useSelector((state) => state.todo);
    let signin = useSelector((state) => state.auth.signedIn);
    console.log(signin)
    const isAuthChecked = AuthListener(); // Ensure auth state is known
    const dispatch=useDispatch();
    const signOutHandler = async () => {
      const auth = getAuth();
      try {
        await signOut(auth);
        dispatch(authActions.setSignOut());
    
      } catch (error) {
      
      }
    };
  
    if (!isAuthChecked) {
      return  <div className="loader-container">
      <div className="loader"></div>
  </div>
    }


  return (
    <React.Fragment>
      <AuthListener />
      <div className="App">
        {signin ? <div className="container">
        <div className="headerContainer"><button onClick={signOutHandler} className="signOutBtn"><img src={logout} placeholder="Log Out" width={20} height={20}/></button><h1 className="title">Todo App</h1>
      </div>

        <Card>
          <TodoForm />
          <TodosContainer todos={todos.items} />
        </Card>
        </div>:<Registration/>}
        
        
      </div>
    </React.Fragment>
  );
}

export default App;
