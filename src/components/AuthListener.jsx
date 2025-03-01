import { useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice"

const AuthListener = () => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const auth = useMemo(() => getAuth(), []);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.setSignIn());
      } else {
        dispatch(authActions.setSignOut());
      }
      setIsAuthChecked(true); // Authentication check completed
    });

    return () => unsubscribe();
  }, [dispatch]);

  return isAuthChecked; // Returns `true` when auth state is determined
};

export default AuthListener;
