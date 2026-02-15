// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2kk_JwpeLw461TkFSZDQgAGyWSnTapSE",
  authDomain: "moviebox-gpt.firebaseapp.com",
  projectId: "moviebox-gpt",
  storageBucket: "moviebox-gpt.firebasestorage.app",
  messagingSenderId: "457671107978",
  appId: "1:457671107978:web:a9e8e74ddc612579b69473",
  measurementId: "G-CBHYLEQS3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()