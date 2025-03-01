import React, { useState, useCallback, useReducer, useMemo } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { app } from "../assets/firebase";
import { useDispatch, useSelector } from "react-redux";
// import { uiActions } from "../store/ui-slice";
import classes from "./Registration.module.css";
import { authActions } from "../store/auth-slice";

// 🔹 Reducer to manage email & password state efficiently


const Registration = () => {
  const auth = useMemo(() => getAuth(app), []); // 🔹 Memoize auth instance
  const googleProvider = useMemo(() => new GoogleAuthProvider(), []); // 🔹 Memoize provider
  const email=useSelector(state=>state.auth.email)
  const password=useSelector(state=>state.auth.password)

  const [error, setError] = useState("");
 

  const dispatch = useDispatch();

  // 🔹 Handle Input Changes Efficiently
  const handleChange = useCallback((e) => {
    dispatch(authActions.handleChange({ name: e.target.name, value: e.target.value }));
  }, [dispatch]);

  // 🔹 Handle Sign Up
  const handleSignUp = useCallback(async (e) => {

    console.log(email,password)
    e.preventDefault()
    if (!email || !password) {
        setError("Email and password are required");
        return;
      }
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("responsing ..",response)
      if (response.user) dispatch(authActions.setSignIn());
    } catch (error) {
      setError(error.code);
    }
  }, [auth, email, password, dispatch]);

  // 🔹 Handle Google Login
  const handleGoogleLogin = useCallback(async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      if (response.user) dispatch(authActions.setSignIn());
    } catch (error) {
      setError(error.code);
    }
  }, [auth, googleProvider, dispatch]);

  // 🔹 Handle Log In
  const handleLogIn = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        if (response.user) dispatch(authActions.setSignIn());
      } catch (error) {
        setError(error.code);
      }
    },
    [auth, email,password, dispatch]
  );

  return (
    <div className={classes.container}>
        <form className={classes.form}>
        <input type='text' name="email" value={email} onChange={handleChange} className={classes.input} placeholder='Enter Email'/>
        <input type='password' name="password" value={password} onChange={handleChange} className={classes.input}  placeholder='Enter password'/>
        </form>
        <div className={classes.btnContainer}>
        <button className={`${classes.btn} ${classes.btn2}`} type="submit"  onClick={handleSignUp}>Sign Up</button>
        <button className={`${classes.btn} ${classes.btn2}`} onClick={handleGoogleLogin}>Continue with google</button>
        <span>Already a user ? <button onClick={handleLogIn} className={classes.signInBtn}>Sign In</button></span>
        </div>
        <span className={classes.error}>{error}

        </span>
        </div>
  )
}

export default Registration