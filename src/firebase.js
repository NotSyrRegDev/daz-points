// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , signInWithPhoneNumber   } from "firebase/auth";
import {  doc, setDoc  , getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRTPbVnkKJheGN7u8068JeEpRolDf5VkE",
  authDomain: "daz-points.firebaseapp.com",
  projectId: "daz-points",
  storageBucket: "daz-points.appspot.com",
  messagingSenderId: "708774464222",
  appId: "1:708774464222:web:6f8b78de4b67714443504f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const auth = getAuth();
const db = getFirestore();
auth.languageCode = 'it';

export {auth , signInWithPhoneNumber , setDoc , db , doc }