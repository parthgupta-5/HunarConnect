// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// --- YOUR FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyCVOPXUGzhvsQZFEWtEnwaa_m-46ARUj3U",
  authDomain: "hunarconnect-2d73f.firebaseapp.com",
  projectId: "hunarconnect-2d73f",
  storageBucket: "hunarconnect-2d73f.appspot.com", // Corrected bucket name
  messagingSenderId: "595495119241",
  appId: "1:595495119241:web:283b7798db51524024d958"
};
// -----------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services we'll use
export const auth = getAuth(app);
export const db = getFirestore(app);
// We are not using Storage for now, but keep the import
export const storage = getStorage(app);