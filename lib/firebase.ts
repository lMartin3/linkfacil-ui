// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZte4YuRFnXMZunikLpmJ8AtMG_P0qXTs",
    authDomain: "linkfacil-42ee8.firebaseapp.com",
    projectId: "linkfacil-42ee8",
    storageBucket: "linkfacil-42ee8.firebasestorage.app",
    messagingSenderId: "959812934772",
    appId: "1:959812934772:web:3ccde639b7de52d23b0521",
    measurementId: "G-ZYBTBKLSFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();