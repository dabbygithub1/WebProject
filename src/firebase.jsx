
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; 
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-Phhj-ILB1MPvpFufB-RMSO7M0ogNJcI",
  authDomain: "calcora-42cf1.firebaseapp.com",
  projectId: "calcora-42cf1",
  storageBucket: "calcora-42cf1.appspot.com", 
  messagingSenderId: "333413038995",
  appId: "1:333413038995:web:93af64d6871d787de78666",
  measurementId: "G-523QP4JLXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app);  
const db = getFirestore(app);

export { auth, db }; 