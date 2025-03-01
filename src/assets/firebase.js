// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB01cG4JrMDK4EHWEyKw1Nlc37nln3WI-o",
  authDomain: "todo-app-2625.firebaseapp.com",
  databaseURL: "https://todo-app-2625-default-rtdb.firebaseio.com",
  projectId: "todo-app-2625",
  storageBucket: "todo-app-2625.firebasestorage.app",
  messagingSenderId: "315103209018",
  appId: "1:315103209018:web:1cde35981a8d3c3e44f703",
  measurementId: "G-BMDKNPEETR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);