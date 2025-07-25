// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkemXHqzzZGvHZ0l1MqPp7f_V6Ofd6gvg",
  authDomain: "project-bridge-bdad2.firebaseapp.com",
  projectId: "project-bridge-bdad2",
  storageBucket: "project-bridge-bdad2.firebasestorage.app",
  messagingSenderId: "546066697591",
  appId: "1:546066697591:web:1a919f64fd19533cb2e572",
  measurementId: "G-4GGB6MWKFK"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
